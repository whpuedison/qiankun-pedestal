
import { lazy } from'react';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';

const VirtualList = lazy(() => import('./pages/virtual-list'));
const VirtualListPro = lazy(() => import('./pages/virtual-list-pro'));
const ConcurrentRequest = lazy(() => import('./pages/concurrent-request'));
const LazyLoad = lazy(() => import('./pages/lazy-load'));
const BatchProcess = lazy(() => import('./pages/batch-process'));
const PerformanceMonitor = lazy(() => import('./pages/performance-monitor'));
const AutoDeploy = lazy(() => import('./pages/auto-deploy'));

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/virtual-list', component: VirtualList },
  { path: '/virtual-list-pro', component: VirtualListPro },
  { path: '/concurrent-request', component: ConcurrentRequest },
  { path: '/lazy-load', component: LazyLoad },
  { path: '/batch-process', component: BatchProcess },
  { path: '/performance-monitor', component: PerformanceMonitor },
  { path: '/auto-deploy', component: AutoDeploy },
];

export default routes;
