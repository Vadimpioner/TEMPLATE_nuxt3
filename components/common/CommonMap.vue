<template>
  <div
    class="CommonMap"
    ref="CommonMap"
    >
    <GoogleMap
      :api-key="useRuntimeConfig().public.gmapKey"
      :center="{ lat: 50, lng: 80 }"
      :styles="mapStyle"
      :zoom="4"
      >
      <Marker
        v-for="(item, index) in data"
        :options="{
          position: { lat: Number(item.lat), lng: Number(item.lng) },
          icon: `/image/common/marker${active == index || props.options?.showAll ? 'Active' : ''}.svg`,
        }"
        @click="active == index && !props.options?.showAll ? (active = undefined, tooltipShow(true)) : (active = index, tooltipShow())"
        >
        <InfoWindow>
          <div class="d-flex fd-c">
            <span
              v-if="item.name"
              class="fz-16 fw700 black"
              v-html="item.name"
            />
            <span
              v-if="item.descr"
              class="fz-14 black"
              v-html="item.descr"
            />
          </div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
  </div>
</template>

<script setup lang="ts">

  import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'

  type Props = {
    data: CommonMapData[],
    options?: CommonMapOptions
  }
  const props = defineProps<Props>()

  const mapStyle = ref([
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers":
      [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers":
      [
        {
          "visibility": "on"
        },
        {
          "color": "#3e606f"
        },
        {
          "weight": 2
        },
        {
          "gamma": 0.84
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers":
      [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers":
      [
        {
          "weight": 0.6
        },
        {
          "color": "#1a3541"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text",
      "stylers":
      [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "labels.text",
      "stylers":
      [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text",
      "stylers":
      [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text",
      "stylers":
      [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text",
      "stylers":
      [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers":
      [
        {
          "color": "#2c5a71"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "labels.text",
      "stylers":
      [
        {
            "visibility": "off"
        }
      ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c5a71"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#29768a"
            },
            {
                "lightness": -37
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#193341"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
  ])

  const active = ref<number | undefined>(undefined)

  const CommonMap = ref()

  const tooltipShow = (hiddenAll?: boolean) => {
    if(props.options?.showAll) return
    nextTick(() => {
      let elemList = [...document.querySelectorAll<HTMLElement>('.gm-style-iw-t')]
      if(hiddenAll) {
        return elemList.forEach((item) => {
          item.style.opacity = '0'
          item.style.transition = 'opacity .3s'
        })
      }

      if(elemList.length) {

        elemList.forEach((item) => {
          item.style.opacity = '0'
          item.style.transition = 'opacity .3s'
        })

        elemList[elemList.length - 1].style.opacity = '1'
        let close = [...document.querySelectorAll('.gm-ui-hover-effect')]

        close.forEach((item) => {
          item.addEventListener('click', () => {
            elemList[elemList.length - 1].style.opacity = '0'
            elemList[elemList.length - 1].classList.remove('gm-ui-hover-effect')
          })
        })

      }
    })
  }

  onMounted(() => {
    if(props.options?.showAll) {
      setTimeout(() => {
        [...CommonMap.value.querySelectorAll('[role="button"]')].forEach((item) => item instanceof HTMLElement && item.click())
      }, 500)
    }
  })
</script>

<style scoped lang="scss">
  .CommonMap :deep() {
    .mapdiv {
      height: 500px;
      .gm-style-cc, .gmnoprint, .gm-fullscreen-control, img[alt=Google] {
        display: none;
      }
      .gm-style-iw.gm-style-iw-c {
        padding: 8px 16px !important;
        max-width: 310px !important;
        button {
          display: none !important;
        }
        .gm-style-iw-d {
          overflow: initial !important;
        }
      }
    }
  }
</style>
