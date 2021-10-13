/* eslint-disable valid-jsdoc */
/* eslint-disable react/display-name */
// @filename: Store.js
import { bindContext } from './bind-context'
import { combination } from './combination'
import { getReducerType } from './utils/get-reducer-model'
import createName from './utils/create-name'
import { storeConfigValidate } from './utils/store-config-validate'

export class Store {
  constructor(storeConfig) {
    if (!storeConfig.name && typeof storeConfig.name !== 'string') {
      throw new Error(`组件必须声明 name 字段, 不可以为空`)
    }
    const { viewKeys, ctrlKeys, serviceKeys } = storeConfigValidate(storeConfig)
    this.state = { ...storeConfig.state }
    if (storeConfig.derived) {
      this.derived = {}
      const propsObj = {}
      const derivedKeys = Object.keys(storeConfig.derived)
      derivedKeys.forEach((derivedKey) => {
        propsObj[derivedKey] = {
          get: () => {
            return storeConfig.derived[derivedKey].call(this)
          },
        }
      })
      Object.defineProperties(this.derived, propsObj)
    }
    this.name = createName(storeConfig)
    this.style = { ...storeConfig.style }
    this.setter = {}
    this.props = {}
    this.combination = combination
    const baseContext = {
      name: this.name,
      state: this.state,
      derived: this.derived,
      style: this.style,
      props: this.props,
      entites: combination.entites,
    }
    /** create this.rc
     * rc 只支持对 2 级 Key 做 State 快捷操作,
     * 从设计角度讲, 2 层 state 结构足够满足大多数复杂的场景,
     * 因此不提供嵌套 set, 避免开发者对状态设计产生工具便利性的依赖
     */
    const stateKeys = Object.keys(this.state)
    stateKeys.forEach((stateKey) => {
      const type = getReducerType(stateKey)
      this.setter[stateKey] = (payload) => {
        this.dispatch([type, payload, stateKey, this.name])
        return payload
      }
    })
    this.private = {
      controllerContext: { ...baseContext },
      viewContext: { ...baseContext },
      serviceContext: { ...baseContext },
    }
    const instance = this
    const { view, controller, service } = storeConfig
    const viewBindContext = bindContext(
      viewKeys,
      view,
      this.private.viewContext,
      instance,
      'view'
    )
    const ctrlBindContext = bindContext(
      ctrlKeys,
      controller,
      this.private.controllerContext,
      instance,
      'controller'
    )
    const serviceBindContext = bindContext(
      serviceKeys,
      service,
      this.private.serviceContext,
      instance,
      'service'
    )
    this.private.serviceContext.service = serviceBindContext
    this.private.serviceContext.setter = this.setter
    this.private.controllerContext.service = serviceBindContext
    this.private.controllerContext.setter = this.setter
    this.private.viewContext.controller = ctrlBindContext
    this.private.viewContext.view = viewBindContext
    this.view = viewBindContext
    this.controller = ctrlBindContext
    this.service = serviceBindContext
  }
  dispatch() {
    throw new Error('dispatch 没有被正确初始化, 请检查 hook 初始化部分的代码')
  }
  dispose() {
    combination.$remove(this.name)
  }
  update(state, dispatch, props, ref) {
    for (const contextName in this.private) {
      if (Object.hasOwnProperty.call(this.private, contextName)) {
        this.private[contextName]['state'] = state
        this.private[contextName]['props'] = props
        this.private[contextName]['ref'] = ref
      }
    }
    this.dispatch = dispatch
    this.state = state
    this.ref = ref
    this.props = props
  }
}
