<template>

  <div class="desktopContainer pb-50">

    <NuxtLink
      class="d-flex mt-50 mb-50 wmc fw700 lh-1-9 underline-5 z-1 line-clamp-1 opacity-10 fz-50 black opacity"
      textContent="Catalog"
      :href="useLocalePath()('/catalog')"
    />

    <UIAccordion accordionSimple>

      <UIAccordionItem> <!-- FormMain -->
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
      </UIAccordionItem>

      <UIAccordionItem> <!-- UICounter -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UICounter</span>
          <UIButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="counter.toggle = !counter.toggle"
            >
            toggle data
          </UIButton>
        </template>
        <template #content>
          <pre v-if="counter.toggle">
            simple - {{ counter.simple }}
            withSelect - {{ counter.withSelect }}
          </pre>
          <div class="d-flex fd-c r-gap-15">
            <UICounter
              :data="counter.dataSimple"
              :options="{
                max: 20,
                min: 1,
                step: 0.1,
                precision: 2,
              }"
              @updateValue="(val) => counter.simple = val.count"
            />

            <UICounter
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
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIShare -->
        <template #trigger>
          <span class="fz-20 fw600">UIShare</span>
        </template>
        <template #content>
          <UIShare
            :param="{
              image: 'https://loremflickr.com/1200/1301',
              title: 'title',
              descr: 'loremText',
            }"
          />
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIRadio -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UIRadio</span>
          <UIButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="radio.toggle = !radio.toggle"
            >
            toggle data
          </UIButton>
        </template>
        <template #content>
          <div class="d-flex fd-c r-gap-15">
            <pre v-if="radio.toggle">
              tab - {{ radio.tab }}
              circle - {{ radio.circle }}
              group - {{ radio.group }}
            </pre>
            <UIRadio
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
            <UIRadio
              view="circle"
              :data="radio.data"
              :options="{
                label: 'Цвета',
              }"
              @updateValue="(val) => radio.circle = val"
            />
            <UIRadio
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
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIRange -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UIRange</span>
          <UIButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="range.toggle = !range.toggle"
            >
            toggle data
          </UIButton>
        </template>
        <template #content>
          <pre v-if="range.toggle">
            result - {{ range.result }}
          </pre>
          <UIRange
            :data="range.data"
            :options="{
              label: 'ЗАГОЛОВОК'
            }"
            @updateValue="(val) => range.result = val"
          />
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- Other -->
        <template #trigger>
          <span class="fz-20 fw600">Other</span>
        </template>
        <template #content>
          <div class="d-flex flex-wrap gap-15">
            <UIButton
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
            </UIButton>
            <UIButton
              @click="ElMessage({
                showClose: true,
                message: 'Congrats, this is a success message. wefwe wefwefe',
                type: 'success'})
              "
              >
              message
            </UIButton>
            <UIButton
              @click="ElNotification({
                title: 'Prompt',
                message: '<strong>This is <i>HTML</i> string</strong>',
                position: 'bottom-right',
                dangerouslyUseHTMLString: true,
              })"
              >
              notification
            </UIButton>
          </div>
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- Theme -->
        <template #trigger>
          <span class="fz-20 fw600">Theme</span>
        </template>
        <template #content>
          <UITheme />
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIMap -->
        <template #trigger>
          <span class="fz-20 fw600">UIMap</span>
        </template>
        <template #content>
          <UIMap
            :data="map"
            :options="{
              showAll: false
            }"
          />
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIBreadcrumbs -->
        <template #trigger>
          <span class="fz-20 fw600">UIBreadcrumbs</span>
        </template>
        <template #content>
          <UIBreadcrumbs :data="breadcrumbsList" />
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIShowMore -->
        <template #trigger>
          <span class="fz-20 fw600">UIShowMore</span>
        </template>
        <template #content>
          <UIShowMore
            :data="{
              shortText: showMore.shortText,
              fullText: showMore.fullText
            }"
          />
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UISlider -->
        <template #trigger>
          <span class="fz-20 fw600">UISlider</span>
        </template>
        <template #content>
          <div class="d-flex fd-c r-gap-15">

            <div class="d-flex fd-c">
              <h2>UISliderOne</h2>
              <UISlider
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
              </UISlider>
            </div>

            <div class="d-flex fd-c">
              <h2>UISliderTwo</h2>
              <UISlider
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
              </UISlider>
            </div>
          </div>
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIButton -->
        <template #trigger>
          <span class="fz-20 fw600">Buttons</span>
        </template>
        <template #content>
          <div class="d-flex flex-wrap gap-20">

            <UIButton>view One</UIButton>

            <UIButton view="two">view Two</UIButton>

            <UIButton
              :options="{
                disabled: true,
              }"
              >
              disabled
            </UIButton>

            <UIButton
              :options="{
                error: btnError,
              }"
              @clickBtn="errorButton()"
              >
              error
            </UIButton>

            <UIButton
              :options="{
                loading: true,
              }"
              >
              loading
            </UIButton>

            <UIButton
              view="two"
              :options="{
                skeleton: true,
              }"
              >
              skeleton
            </UIButton>

            <UIButton
              :options="{
                to: 'https://vuejs.org/guide/typescript/composition-api.html',
                target: '_blank'
              }"
              >
              link
            </UIButton>

          </div>
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIModal -->
        <template #trigger>
          <span class="fz-20 fw600">Modal</span>
        </template>
        <template #content>
          <UIButton @clickBtn="showModal = true">showModal</UIButton>
          <UIModal
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
          </UIModal>
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIInput -->
        <template #trigger>
          <span class="fz-20 fw600">Input</span>
        </template>
        <template #content>
          <div class="d-flex fd-c r-gap-15">
            <UIInput
              :options="{
                label: 'simple',
                placeholder: 'placeholder',
              }"
              @updateValue="(val) => form.name = val"
              @keyAction="(event) => event.key == 'G' && $log('check G')"
              >
              <template #prefix>prefix</template>
              <template #suffix>prefix</template>
            </UIInput>
            <UIInput
              :options="{
                label: 'simple done',
                done: true,
              }"
              @updateValue="(val) => form.name = val"
            />
            <UIInput
              :options="{
                label: 'simple error',
                error: true,
                errorMessage: 'error message'
              }"
              @updateValue="(val) => form.name = val"
            />
            <UIInput
              :options="{
                label: 'reset value',
              }"
              @updateValue="(val) => form.reset = val"
              @reset="() => form.reset = ''"
            />
            <UIInput
              :options="{
                label: 'password',
                type: 'password',
              }"
              @updateValue="(val) => form.password = val"
            />
            <UIInput
              :options="{
                label: 'phone',
                inputmode: 'tel', // numeric - с маской || tel - без маски
                replaceValue: (/[^+\d]|(\+)(?=.*\+)/g) // без маски - (/[^+\d]|(\+)(?=.*\+)/g)
              }"
              @updateValue="(val) => form.phone = val"
            />
            <UIInput
              :options="{
                label: 'disabled',
                disabled: true,
              }"
              @updateValue="(val) => form.name = val"
            />
          </div>
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UITextarea -->
        <template #trigger>
          <span class="fz-20 fw600">Textarea</span>
        </template>
        <template #content>
          <UITextarea
            :options="{
              label: 'textarea',
              placeholder: 'placeholder',
              maxlength: 20,
            }"
            @updateValue="(val) => textarea = val"
          />
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UIUpload -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UIUpload</span>
          <UIButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="upload.toggle = !upload.toggle"
            >
            toggle data
          </UIButton>
        </template>
        <template #content>
          <pre v-if="upload.toggle">
            multiple - {{ upload.multiple }}
            images - {{ upload.images }}
            basic - {{ upload.basic }}
          </pre>

          <div class="d-flex fd-c r-gap-15">
            <UIUpload
              :options="{
                multiple: true,
                label: 'multiple',
                multipleLimit: 3,
              }"
              @updateValue="(val: File[]) => upload.multiple = val"
            />
            <UIUpload
              :options="{
                multiple: true,
                error: false,
                multipleLimit: 3,
                format: '.png, .jpg, .webp',
                label: 'image upload'
              }"
              @updateValue="(val: File[]) => upload.images = val"
            />
            <UIUpload
              :options="{
                error: false,
                label: 'basic'
              }"
              @updateValue="(val: string) => upload.basic= val"
            />
          </div>
        </template>
      </UIAccordionItem>

      <UIAccordionItem> <!-- UICheckbox -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">Checkbox</span>
          <UIButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="checkbox.toggle = !checkbox.toggle"
            >
            toggle data
          </UIButton>
        </template>
        <template #content>
          <pre v-if="checkbox.toggle">
            basic - {{ checkbox.basic }}
            multiple - {{ checkbox.multiple }}
            color - {{ checkbox.color }}
          </pre>

          <div class="d-flex fd-c r-gap-15">
            <UICheckbox
              :options="{
                label: 'лейбл чекбокс',
                elName: 'Обычный чекбокс',
                checked: true,
              }"
              @updateValue="(val: boolean) => checkbox.basic = val"
            />

            <UICheckbox
              :data="checkbox.data"
              :options="{
                elName: 'Выделить все',
                checkboxGroup: true,
                checkedList: checkbox.checkedList,
                disabledList: checkbox.disabledList,
              }"
              @updateValue="(val: UICheckboxData[]) => checkbox.multiple = val"
            />

            <UICheckbox
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
      </UIAccordionItem>

      <UIAccordionItem> <!-- UISelect -->
        <template #trigger="{ visibleAI }">
          <span class="fz-20 fw600">UISelect</span>
          <UIButton
            :class="[
              {'opacity-0 pointer-none': !visibleAI}
            ]"
            @clickBtn.stop="select.toggle = !select.toggle"
            >
            toggle data
          </UIButton>
        </template>
        <template #content>
          <pre v-if="select.toggle">
            basic - {{ select.basic }}
            images - {{ select.images }}
            multiple - {{ select.multiple }}
          </pre>

          <div class="d-flex fd-c r-gap-15">
            <UISelect
              :data="select.data"
              :options="{
                label: 'Basic',
                placeholder: 'Выбрать...',
                customRequired: true,
              }"
              @updateValue="(val: UISelectData) => select.basic = val"
            />
            <UISelect
              :data="select.data"
              :options="{
                placeholder: 'Выбрать картинку...',
                checkedList: select.checkedList[0],
                disabledList: select.checkedList,
              }"
              @updateValue="(val: UISelectData) => select.images = val"
            />
            <UISelect
              :data="select.data"
              :options="{
                multiple: true,
                checkedList: select.checkedList,
                disabledList: select.disabledList
              }"
              @updateValue="(val: UISelectData[]) => select.multiple = val"
            />
          </div>
        </template>
      </UIAccordionItem>

    </UIAccordion>
  </div>

  <div class="over-x mt-30 mb-30">
    <UICrawLine :data="crawLine" />
  </div>

</template>

<script setup lang="ts">

  const { $throw } = useNuxtApp()
  const { width, height, scrollY, scrollToggle, statusBreakpoint } = useResponsive()

  //---UIRadio
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

  //---UIRange
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
    multiple: [] as UICheckboxData[],
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

    basic: {} as UISelectData,
    images: {} as UISelectData,
    multiple: [] as UISelectData[],

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
  :deep() .UIAccordionItem {
    .__trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
