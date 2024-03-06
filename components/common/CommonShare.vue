<template>
  <div class="CommonShare">

    <template v-if="!isMobileOrTablet">
      <span v-html="'Поделиться в соцсетях:'" />
      <div class="__wrapper d-flex c-gap-8">
        <button
          v-for="item in socialList"
          class="opacity"
          @click.prevent="shareDesktop(item.href)"
          >
          <SvgIcon :name="item.icon" />
        </button>
      </div>
    </template>

    <CommonButton
      v-else
      :options="{
        fullSM: true
      }"
      @click="shareMobile()"
      >
      Поделиться
    </CommonButton>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    param: CommonShare
  }
  const props = defineProps<Props>()

  const { isMobileOrTablet } = useDevice()

  const URL = ref('')

  const socialList = ref([
    {
      href: `https://vk.com/share.php?url=${URL.value}&title=${props.param.title}&image=${props.param.image}`,
      icon: 'close',
    },
    {
      href: `https://twitter.com/intent/tweet?url=${URL.value}&text=${props.param.title}`,
      icon: 'close',
    },
    {
      href: `http://www.facebook.com/sharer/sharer.php?u=${URL.value}`,
      icon: 'close',
    },
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${URL.value}`,
      icon: 'close'
    },
  ])

  const shareDesktop = (href: string) => {
    let featuresWindow = {
      scrollbars: 1,
      resizable: 1,
      menubar: 0,
      toolbar: 0,
      status: 0,
      width: 655,
      height: 420,
      left: (screen.width - (655)) / 2,
      top: (screen.height - (420)) / 2,
    }

    window.open(href, '', Object.entries(featuresWindow).map(([key, value]) => `${key}=${value}`).join(','))
  }

  const shareMobile = () => {
    if(navigator.share) {
      try {
        navigator.share({
          url: URL.value
        })
      } catch(error) {
        console.error(`ERRORcommonShare ${error}`)
      }
    } else {
      ElMessage({
        showClose: true,
        message: 'Не работает!',
        type: 'error'
      })
    }
  }

  onMounted(() => {
    URL.value = window.location.href
  })

</script>

<style scoped lang="scss">
  .CommonShare {
    .__wrapper {
      button {
        .svgIcon {
          @include value_adaptive((width, height), 24, 22);
        }
      }
    }
  }
</style>
