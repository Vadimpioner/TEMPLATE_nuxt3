<template>
  <div
    :class="[
      'CommonUpload d-flex fd-c',
      {'active r-gap-15': fileMultiple.length || fileName}
    ]"
    >

    <CommonTransitionY>
      <TransitionGroup
        v-if="fileMultiple.length"
        name="delete"
        tag="ul"
        class="__multiple d-flex gap-15 over-hidden over-x-auto pb-3"
        >
        <li
          v-for="(item, index) in fileMultiple"
          class="__item d-flex aic wmc"
          :key="index"
          >
          <div class="_content d-flex aic c-gap-8 w100">
            <span
              class="nowrap over-hidden transition-color"
              v-html="item.name"
            />
            <NuxtIcon
              filled
              class="opacity c-p"
              name="close"
              @click.stop="fileMultiple.splice(index, 1)"
            />
          </div>
        </li>
      </TransitionGroup>
    </CommonTransitionY>

    <div
      :class="[
        `${fileName ? '__item' : '__trigger'} d-flex aic c-gap-8 c-p wmc`,
        {'disabled pointer-none': fileMultiple.length >= Number(options?.multipleLimit)},
        {'error': options?.error}
      ]"
      @click="refUploadInput?.click()"
      >

      <div class="_content d-flex aic c-gap-8 w100">
        <NuxtIcon
          v-if="!fileName"
          filled
          name="upload"
          class="transition-color"
        />
        <span
          class="nowrap over-hidden transition-color"
          v-html="fileName || (options?.label ?? 'Upload file')"
        />
        <NuxtIcon
          v-if="myFile"
          filled
          class="opacity c-p"
          name="close"
          @click.stop="
            fileName = '',
            myFile = undefined,
            emits('updateValue', myFile)
          "
        />
      </div>

      <Transition name="fade" mode="out-in">
        <small
          v-if="fileMultiple.length == options?.multipleLimit"
          class="red nowrap"
          v-html="`limit: ${options.multipleLimit}`"
        />
      </Transition>

      <input
        ref="refUploadInput"
        class="d-none"
        type="file"
        :multiple="options?.multiple"
        :accept="options?.format ?? '.pdf, .doc, .docx, .png, .jpg'"
        @input="uploadFile()"
      />

    </div>

  </div>
</template>

<script setup lang="ts">

  type Props = {
    options?: CommonUploadOptions
  }
  const props = defineProps<Props>()
  const emits = defineEmits<{
    <T extends File[] | File | undefined>(name: 'updateValue', val: T): void
  }>()

  const { $listen } = useNuxtApp()

  const myFile = ref<File>()
  const fileMultiple = ref<File[]>([])
  const fileName = ref('')
  const refUploadInput = ref<HTMLInputElement>()

  const uploadFile = async () => {

    let readerForFile = new FileReader()
    let files = refUploadInput.value?.files as FileList

    if(props.options?.multiple) {
      let filesToProcess = props.options?.multipleLimit ? [...files].slice(0, Number(props.options?.multipleLimit) - fileMultiple.value?.length) : [...files]

      await Promise.all(filesToProcess.map(file => fileMultiple.value.push(file)))
      emits('updateValue', fileMultiple.value)
    } else {
      myFile.value = files[0]
      fileName.value = files[0].name

      emits('updateValue', myFile.value)
      readerForFile.onload = (event) => myFile.value = event.target?.result as any
      readerForFile.readAsDataURL(myFile.value)
    }
  }

  watch(() => `${fileMultiple.value.length}${myFile.value}`,
    () => refUploadInput.value && (refUploadInput.value.value = '')
  )

  $listen('reset', () => {
    myFile.value = undefined
    fileMultiple.value = []
    fileName.value = ''
    emits('updateValue', props.options?.multiple ? fileMultiple.value : myFile.value)
  })

</script>

<style scoped lang="scss">
  .CommonUpload {
    transition: row-gap .3s;
    &.active {}
    .__item {
      transition: padding-right .3s, background-color .3s;
      background-color: $blue;
      @include value_adaptive(height, 56, 40);
      @include value_adaptive((padding-right, padding-left), 24, 16);
      @include value_adaptive(max-width, 200, 150);
      ._content {
        span.nowrap {
          text-overflow: ellipsis;
        }

      }
    }
    .__multiple {}
    .__trigger {
      transition: padding .3s;
      &.disabled {
        div {
          opacity: .5;
        }
      }
      &.error {
        span {
          color: $red;
        }
        :deep() .nuxt-icon svg {
          fill: $red;
        }
      }
    }
    .nuxt-icon {
      @include value_adaptive((max-width, min-width, height), 24, 20);
    }
  }
</style>
