// webpack 打包组件的特殊性，路径必须hardcode，目前无任何解决办法
// https://webpack.js.org/api/module-methods/#import-
// Fully dynamic statements, such as import(foo), will fail because webpack requires at least some file location information.
// require.ensure() is specific to webpack and superseded by import().

// webpackMode: lazy, eager, weak
// webpackChunkName：分割的thunk代码存放路径名称

import AsyncComponent from '../components/AsyncComponent';

const routes = [
    {
        path: '/',
        exact: true,
        component: (props) => AsyncComponent(props, () => import(
            /* webpackChunkName: "__spaBuildDir__/index" */
            /* webpackMode: "lazy" */
            '../containers/index'))
    },
    {
        path: '/topic',
        exact: false,
        component: (props) => AsyncComponent(props, () => import(
            /* webpackChunkName: "__spaBuildDir__/topic" */
            /* webpackMode: "lazy" */
            '../containers/topic'))
    },
    {
        path: '/test',
        exact: false,
        component: (props) => AsyncComponent(props, () => import(
            /* webpackChunkName: "__spaBuildDir__/test" */
            /* webpackMode: "lazy" */
            '../containers/test'))
    }
];

export default routes;
