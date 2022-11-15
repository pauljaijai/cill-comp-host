import { defineStore } from 'pinia';

interface State {
  data: string;
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    data: 'codfish'
  })
})