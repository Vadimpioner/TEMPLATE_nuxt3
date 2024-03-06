<template>
  <section
    id="SectionCatalog"
    :class="[
      'SectionCatalog',
      {'pointer-none': Object.entries(loading).find(([key, value]) => value)}
    ]"
    >
    <!-- <ClientOnly><pre>{{paramFilters}}</pre></ClientOnly> -->
    <pre>{{loading}}</pre>
    <!-- <pre>sort - {{sort}}</pre> -->
    <div class="__wrapper d-flex r-gap-15 desktopContainer">

      <Portal
        to="__asideFilters"
        :disabled="!statusBreakpoint.nowMOBILE"
        >
        <AsideFilters
          class="__wrapper-left"
          :data="data.aside"
          :skeleton="loading.all"
          :loadingBtn="Object.fromEntries(Object.entries(loading).filter(([key, value]) => ['btnSend', 'btnReset'].includes(key) && value))"
          @paramsFilters="(val, btnName) => {
            paramFilters = {
              ...val,
              sort: route.query.sort,
            }
            loading[btnName] = true
            showMobileMenu = ''
            page = 1
            refresh()
          }"
          @disabledBtnReset="(val) => disabledMobileBtnReset = val"
        />
      </Portal>

      <div class="__wrapper-right d-flex fd-c jcsb w100">
        <div class="_top d-flex aic jcsb">
          <Portal
            to="__commonSelect"
            :disabled="!statusBreakpoint.nowMOBILE"
            >
            <CommonSelect
              v-loading="loading.sort"
              :data="data.sort"
              :options="{
                checkedList: data.sort.find(i => i.key == route.query.sort) || data.sort[0],
              }"
              :skeleton="loading.all"
              :class="['loadingGreen']"
              @updateValue="(val: CommonSelectData) => {
                sort = val.key
                loading.sort = true
                showMobileMenu = ''
              }"
            />
          </Portal>
          <div
            v-loading="loading.btnSend || loading.btnReset"
            class="_top-left d-flex aic jcc flex-1 c-p loadingGreen mobile_show"
            @click="
              showMobileMenu = 'Фильтры',
              stopScrollBody()
            "
            >
            <span>Фильтры</span>
          </div>
          <div
            v-loading="loading.sort"
            class="_top-right d-flex aic jcc flex-1 c-p loadingGreen mobile_show"
            @click="
              showMobileMenu = 'Сортировка',
              stopScrollBody()
            "
            >
            <span>Сортировка</span>
          </div>
        </div>
        <div class="_body d-grid">
          <CommonCard
            v-for="item in loading.all ? Array(8) : CARDS"
            :item="item"
          />
        </div>
        <ElPagination
          v-model:currentPage="page"
          v-loading="loading.pagination"
          layout="prev, pager, next, slot"
          prevText="Назад"
          nextText="Вперед"
          :class="[
            'm-0-auto loadingGreen',
            {'loadingFetch': loading.all},
          ]"
          :pageCount="200"
          :hideOnSinglePage="true"
          :key="`${loading.all}`"
          @currentChange="(val: number) => {
            page = val,
            loading.pagination = true
            refresh()
          }"
          >
          <template #default>
            <a
              v-for="(i, idx) in 200"
              v-html="`Page ${idx + 1}`"
              :href="`${useRuntimeConfig().public.baseLocaleUrl}${$route.path}?page=${idx + 1}`"
              :key="idx"
            />
          </template>
        </ElPagination>
      </div>

      <div
        v-if="statusBreakpoint.nowMOBILE"
        :class="[
          '__wrapper-mobile d-flex fd-c pos-fixed bg_white w100 h100 top-0 z-5 desktopContainer pointer-initial',
          {'active': showMobileMenu}
        ]"
        >
        <div class="_top d-flex aic jcsb pos-sticky width_mobileFull mobilePadding">
          <span
            v-html="'Назад'"
            class="flex-1 tal c-p"
            @click="showMobileMenu = ''"
          />
          <span
            v-html="showMobileMenu"
            class="flex-1 tac"
          />
          <span
            v-html="'Сбросить'"
            :class="[
              'flex-1 tar c-p',
              {'opacity-0 pointer-none': disabledMobileBtnReset || showMobileMenu == 'Сортировка'}
            ]"
            @click="
              loading.btnReset = true,
              $throw('AsideFiltersBtnReset')
            "
          />
        </div>
        <div class="_body d-flex fd-c over-hidden over-y-auto scrollbarNone">
          <PortalTarget
            v-if="showMobileMenu == 'Фильтры'"
            name="__asideFilters"
          />
          <PortalTarget
            v-if="showMobileMenu == 'Сортировка'"
            name="__commonSelect"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">

  type Props = {
    data: {
      aside: AsideFiltersData[],
      sort: CommonSelectData[]
    }
  }
  const props = defineProps<Props>()

  const { statusBreakpoint } = useResponsive()
  const { $throw, $router } = useNuxtApp()
  const { stopScrollBody } = useHelpers()
  const { useMyFetch } = useMyApiRoutes()
  const route = useRoute()

  const page = ref(Number(route.query.page) || 1)

  const sort = ref(route.query.sort || props.data.sort[0].key)

  const paramFilters = ref<Record<string, unknown>>({})

  const showMobileMenu = ref('')

  const disabledMobileBtnReset = ref(false)

  const loading = ref({
    pagination: false,
    sort: false,
    btnSend: false,
    btnReset: false,
    all: true,
  })

  const createFirstParamFilters = (dataAside: AsideFiltersData[]) => {
    const exceptKeys: readonly string[] = ['page']
    const partlyExceptKeys = [
      {'sort': sort.value},
    ]

    const checkQuery = Boolean(Object.keys(route.query).filter(key => !exceptKeys.includes(key) && !partlyExceptKeys.reduce<string[]>((acc, obj) => acc.concat(Object.keys(obj)), []).includes(key)).length)

    const parseValue = (key: string, value: string) => {
      if(key.endsWith('_cb')) return !value ? [] : value.split(',')
      else if(['true', 'false'].includes(value)) return JSON.parse(value)
      else if(value.includes(',')) {
        return value.split(',').reduce((acc, item) => (([key, value]) => (acc[key] = value.split('-').map(i => Number(i)), acc))(item.split(':')), {} as Record<string, number[]>)
      }
      else if(!value.includes(',') && value.includes('-')) return value.split('-').map(i => Number(i))
      else return value
    }

    const parseQuery = Object.entries(route.query)
      .filter(([key]) => !exceptKeys.includes(key))
      .map(([key, value]) => [key.replace('_cb', ''), parseValue(key, `${value}`)])
      .filter(([key, value]) => !Array.isArray(value) && value || Array.isArray(value) && value.length)
      .reduce((acc, [key, value]) => {
        if(Array.isArray(value) && value.every(item => ['string'].includes(typeof item))) {
          if(!acc.params) acc.params = {}
          acc.params[key] = value

        } else acc[key] = value

        return Object.keys(acc).sort().reduce((sortedAcc, key) => ({ ...sortedAcc, [key]: acc[key] }), {})
      }, {} as { [k: string]: unknown, params?: Record<string, unknown> }
    )

    const parseData = dataAside.reduce((acc, item) => {
      if(item.checkedList && item.checkedList.length) {
        if(!acc.params) acc.params = {}
        if(item.key && !acc.params[item.key]) acc.params[item.key] = []
        if(item.key) acc.params[item.key].push(...item.checkedList?.map(obj => obj.key))
      } else if(item.elName && item.checked && item.key) {
        acc[item.key] = item.checked
      } else if(['CommonRange'].includes(item.componentName)) {
        if(item.key && Array.isArray(item.data)) {
          acc[item.key] = (item.data as CommonRangeData[]).reduce((accumulate, itm) => {
            accumulate[itm.key] = [Number(itm.min), Number(itm.max)]
            return accumulate
          }, {} as Record<string, number[]>)
        }
        if(!item.hasOwnProperty('key') && Array.isArray(item.data)) {
          (item.data as CommonRangeData[]).forEach((i) => {
            if(i.key) acc[i.key] = [Number(i.min), Number(i.max)]
          })
        }
      }
      else if(partlyExceptKeys.length) {
        acc = {...acc, ...partlyExceptKeys.reduce((acc, obj) => ({ ...acc, ...obj }), {})}
      }
      return Object.keys(acc).sort().reduce((sortedAcc, key) => ({ ...sortedAcc, [key]: acc[key] }), {})
    }, {} as { [key: string]: unknown, params?: Record<string, string[]> })

    // console.log('parseQuery', parseQuery)
    // console.log('parseData', parseData)
    // console.log('checkQueryVALUE', checkQuery)
    // console.log('FINAL_', checkQuery ? parseQuery : parseData)

    return paramFilters.value = checkQuery ? parseQuery : parseData
  }

  const { refresh, data: CARDS } = await useMyFetch<_fetchCard[]>(`/CartList`, {
    // body: createFirstParamFilters(props.data.aside),
    onResponse() {
      Object.keys(loading.value).forEach(key => loading.value[key as keyof typeof loading.value] = false)
      scrollToElement('#SectionCatalog')
    },
    watch: [sort],
    server: false,
    lazy: true,
  })

  watch(() => page.value,
    async (val) => {
      await $router.push({
        query: {
          ...route.query,
          page: val,
        },
      })
    }
  )
  watch(() => sort.value,
    async (val) => {
      paramFilters.value['sort'] = val
      await $router.push({
        query: {
          ...route.query,
          sort: val,
        },
      })
    },
    { immediate: true }
  )
  watch(() => statusBreakpoint.value.nowMOBILE,
    (val) => !val && (showMobileMenu.value = '')
  )
  watch(() => showMobileMenu.value,
    (val) => !val && stopScrollBody('reset')
  )

