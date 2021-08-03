// menu模块菜单配置
export default () => ({
  path: '/cockpit',
  name: 'cockpit',
  component: () => import('comps/Layout/index.vue'),
  redirect: '/cockpit/operation',
  meta: {
    name: '高管驾驶舱',
  },
  children: [
    {
      path: '/cockpit/operation',
      name: 'operation',
      component: () => import('./views/children/overallOperation/index.vue'),
      meta: {
        name: '整体经营情况',
      },
    },
    {
      path: '/cockpit/investment',
      name: 'investment',
      component: () => import('./views/children/investment/index.vue'),
      meta: {
        name: '投资业务',
      },
    },
  ],
})
