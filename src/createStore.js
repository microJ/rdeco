/* eslint-disable no-undef */
import { combination } from './combination'
import { Store } from './Store'
import { forEachByKeys } from './utils/forEachByKeys'

export function createStore(storeConfig) {
  const store = new Store(storeConfig)
  if (store.subscribe) {
    if (!combination.subscribeIds[store.baseSymbol]) {
      combination.subscribeIds[store.baseSymbol] = {}
    }
    forEachByKeys(store.subscribe, (subjectKey) => {
      if (!combination.subscribeIds[store.baseSymbol][subjectKey]) {
        combination.subscribeIds[store.baseSymbol][subjectKey] = new Set()
      }
      store.subscribe[subjectKey].forEach((meta) => {
        const [target] = meta
        combination.subscribeIds[store.baseSymbol][subjectKey].add(target)
      })
    })
  }
  return store
}