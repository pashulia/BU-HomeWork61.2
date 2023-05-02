import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import BlockPage from '@/pages/BlockPage';
import Main from '@/pages/Main';
import TxPage from '@/pages/TxPage';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Main
    },
    {
        path: '/block/:blockNumberOrHash',
        name: 'blockPage',
        component: BlockPage
    },
    {
        path: '/block/tx/:transactionHash',
        name: 'txPage',
        component: TxPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;
