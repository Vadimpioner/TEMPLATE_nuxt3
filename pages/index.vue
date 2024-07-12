<template>

  <div class="desktopContainer pb-50">

    <NuxtLink
      class="d-flex mt-50 mb-50 wmc fw700 lh-1-9 underline-5 z-1 line-clamp-1 opacity-10 fz-50 black opacity"
      textContent="Catalog"
      :href="useLocalePath()('/catalog')"
    />

    <UiAccordion accordionSimple>

      <UiAccordionItem> <!-- FormMain -->
        <template #trigger>
          <span class="fz-20 fw600">FormMain</span>
        </template>
        <template #content>
          <FormMain
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
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiCounter -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UiCounter</span>
          <UiButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="counter.toggle = !counter.toggle"
            >
            toggle data
          </UiButton>
        </template>
        <template #content>
          <pre v-if="counter.toggle">
            simple - {{ counter.simple }}
            withSelect - {{ counter.withSelect }}
          </pre>
          <div class="d-flex fd-c r-gap-15">
            <UiCounter
              :data="counter.dataSimple"
              :options="{
                max: 20,
                min: 1,
                step: 0.1,
                precision: 2,
              }"
              @updateValue="(val) => counter.simple = val.count"
            />

            <UiCounter
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
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiShare -->
        <template #trigger>
          <span class="fz-20 fw600">UiShare</span>
        </template>
        <template #content>
          <UiShare
            :param="{
              image: 'https://loremflickr.com/1200/1301',
              title: 'title',
              descr: 'loremText',
            }"
          />
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiRadio -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UiRadio</span>
          <UiButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="radio.toggle = !radio.toggle"
            >
            toggle data
          </UiButton>
        </template>
        <template #content>
          <div class="d-flex fd-c r-gap-15">
            <pre v-if="radio.toggle">
              tab - {{ radio.tab }}
              circle - {{ radio.circle }}
              group - {{ radio.group }}
            </pre>
            <UiRadio
              :data="radio.data"
              :options="{
                label: 'Табы',
                error: false,
                disabledList: radio.disabledList,
                checked: radio.checked,
                noToggle: true
              }"
              @updateValue="(val) => radio.tab = val"
            />
            <UiRadio
              view="circle"
              :data="radio.data"
              :options="{
                label: 'Цвета',
              }"
              @updateValue="(val) => radio.circle = val"
            />
            <UiRadio
              view="group"
              :data="radio.data"
              :options="{
                label: 'Груповые',
                disabledList: radio.disabledList,
                checked: radio.checked,
                checkedChild: radio.checkedChildList,
                disabledChildList: radio.disabledChildList,
              }"
              @updateValue="(val) => radio.group = val"
            />
          </div>
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiRange -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UiRange</span>
          <UiButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="range.toggle = !range.toggle"
            >
            toggle data
          </UiButton>
        </template>
        <template #content>
          <pre v-if="range.toggle">
            result - {{ range.result }}
          </pre>
          <UiRange
            :data="range.data"
            :options="{
              label: 'ЗАГОЛОВОК'
            }"
            @updateValue="(val) => range.result = val"
          />
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- Other -->
        <template #trigger>
          <span class="fz-20 fw600">Other</span>
        </template>
        <template #content>
          <div class="d-flex flex-wrap gap-15">
            <UiButton
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
            </UiButton>
            <UiButton
              @click="ElMessage({
                showClose: true,
                message: 'Congrats, this is a success message. wefwe wefwefe',
                type: 'success'})
              "
              >
              message
            </UiButton>
            <UiButton
              @click="ElNotification({
                title: 'Prompt',
                message: '<strong>This is <i>HTML</i> string</strong>',
                position: 'bottom-right',
                dangerouslyUseHTMLString: true,
              })"
              >
              notification
            </UiButton>
          </div>
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- Theme -->
        <template #trigger>
          <span class="fz-20 fw600">Theme</span>
        </template>
        <template #content>
          <UiTheme />
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiMap -->
        <template #trigger>
          <span class="fz-20 fw600">UiMap</span>
        </template>
        <template #content>
          <UiMap
            :data="map"
            :options="{
              showAll: false
            }"
          />
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiBreadcrumbs -->
        <template #trigger>
          <span class="fz-20 fw600">UiBreadcrumbs</span>
        </template>
        <template #content>
          <UiBreadcrumbs :data="breadcrumbsList" />
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiShowMore -->
        <template #trigger>
          <span class="fz-20 fw600">UiShowMore</span>
        </template>
        <template #content>
          <UiShowMore
            :data="{
              shortText: showMore.shortText,
              fullText: showMore.fullText
            }"
          />
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiSlider -->
        <template #trigger>
          <span class="fz-20 fw600">UiSlider</span>
        </template>
        <template #content>
          <div class="d-flex fd-c r-gap-15">

            <div class="d-flex fd-c">
              <h2>UiSliderOne</h2>
              <UiSlider
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
                  v-for="(slide, index) of 10"
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
              </UiSlider>
            </div>

            <div class="d-flex fd-c">
              <h2>UiSliderTwo</h2>
              <UiSlider
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
                  v-for="(slide, index) of 6"
                  :key="slide"
                  style="height: 400px; width: 300px"
                  >
                  <NuxtPicture
                    class="h100 w100"
                    :src="`https://loremflickr.com/1200/130${index}/car`"
                    :imgAttrs="{class: 'obj-cover'}"
                  />
                </SwiperSlide>
              </UiSlider>
            </div>
          </div>
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiButton -->
        <template #trigger>
          <span class="fz-20 fw600">Buttons</span>
        </template>
        <template #content>
          <div class="d-flex flex-wrap gap-20">

            <UiButton>view One</UiButton>

            <UiButton view="two">view Two</UiButton>

            <UiButton
              :options="{
                disabled: true,
              }"
              >
              disabled
            </UiButton>

            <UiButton
              :options="{
                error: btnError,
              }"
              @clickBtn="errorButton()"
              >
              error
            </UiButton>

            <UiButton
              :options="{
                loading: true,
              }"
              >
              loading
            </UiButton>

            <UiButton
              view="two"
              :options="{
                skeleton: true,
              }"
              >
              skeleton
            </UiButton>

            <UiButton
              :options="{
                to: 'https://vuejs.org/guide/typescript/composition-api.html',
                target: '_blank'
              }"
              >
              link
            </UiButton>

          </div>
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiModal -->
        <template #trigger>
          <span class="fz-20 fw600">Modal</span>
        </template>
        <template #content>
          <UiButton @clickBtn="showModal = true">showModal</UiButton>
          <UiModal
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
          </UiModal>
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiInput -->
        <template #trigger>
          <span class="fz-20 fw600">Input</span>
        </template>
        <template #content>
          <div class="d-flex fd-c r-gap-15">
            <UiInput
              :options="{
                label: 'simple',
                placeholder: 'placeholder',
              }"
              @updateValue="(val) => form.name = val"
              @keyAction="(event) => event.key == 'G' && $log('check G')"
              >
              <template #prefix>prefix</template>
              <template #suffix>prefix</template>
            </UiInput>
            <UiInput
              :options="{
                label: 'simple done',
                done: true,
              }"
              @updateValue="(val) => form.name = val"
            />
            <UiInput
              :options="{
                label: 'simple error',
                error: true,
                errorMessage: 'error message'
              }"
              @updateValue="(val) => form.name = val"
            />
            <UiInput
              :options="{
                label: 'reset value',
              }"
              @updateValue="(val) => form.reset = val"
              @reset="() => form.reset = ''"
            />
            <UiInput
              :options="{
                label: 'password',
                type: 'password',
              }"
              @updateValue="(val) => form.password = val"
            />
            <UiInput
              :options="{
                label: 'phone',
                inputmode: 'tel', // numeric - с маской || tel - без маски
                replaceValue: (/[^+\d]|(\+)(?=.*\+)/g) // без маски - (/[^+\d]|(\+)(?=.*\+)/g)
              }"
              @updateValue="(val) => form.phone = val"
            />
            <UiInput
              :options="{
                label: 'disabled',
                disabled: true,
              }"
              @updateValue="(val) => form.name = val"
            />
          </div>
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiTextarea -->
        <template #trigger>
          <span class="fz-20 fw600">Textarea</span>
        </template>
        <template #content>
          <UiTextarea
            :options="{
              label: 'textarea',
              placeholder: 'placeholder',
              maxlength: 20,
            }"
            @updateValue="(val) => textarea = val"
          />
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiUpload -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UiUpload</span>
          <UiButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="upload.toggle = !upload.toggle"
            >
            toggle data
          </UiButton>
        </template>
        <template #content>
          <pre v-if="upload.toggle">
            multiple - {{ upload.multiple }}
            images - {{ upload.images }}
            basic - {{ upload.basic }}
          </pre>

          <div class="d-flex fd-c r-gap-15">
            <UiUpload
              :options="{
                multiple: true,
                label: 'multiple',
                multipleLimit: 3,
              }"
              @updateValue="(val: File[]) => upload.multiple = val"
            />
            <UiUpload
              :options="{
                multiple: true,
                error: false,
                multipleLimit: 3,
                format: '.png, .jpg, .webp',
                label: 'image upload'
              }"
              @updateValue="(val: File[]) => upload.images = val"
            />
            <UiUpload
              :options="{
                error: false,
                label: 'basic'
              }"
              @updateValue="(val: string) => upload.basic= val"
            />
          </div>
        </template>
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiCheckbox -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">Checkbox</span>
          <UiButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="checkbox.toggle = !checkbox.toggle"
            >
            toggle data
          </UiButton>
        </template>
        <template #content>
          <pre v-if="checkbox.toggle">
            basic - {{ checkbox.basic }}
            multiple - {{ checkbox.multiple }}
            color - {{ checkbox.color }}
          </pre>

          <div class="d-flex fd-c r-gap-15">
            <UiCheckbox
              :options="{
                label: 'лейбл чекбокс',
                elName: 'Обычный чекбокс',
                checked: true,
              }"
              @updateValue="(val: boolean) => checkbox.basic = val"
            />

            <UiCheckbox
              :data="checkbox.data"
              :options="{
                elName: 'Выделить все',
                checkboxGroup: true,
                checkedList: checkbox.checkedList,
                disabledList: checkbox.disabledList,
              }"
              @updateValue="(val: UiCheckboxData[]) => checkbox.multiple = val"
            />

            <UiCheckbox
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
      </UiAccordionItem>

      <UiAccordionItem> <!-- UiSelect -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UiSelect</span>
          <UiButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="select.toggle = !select.toggle"
            >
            toggle data
          </UiButton>
        </template>
        <template #content>
          <pre v-if="select.toggle">
            basic - {{ select.basic }}
            images - {{ select.images }}
            multiple - {{ select.multiple }}
          </pre>

          <div class="d-flex fd-c r-gap-15">
            <UiSelect
              :data="select.data"
              :options="{
                label: 'Basic',
                placeholder: 'Выбрать...',
                customRequired: true,
              }"
              @updateValue="(val: UiSelectData) => select.basic = val"
            />
            <UiSelect
              :data="select.data"
              :options="{
                placeholder: 'Выбрать картинку...',
                checkedList: select.checkedList[0],
                disabledList: select.checkedList,
              }"
              @updateValue="(val: UiSelectData) => select.images = val"
            />
            <UiSelect
              :data="select.data"
              :options="{
                multiple: true,
                checkedList: select.checkedList,
                disabledList: select.disabledList
              }"
              @updateValue="(val: UiSelectData[]) => select.multiple = val"
            />
          </div>
        </template>
      </UiAccordionItem>

    </UiAccordion>
  </div>

  <div class="over-x mt-30 mb-30">
    <UiCrawLine :data="crawLine" />
  </div>

