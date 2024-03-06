<template>

  <div class="desktopContainer pb-50">

    <NuxtLink
      class="d-flex mt-50 mb-50 wmc fw700 lh-1-9 underline-5 z-1 line-clamp-1 opacity-10 fz-50 black opacity"
      textContent="Catalog"
      :href="useLocalePath()('/catalog')"
    />

    <CommonAccordion accordionSimple>

      <CommonAccordionItem show> <!-- CommonForm -->
        <template #trigger>
          <span class="fz-20 fw600">CommonForm</span>
        </template>
        <template #content>
          <CommonForm
            :data="{
              checkboxData: checkbox.data,
              selectData: select.data,

              CHECKBOXcheckedList: checkbox.checkedList,
              CHECKBOXdisabledList: checkbox.disabledList,

              SELECTcheckedList: select.checkedList,
              SELECTdisabledList: select.disabledList,
            }"
          />
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonCounter -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">CommonCounter</span>
          <CommonButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="counter.toggle = !counter.toggle"
            >
            toggle data
          </CommonButton>
        </template>
        <template #content>
          <pre v-if="counter.toggle">
            simple - {{ counter.simple }}
            withSelect - {{ counter.withSelect }}
          </pre>
          <div class="d-flex fd-c r-gap-15">
            <CommonCounter
              :data="counter.dataSimple"
              :options="{
                max: 20,
                min: 1,
                step: 0.1,
                precision: 2,
              }"
              @updateValue="(val) => counter.simple = val.count"
            />

            <CommonCounter
              view="withSelect"
              :data="counter.dataPro"
              :options="{
                label: 'Количество:',
                max: 20,
                min: 1,
                step: 1,
                checkedSelect: counter.checkedSelect
              }"
              @updateValue="(val) => counter.withSelect = val"
            />
          </div>
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonShare -->
        <template #trigger>
          <span class="fz-20 fw600">CommonShare</span>
        </template>
        <template #content>
          <CommonShare
            :param="{
              image: 'https://loremflickr.com/1200/1301',
              title: 'title',
              descr: 'loremText',
            }"
          />
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonRatio -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">CommonRatio</span>
          <CommonButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="commonRatio.toggle = !commonRatio.toggle"
            >
            toggle data
          </CommonButton>
        </template>
        <template #content>
          <div class="d-flex fd-c r-gap-15">
            <pre v-if="commonRatio.toggle">
              tab - {{ commonRatio.tab }}
              circle - {{ commonRatio.circle }}
              group - {{ commonRatio.group }}
            </pre>
            <CommonRatio
              :data="commonRatio.data"
              :options="{
                label: 'Табы',
                error: false,
                disabledList: commonRatio.disabledList,
                checked: commonRatio.checked,
                noToggle: true
              }"
              @updateValue="(val) => commonRatio.tab = val"
            />
            <CommonRatio
              view="circle"
              :data="commonRatio.data"
              :options="{
                label: 'Цвета',
              }"
              @updateValue="(val) => commonRatio.circle = val"
            />
            <CommonRatio
              view="group"
              :data="commonRatio.data"
              :options="{
                label: 'Груповые',
                disabledList: commonRatio.disabledList,
                checked: commonRatio.checked,
                checkedChild: commonRatio.checkedChildList,
                disabledChildList: commonRatio.disabledChildList,
              }"
              @updateValue="(val) => commonRatio.group = val"
            />
          </div>
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonRange -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">CommonRange</span>
          <CommonButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="commonRange.toggle = !commonRange.toggle"
            >
            toggle data
          </CommonButton>
        </template>
        <template #content>
          <pre v-if="commonRange.toggle">
            result - {{ commonRange.result }}
          </pre>
          <CommonRange
            :data="commonRange.data"
            :options="{
              label: 'ЗАГОЛОВОК'
            }"
            @updateValue="(val) => commonRange.result = val"
          />
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- Other -->
        <template #trigger>
          <span class="fz-20 fw600">Other</span>
        </template>
        <template #content>
          <div class="d-flex flex-wrap gap-15">
            <CommonButton
              @click="
                ElMessageBox.confirm(`Вы действительно хотите удалить?`, {
                  confirmButtonText: 'Да',
                  cancelButtonText: 'Нет',
                })
                .then(() => $log('Успешно'))
                .catch(error => $log('ERRORconfirm', error))
              "
              >
              confirm
            </CommonButton>
            <CommonButton
              @click="ElMessage({
                showClose: true,
                message: 'Congrats, this is a success message. wefwe wefwefe',
                type: 'success'})
              "
              >
              message
            </CommonButton>
            <CommonButton
              @click="ElNotification({
                title: 'Prompt',
                message: '<strong>This is <i>HTML</i> string</strong>',
                position: 'bottom-right',
                dangerouslyUseHTMLString: true,
              })"
              >
              notification
            </CommonButton>
          </div>
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- Theme -->
        <template #trigger>
          <span class="fz-20 fw600">Theme</span>
        </template>
        <template #content>
          <CommonTheme />
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonMap -->
        <template #trigger>
          <span class="fz-20 fw600">CommonMap</span>
        </template>
        <template #content>
          <CommonMap
            :data="map"
            :options="{
              showAll: false
            }"
          />
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonBreadcrumbs -->
        <template #trigger>
          <span class="fz-20 fw600">CommonBreadcrumbs</span>
        </template>
        <template #content>
          <CommonBreadcrumbs :data="breadcrumbsList" />
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonShowMore -->
        <template #trigger>
          <span class="fz-20 fw600">CommonShowMore</span>
        </template>
        <template #content>
          <CommonShowMore
            :data="{
              shortText: showMore.shortText,
              fullText: showMore.fullText
            }"
          />
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonSlider -->
        <template #trigger>
          <span class="fz-20 fw600">CommonSlider</span>
        </template>
        <template #content>
          <div class="d-flex fd-c r-gap-15">

            <div class="d-flex fd-c">
              <h2>CommonSliderOne</h2>
              <CommonSlider
                :options="{
                  slidesPerView: 'auto',
                  autoplay: false,
                  navigation: true,
                  pagination: {
                    dynamicBullets: true,
                    dynamicMainBullets: 3,
                  },
                  modules: [
                    SwiperPagination,
                    SwiperNavigation,
                    SwiperZoom,
                    SwiperAutoplay,
                  ]
                }"
                >
                <SwiperSlide
                  style="height: 400px"
                  v-for="(slide, index) in 10"
                  :key="slide"
                  >
                  <div class="swiper-zoom-container">
                    <NuxtPicture
                      class="h100 w100"
                      :preload="!index"
                      :alt="`picture_${index}`"
                      :src="`https://loremflickr.com/777/130${index}/car`"
                      :imgAttrs="{class: 'obj-cover'}"
                    />
                  </div>
                </SwiperSlide>
              </CommonSlider>
            </div>

            <div class="d-flex fd-c">
              <h2>CommonSliderTwo</h2>
              <CommonSlider
                view="two"
                :options="{
                  slidesPerView: 'auto',
                  autoplay: true,
                  navigation: true,
                  scrollbar: true,
                  modules: [
                    SwiperScrollbar,
                    SwiperAutoplay,
                  ]
                }"
                >
                <SwiperSlide
                  v-for="(slide, index) in 6"
                  :key="slide"
                  style="height: 400px; width: 300px"
                  >
                  <NuxtPicture
                    class="h100 w100"
                    :src="`https://loremflickr.com/1200/130${index}/car`"
                    :imgAttrs="{class: 'obj-cover'}"
                  />
                </SwiperSlide>
              </CommonSlider>
            </div>
          </div>
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonButton -->
        <template #trigger>
          <span class="fz-20 fw600">Buttons</span>
        </template>
        <template #content>
          <div class="d-flex flex-wrap gap-20">

            <CommonButton>view One</CommonButton>

            <CommonButton view="two">view Two</CommonButton>

            <CommonButton
              :options="{
                disabled: true,
              }"
              >
              disabled
            </CommonButton>

            <CommonButton
              :options="{
                error: btnError,
              }"
              @clickBtn="errorButton()"
              >
              error
            </CommonButton>

            <CommonButton
              :options="{
                loading: true,
              }"
              >
              loading
            </CommonButton>

            <CommonButton
              view="two"
              :options="{
                skeleton: true,
              }"
              >
              skeleton
            </CommonButton>

            <CommonButton
              :options="{
                to: 'https://vuejs.org/guide/typescript/composition-api.html',
                target: '_blank'
              }"
              >
              link
            </CommonButton>

          </div>
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonModal -->
        <template #trigger>
          <span class="fz-20 fw600">Modal</span>
        </template>
        <template #content>
          <CommonButton @clickBtn="showModal = true">showModal</CommonButton>
          <CommonModal
            :showModal="showModal"
            :options="{
              closeIcon: true,
              width: 600,
            }"
            @closeModal="showModal = false"
            >
            <h1 class="tac mt-20 mb-20" @click="showModalLoading()">CLICK DISABLED 10s</h1>
            <NuxtLink :to="useLocalePath()('/catalog')">go catalog</NuxtLink>
            <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam obcaecati in ab debitis aut aliquam optio? Quasi, id? Accusamus maiores tempore ipsam est? Non, nostrum voluptate dicta repellendus vel tempore!
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam obcaecati in ab debitis aut aliquam optio? Quasi, id? Accusamus maiores tempore ipsam est? Non, nostrum voluptate dicta repellendus vel tempore!
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam obcaecati in ab debitis aut aliquam optio? Quasi, id? Accusamus maiores tempore ipsam est? Non, nostrum voluptate dicta repellendus vel tempore!
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam obcaecati in ab debitis aut aliquam optio? Quasi, id? Accusamus maiores tempore ipsam est? Non, nostrum voluptate dicta repellendus vel tempore!</h1>
          </CommonModal>
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonInput -->
        <template #trigger>
          <span class="fz-20 fw600">Input</span>
        </template>
        <template #content>
          <div class="d-flex fd-c r-gap-15">
            <CommonInput
              :options="{
                label: 'simple',
                placeholder: 'placeholder',
              }"
              @updateValue="(val) => form.name = val"
              @keyAction="(event) => event.key == 'G' && $log('check G')"
              >
              <template #prefix>prefix</template>
              <template #suffix>prefix</template>
            </CommonInput>
            <CommonInput
              :options="{
                label: 'simple done',
                done: true,
              }"
              @updateValue="(val) => form.name = val"
            />
            <CommonInput
              :options="{
                label: 'simple error',
                error: true,
                errorMessage: 'error message'
              }"
              @updateValue="(val) => form.name = val"
            />
            <CommonInput
              :options="{
                label: 'reset value',
              }"
              @updateValue="(val) => form.reset = val"
              @reset="() => form.reset = ''"
            />
            <CommonInput
              :options="{
                label: 'password',
                type: 'password',
              }"
              @updateValue="(val) => form.password = val"
            />
            <CommonInput
              :options="{
                label: 'phone',
                inputmode: 'tel', // numeric - с маской || tel - без маски
                replaceValue: (/[^+\d]|(\+)(?=.*\+)/g) // без маски - (/[^+\d]|(\+)(?=.*\+)/g)
              }"
              @updateValue="(val) => form.phone = val"
            />
            <CommonInput
              :options="{
                label: 'disabled',
                disabled: true,
              }"
              @updateValue="(val) => form.name = val"
            />
          </div>
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonTextarea -->
        <template #trigger>
          <span class="fz-20 fw600">Textarea</span>
        </template>
        <template #content>
          <CommonTextarea
            :options="{
              label: 'textarea',
              placeholder: 'placeholder',
              maxlength: 20,
            }"
            @updateValue="(val) => textarea = val"
          />
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonUpload -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">CommonUpload</span>
          <CommonButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="upload.toggle = !upload.toggle"
            >
            toggle data
          </CommonButton>
        </template>
        <template #content>
          <pre v-if="upload.toggle">
            multiple - {{ upload.multiple }}
            images - {{ upload.images }}
            basic - {{ upload.basic }}
          </pre>

          <div class="d-flex fd-c r-gap-15">
            <CommonUpload
              :options="{
                multiple: true,
                label: 'multiple',
                multipleLimit: 3,
              }"
              @updateValue="(val: File[]) => upload.multiple = val"
            />
            <CommonUpload
              :options="{
                multiple: true,
                error: false,
                multipleLimit: 3,
                format: '.png, .jpg, .webp',
                label: 'image upload'
              }"
              @updateValue="(val: File[]) => upload.images = val"
            />
            <CommonUpload
              :options="{
                error: false,
                label: 'basic'
              }"
              @updateValue="(val: string) => upload.basic= val"
            />
          </div>
        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonCheckbox -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">Checkbox</span>
          <CommonButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="checkbox.toggle = !checkbox.toggle"
            >
            toggle data
          </CommonButton>
        </template>
        <template #content>
          <pre v-if="checkbox.toggle">
            basic - {{ checkbox.basic }}
            multiple - {{ checkbox.multiple }}
            color - {{ checkbox.color }}
          </pre>

          <div class="d-flex fd-c r-gap-15">
            <CommonCheckbox
              :options="{
                label: 'лейбл чекбокс',
                elName: 'Обычный чекбокс',
                checked: true,
              }"
              @updateValue="(val: boolean) => checkbox.basic = val"
            />

            <CommonCheckbox
              :data="checkbox.data"
              :options="{
                elName: 'Выделить все',
                checkboxGroup: true,
                checkedList: checkbox.checkedList,
                disabledList: checkbox.disabledList,
              }"
              @updateValue="(val: CommonCheckboxData[]) => checkbox.multiple = val"
            />

            <CommonCheckbox
              view="color"
              :data="checkbox.data"
              :options="{
                elName: 'Выделить все',
                checkboxGroup: true,
              }"
              @updateValue="(val) => checkbox.color = val"
            />
          </div>

        </template>
      </CommonAccordionItem>

      <CommonAccordionItem> <!-- CommonSelect -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">CommonSelect</span>
          <CommonButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="select.toggle = !select.toggle"
            >
            toggle data
          </CommonButton>
        </template>
        <template #content>
          <pre v-if="select.toggle">
            basic - {{ select.basic }}
            images - {{ select.images }}
            multiple - {{ select.multiple }}
          </pre>

          <div class="d-flex fd-c r-gap-15">
            <CommonSelect
              :data="select.data"
              :options="{
                label: 'Basic',
                placeholder: 'Выбрать...',
                customRequired: true,
              }"
              @updateValue="(val: CommonSelectData) => select.basic = val"
            />
            <CommonSelect
              :data="select.data"
              :options="{
                placeholder: 'Выбрать картинку...',
                checkedList: select.checkedList[0],
                disabledList: select.checkedList,
              }"
              @updateValue="(val: CommonSelectData) => select.images = val"
            />
            <CommonSelect
              :data="select.data"
              :options="{
                multiple: true,
                checkedList: select.checkedList,
                disabledList: select.disabledList
              }"
              @updateValue="(val: CommonSelectData[]) => select.multiple = val"
            />
          </div>
        </template>
      </CommonAccordionItem>

    </CommonAccordion>
  </div>

  <div class="over-x mt-30 mb-30">
    <CommonCrawLine :data="crawLine" />
  </div>

