import React from 'react'
import ReactDOM from 'react-dom'
import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser'
import loggerPlugin from 'router5-plugin-logger'
import { notify, enhanceContext } from '../core'
import { createComponent } from '../react'
import { beforMiddleware } from './beforMiddleware'

function pathToName(path = '') {
  return path === '/'
    ? '/'
    : path
        .substring(1)
        .split('/')
        .reduce(
          (previousValue, currentValue) =>
            previousValue +
            currentValue.replace(currentValue[0], currentValue[0].toUpperCase())
        )
}

class App {
  constructor(config) {
    if (!config.Container) {
      throw new Error(
        'Container 未定义, config 内必须声明 Container 作为应用的容器组件'
      )
    }
    const routerConfig = Array.isArray(config?.router)
      ? config.router
      : config?.router?.router || [{ name: '/', path: '/' }]
    this.router = createRouter(routerConfig, { allowNotFound: true })

    const _oldNavigate = this.router.navigate.bind(this)
    this.router.navigate = (...args) => {
      const pathName = args[0]
      const routeName = this.router.matchPath(pathName)
        ? this.router.matchPath(pathName).name
        : pathToName(pathName)
      const lastArg = args[args.length - 1]
      const done = typeof lastArg === 'function' ? lastArg : () => {}
      const routeParams = typeof args[1] === 'object' ? args[1] : {}
      const options = typeof args[2] === 'object' ? args[2] : {}
      // UNKNOWN_ROUTE
      if (!this.router.buildState(routeName, routeParams)) {
        // add router
        this.router.add({
          name: routeName,
          path: pathName,
        })
        _oldNavigate(routeName, routeParams, options, done)
      } else {
        _oldNavigate(routeName, routeParams, options, done)
      }
    }

    const routerOptions =
      Object.prototype.toString.call(config?.router) === '[object Object]'
        ? Object.assign({}, { useHash: true }, config?.router?.browserPlugin)
        : { useHash: true }
    this.router.usePlugin(browserPlugin(routerOptions), loggerPlugin)
    this.router.useMiddleware(beforMiddleware)
    this.router.subscribe(({ route, previousRoute }) => {
      notify('@@router', 'after', { route, previousRoute })
    })
    enhanceContext('context', { router: this.router })
    this.Container = createComponent(config.Container)
  }

  start(path) {
    this.router.start(path || '/', (err, state) => {
      console.log(err, state)
    })
    const AppContainer = this.Container
    ReactDOM.render(<AppContainer />, document.getElementById('root'))
  }
}

export default App