</script>

<style scoped lang="scss">
  .SectionCatalog {
    .__wrapper {
      @include value_adaptive(gap, 64, 32, $desktop, ($mobile + 1));
      &-left {}
      &-right {
        @include value_adaptive(row-gap, 64, 32);
        .CommonSelect {
          &.loadingFetch {
            @include value_change(display, null, none !important, $mobile)
          }
        }
        ._top {
          @include value_adaptive(column-gap, 20, 16);
          &-left, &-right {
            border: 1px solid $black;
            @include value_adaptive(height, 50, 42)
          }
        }
        ._body {
          @include value_adaptive(gap, 24, 16);
          @include value_change(grid-template-columns, repeat(auto-fill, minmax(280px, 1fr)), repeat(auto-fill, minmax(calc(140px + 140 * ((100vw - #{$mobile + 1 + px}) / ($desktop - ($mobile + 1)))), 1fr)), $desktop);
          @include value_change(grid-template-columns, repeat(auto-fill, minmax(280px, 1fr)), repeat(auto-fill, minmax(calc(140px + 40 * ((100vw - #{$dno + px}) / ($mobile - ($dno)))), 1fr)), $mobile);
        }
      }
      &-mobile {
        transition: left .3s;
        left: -100%;
        &.active {
          left: 0;
        }
        ._top {
          box-shadow: 0 6px 40px rgba($black, .05);
          @include value_adaptive(column-gap, 20, 16);
          @include value_adaptive((max-height, min-height), 60, 50);
        }
        ._body {
          @include value_change(padding-bottom, null, calc(16px + 24 * ((100vw - #{$dno + px}) / ($desktop - $dno))), $mobile);
        }
      }
    }
  }
</style>
