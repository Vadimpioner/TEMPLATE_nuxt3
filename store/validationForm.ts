export const validationFormStore = defineStore('validationForm', () => {

  const formList = reactive<Record<string, {
    initialData: Partial<_globalFormData>,
    currentData: Partial<_globalFormData>
  }>>({})

  const addKeyWithData = (
    ID: string,
    data: Partial<_globalFormData>,
    dataInitial: Partial<_globalFormData>,
    status?: 'reset'
    ) => {
    formList[ID] = {
      initialData: JSON.parse(JSON.stringify(formList[ID]?.initialData ?? dataInitial)),
      currentData: status == 'reset' ? formList[ID]?.initialData : data
    }
  }

  return {
    formList,
    addKeyWithData,
  }

})
