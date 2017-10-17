import index from '../containers/Index'
import topic from '../containers/Topic'
import test from '../containers/Test'

const routes = [
    {
        path: '/',
        exact: true,
        component: index
    },
    {
        path: '/topic',
        exact: false,
        component: topic
    },
    {
        path: '/test',
        exact: false,
        component: test
    }
];


export default routes;