</template>

<script setup lang="ts">

  const { $throw } = useNuxtApp()
  const { width, height, scrollY, scrollToggle, statusBreakpoint } = useResponsive()

  //---UiRadio
  const radio = reactive({
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

  //---UiRange
  const range = reactive({
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
  const map = [
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
  ]

  //---BreadcrumbsList
  const breadcrumbsList = [
    {
      title: 'Catalog',
      slug: 'catalog'
    },
    {
      title: 'IT',
    },
  ]

  //---ShowMore
  const showMore = {
    shortText: '<p>p - shortTe ppp pp shortText shortText</p>',
    fullText: '<p>p - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum repellat fugit recusandae impedit minus deleniti, ipsa autem ipsam perspiciatis praesentium sed et libero. Odit consectetur optio fuga quibusdam exercitationem autem!</p><a href="/#">link</a><h1>h1</h1><h2>h2</h2><h3>h3</h3><h4>h4</h4><ul><li>shortText</li><li>shortText</li><li>shortText</li></ul><ol><li>shortText</li><li>shortText</li><li>shortText</li></ol><img src="https://loremflickr.com/200/300/car" alt="car" />',
  }

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
  const counter = reactive({
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
    multiple: [] as UiCheckboxData[],
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

    basic: {} as UiSelectData,
    images: {} as UiSelectData,
    multiple: [] as UiSelectData[],

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
  const crawLine = [
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
  ]

</script>

<style lang="scss" scoped>
  :deep() .UiAccordionItem {
    .__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
