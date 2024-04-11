import HomeDetail from '../views/pages/homeDetail';
import ProductFav from '../views/pages/productFav';
import ProductDetail from '../views/pages/productDetail';

const routes = {
  '/': HomeDetail,
  '/home': HomeDetail,
  '/favorite': ProductFav,
  '/detail/:id': ProductDetail,
};

export default routes;
