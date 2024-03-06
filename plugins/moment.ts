import moment from 'moment';

export default defineNuxtPlugin(() => {
  moment.locale('ru')
  return {
    provide: {
      moment: moment
    }
  }
})
