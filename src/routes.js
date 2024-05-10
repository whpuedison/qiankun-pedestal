import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';

const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/about', component: About },
  { path: '/contact', component: Contact }
];

export default routes;