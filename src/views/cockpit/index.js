import moduleRouters from './router'
import modulesStores from './store'
// eslint-disable-next-line no-unused-vars
export default (Vue, store, router) => {
  router.addRoute(moduleRouters())
  store.registerModule('cockpit', modulesStores())
}
