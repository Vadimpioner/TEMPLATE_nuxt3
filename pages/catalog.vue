<template>
  <SectionCatalog
    :data="{
      aside: asideFilters,
      sort: [
        {
          val: 'Популярные',
          key: 'popular',
        },
        {
          val: 'Новые',
          key: 'new',
        },
      ]
    }"
  />
  <section
    v-for="(item, index) in section"
    :style="[
      'height: 100vh',
      {'background-color': item}
    ]"
    :data-section="item"
    :key="index"
  />
  <section
    :style="[
      'height: 200vh',
      {'background-color': 'white'}
    ]"
  />
</template>

<script setup lang="ts">

  //---AsideFilters
  const asideFilters = reactive<AsideFiltersData[]>([
    {
      componentName: 'CommonCheckbox',
      elName: 'Согласен с условиями',
      key: 'agree',
      checked: false,
    },
    {
      componentName: 'CommonCheckbox',
      elName: 'Новые условия',
      key: 'newAgree',
      checked: true,
    },
    {
      componentName: 'CommonRange',
      toggleDeactivate: false,
      toggleVisible: true,
      toggleVisibleStatus: false,
      data: [
        {
          key: 'price',
          val: 'Цена',
          min: '10.00',
          max: '995.15',
        },
        {
          key: 'priceSale',
          val: 'Скидочная цена',
          min: '20.92',
          max: '215.21',
        },
      ]
    },
    {
      componentName: 'CommonCheckbox',
      label: 'Цвета',
      key: 'colors',
      trimTo: 5,
      view: 'color',
      selectedCounter: true,
      checkboxGroup: true,
      toggleDeactivate: false,
      toggleVisible: true,
      toggleVisibleStatus: false,
      data: [
        {
          val: 'один',
          key: '#DC6872',
          count: 5
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
          count: '21'
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
      ],
      disabledList: [
        {
          val: 'восемь',
          key: '#5D5FEF'
        }
      ]
    },
    {
      componentName: 'CommonRange',
      label: 'Размеры, см',
      key: 'sizes',
      toggleDeactivate: false,
      toggleVisible: true,
      toggleVisibleStatus: false,
      data: [
        {
          key: 'width',
          val: 'Ширина, см',
          min: '40.21',
          max: '187.29',
        },
        {
          key: 'height',
          val: 'Ширина, см',
          min: '20.33',
          max: '201.14',
        },
      ]
    },
    {
      componentName: 'CommonCheckbox',
      label: 'Цифры',
      key: 'numbers',
      trimTo: 1,
      view: 'simple',
      selectedCounter: true,
      checkboxGroup: true,
      toggleDeactivate: false,
      toggleVisible: true,
      toggleVisibleStatus: false,
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
          count: '22'
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
        },
        {
          val: 'девять',
          key: '#8D5FEF'
        },
      ],
      checkedList: [
        {
          val: 'пять',
          key: '#2036FF',
        },
        {
          val: 'восемь',
          key: '#5D5FEF',
        },
      ],
      disabledList: [
        {
          val: 'три',
          key: '#68DCD5'
        }
      ]
    },
  ])

  const section = ref([
    'yellow',
    'green',
    'blue',
    'yellow',
    'blue',
  ]);

</script>