</template>

<script setup lang="ts">

  const { $throw } = useNuxtApp()
  const { width, height, scrollY, scrollToggle, statusBreakpoint } = useResponsive()

  //---CommonRatio
  const commonRatio = ref({
    toggle: false,

    tab: {},
    circle: {},
    group: {},

    data: [
      {
        val: 'один',
        key: '#DC6872',
      },
      {
        val: 'два',
        key: '#DC68A7',
        list: [
          {
            val: 'child One',
            key: '--1',
          },
          {
            val: 'child Two',
            key: '--2',
          },
          {
            val: 'child Three',
            key: '--3',
          },
        ]
      },
      {
        val: 'три333',
        key: '#68DCD5',
        list: []
      },
      {
        val: 'четыре',
        key: '#94DC68',
        list: [
          {
            val: 'child Four',
            key: '--4',
          },
          {
            val: 'child Five',
            key: '--5',
          },
          {
            val: 'child Six',
            key: '--6',
          },
        ]
      },
      {
        val: 'пять',
        key: '#94DC12',
        list: []
      },
      {
        val: 'шесть',
        key: '#94DC13',
        list: []
      },
      {
        val: 'семь',
        key: '#94DC14',
        list: []
      },
      {
        val: 'восемь',
        key: '#94DC15',
        list: []
      }
    ],

    checked: {
      val: 'два',
      key: '#DC68A7',
    },
    checkedChildList: {
      val: 'child Three',
      key: '--3',
    },
    disabledList: [
      {
        val: 'шесть',
        key: '#94DC13',
      },
    ],
    disabledChildList: [
      {
        val: 'child Three',
        key: '--4',
      },
    ],
  })

  //---CommonRange
  const commonRange = ref({
    toggle: false,

    result: {},

    data: [
      {
        key: 'width',
        val: 'Ширина, см',
        min: '40.21',
        max: '187.29',
      },
      {
        key: 'other',
        val: '',
        min: '10.22',
        max: '133.97',
      },
      {
        key: 'height',
        val: 'Высота, см',
        min: '20.33',
        max: '201.14',
      },
    ]
  })

  //---Map
  const map = ref([
    {
      "lat": "55.755864",
      "lng": "37.617698",
      "name": "Ташкент",
      "descr": "428.000"
    },
    {
      "lat": "59.938955",
      "lng": "30.315644",
      "name": "Ташкент",
      "descr": "234.000"
    },
    {
      "lat": "55.030204",
      "lng": "82.92043",
      "name": "Ташкент",
      "descr": "218.000"
    },
    {
      "lat": "52.289588",
      "lng": "104.280606",
      "name": "Ташкент",
      "descr": "199.000"
    },
    {
      "lat": "47.222078",
      "lng": "39.720358",
      "name": "Ташкент",
      "descr": "213.530"
    },
    {
      "lat": "41.311158",
      "lng": "69.279737",
      "name": "Ташкент",
      "descr": "101.000"
    }
  ])

  //---BreadcrumbsList
  const breadcrumbsList = reactive([
    {
      title: 'Catalog',
      slug: 'catalog'
    },
    {
      title: 'IT',
    },
  ])

  //---ShowMore
  const showMore = reactive({
    shortText: '<p>p - shortTe ppp pp shortText shortText</p>',
    fullText: '<p>p - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum repellat fugit recusandae impedit minus deleniti, ipsa autem ipsam perspiciatis praesentium sed et libero. Odit consectetur optio fuga quibusdam exercitationem autem!</p><a href="/#">link</a><h1>h1</h1><h2>h2</h2><h3>h3</h3><h4>h4</h4><ul><li>shortText</li><li>shortText</li><li>shortText</li></ul><ol><li>shortText</li><li>shortText</li><li>shortText</li></ol><img src="https://loremflickr.com/200/300/car" alt="car" />',
  })

  //---Buttons
  const btnError = ref(false)
  const errorButton = () => {
    setTimeout(() => {
      return btnError.value = false
    }, 700)
    return btnError.value = true
  }

  //---Modal
  const showModal = ref(false)
  const showModalLoading = () => {
    setTimeout(() => {
      $throw('disabledModal', false)
    }, 10000)
    $throw('disabledModal', true)
  }

  //---Counter
  const counter = ref({
    toggle: false,

    simple: {},
    withSelect: {},

    dataSimple: {
      count: '1',
    },
    dataPro: {
      count: '2',
      select: [
        {
          val: 'упак.',
          key: '--1',
        },
        {
          val: 'м²',
          key: '--2',
        },
        {
          val: 'G²',
          key: '--3',
        },
      ]
    },
    checkedSelect: {
      val: 'G²',
      key: '--3',
    }
  })

  //---Input
  const form = reactive({
    name: '',
    password: '',
    reset: '',
    phone: '',
  })

  //---Textarea
  const textarea = ref('')

  //---Upload
  const upload = reactive({
    toggle: false,

    multiple: [] as File[],
    images: [] as File[],
    basic: '',
  })

  //---Checkbox
  const checkbox = reactive({
    toggle: false,

    basic: false,
    multiple: [] as CommonCheckboxData[],
    color: [],

    data: [
      {
        val: 'один',
        key: '#DC6872',
      },
      {
        val: 'два',
        key: '#DC68A7',
      },
      {
        val: 'три',
        key: '#68DCD5',
      },
      {
        val: 'четыре',
        key: '#94DC68',
      },
      {
        val: 'пять',
        key: '#2036FF',
      },
      {
        val: 'шесть',
        key: '#DC6873',
      },
      {
        val: 'семь',
        key: '#FFE600',
      },
      {
        val: 'восемь',
        key: '#5D5FEF'
      }
    ],
    checkedList: [
      {
        val: 'три',
        key: '#68DCD5',
      },
      {
        val: 'шесть',
        key: '#DC6873',
      },
    ],
    disabledList: [
      {
        val: 'восемь',
        key: '#5D5FEF'
      }
    ]
  })

  //---Select
  const select = reactive({
    toggle: false,

    basic: {} as CommonSelectData,
    images: {} as CommonSelectData,
    multiple: [] as CommonSelectData[],

    data: [
      {
        val: 'тест1',
        key: '--1',
        image: 'https://loremflickr.com/30/31/car',
      },
      {
        val: 'тест2',
        key: '--2',
        image: 'https://loremflickr.com/30/32/car',
      },
      {
        val: 'тест3',
        key: '--3',
        image: 'https://loremflickr.com/30/33/car',
      },
      {
        val: 'тест4',
        key: '--4',
        image: 'https://loremflickr.com/30/34/car',
      },
      {
        val: 'тест5',
        key: '--5',
        image: 'https://loremflickr.com/30/35/car',
      },
      {
        val: 'тест6',
        key: '--6',
        image: 'https://loremflickr.com/30/36/car',
      },
    ],
    checkedList: [
      {
        val: 'тест2',
        key: '--2',
        image: 'https://loremflickr.com/30/32/car',
      },
      {
        val: 'тест4',
        key: '--4',
        image: 'https://loremflickr.com/30/34/car',
      },
    ],
    disabledList: [
      {
        val: 'тест5',
        key: '--5',
        image: 'https://loremflickr.com/30/35/car',
      }
    ],
  })

  //---CrawLine
  const crawLine = ref([
    {
      speed: 24,
      content: [
        {
          icon: '',
          text: 'Account-manager VAD',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'Accouager',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'Account-manager',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'Accouager',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'Account-manager',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'Accouager',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'Account-manager',
        },
      ]
    },
    {
      reverse: true,
      content: [
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: '',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'eererrer',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'dddount-manager',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: '--Aount-manr',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'eererrer',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'dddount-manager',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: '--Aount-manr',
        },
      ]
    },
    {
      speed: 32,
      content: [
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: '',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'eererrer',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: 'dddount-manager',
        },
        {
          icon: 'https://loremflickr.com/200/300/car',
          text: '--Aount-manr',
        },
      ]
    },
  ])

</script>

<style lang="scss" scoped>
  :deep() .CommonAccordionItem {
    .__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
