import { BehaviorSubject } from 'rxjs'

let combination = {
  components: {},
  notificationSubjects: {},
  registerSubject: new BehaviorSubject(null),
  // eslint-disable-next-line no-undef
  observableList: new Set(),
  subjects: {
    deps: {},
    targets: {},
    targetsProxy: {},
    targetsPropxyQueue: {},
  },
  enhanceContext: {},
  extends: {},
  $initTargetProxy(baseSymbol) {
    if (!this.subjects.targetsProxy[baseSymbol]) {
      this.subjects.targetsProxy[baseSymbol] = new BehaviorSubject(null)
      this.subjects.targetsPropxyQueue[baseSymbol] = []
    }
  },
  $setSubject(baseSymbol, store) {
    if (!this.subjects.targets[baseSymbol]) {
      this.subjects.targets[baseSymbol] = []
    }
    this.$initTargetProxy(baseSymbol)
    this.subjects.targets[baseSymbol].push(store)
    this.subjects.targetsPropxyQueue[baseSymbol].push(store)
    this.subjects.targetsProxy[baseSymbol].next(
      this.subjects.targetsPropxyQueue[baseSymbol]
    )
  },
  $isObservable(baseSymbol) {
    return this.observableList.has(baseSymbol)
  },
  $metaHandle(meta) {
    return [meta]
  },
  $getCollection() {
    return this.components
  },
  $remove(symbol, baseSymbol) {
    if (this.notificationSubjects[baseSymbol]) {
      this.notificationSubjects[baseSymbol].next(null)
    }
    const rawLenth = this.components[baseSymbol]
    this.components[baseSymbol] = this.components[baseSymbol].filter(
      (component) => {
        return component.instance.symbol !== symbol
      }
    )
    if (this.components[baseSymbol].length > rawLenth) {
      throw new Error(`${baseSymbol} 组件卸载异常`)
    }
    const rawTargetsLenth = this.subjects.targets[baseSymbol]
    this.subjects.targets[baseSymbol] = this.subjects.targets[
      baseSymbol
    ].filter((target) => {
      return target.symbol !== symbol
    })
    if (this.subjects.targets[baseSymbol].length > rawTargetsLenth) {
      throw new Error(`${baseSymbol} 组件监听器卸载异常`)
    }
    const rawTargetsQueueLenth = this.subjects.targetsPropxyQueue[baseSymbol]
    this.subjects.targetsPropxyQueue[baseSymbol] =
      this.subjects.targetsPropxyQueue[baseSymbol].filter((target) => {
        return target.symbol !== symbol
      })
    if (
      this.subjects.targetsPropxyQueue[baseSymbol].length > rawTargetsQueueLenth
    ) {
      throw new Error(`${baseSymbol} 组件监听器卸载异常`)
    }
  },
  $createNotificationSubject({ exports }, baseSymbol) {
    if (exports) {
      const notificationSubject = new BehaviorSubject(null)
      if (!this.notificationSubjects[baseSymbol]) {
        this.notificationSubjects[baseSymbol] = notificationSubject
      }
    }
    return this.notificationSubjects[baseSymbol]
  },
  $createSubjects({ subscriber }, baseSymbol) {
    if (subscriber) {
      if (!this.subjects.deps[baseSymbol]) {
        // eslint-disable-next-line no-undef
        this.subjects.deps[baseSymbol] = new Set()
      }
      Object.keys(subscriber).forEach((observeTagetKey) => {
        this.subjects.deps[baseSymbol].add(observeTagetKey)
        this.observableList.add(observeTagetKey)
        this.$initTargetProxy(observeTagetKey)
      })
    }
    return null
  },
  $register(baseSymbol, instance) {
    if (!this.components[baseSymbol]) {
      this.components[baseSymbol] = []
    }
    this.components[baseSymbol].push({
      instance,
    })
    this.registerSubject.next({
      baseSymbol,
      instance,
    })
  },
  $broadcast(componentStore, value, subjectKey) {
    value.targetMeta = {
      baseSymbol: componentStore.baseSymbol,
      props: componentStore.props,
    }
    componentStore.subjects[subjectKey].next(value)
  },
}
export function readState(name, handle) {
  if (!combination.components[name]) {
    throw new Error(
      `${name} 组件不存在或者未实例化, 如果是异步渲染, 请通过事件监听来读取 state, readState 只支持同步读取`
    )
  }
  if (handle) {
    return combination.components[name].map((component) => {
      return handle({
        state: component.instance.state,
        props: component.instance.props,
      })
    })
  } else {
    return combination.components[name].map((component) => {
      return {
        state: component.instance.state,
        props: component.instance.props,
      }
    })
  }
}
export function enhanceContext(key, value) {
  combination.enhanceContext[key] = value
}
export function extendsSubscribe(key, handler) {
  if (combination.extends[key]) {
    throw new Error(`ExtendsError: ${key} 已经被扩展了, 不能再次扩展`)
  }
  combination.extends[key] = handler
}
if (window) {
  if (window.$$rdeco_combination) {
    combination = window.$$rdeco_combination
  } else {
    window.$$rdeco_combination = combination
  }
  window.$$rdecoLog = () => {
    return {
      logger: Object.freeze({ ...combination }),
    }
  }
}

export { combination }
