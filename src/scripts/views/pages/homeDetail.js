import ProductDb from '../../data/product-idb';
import {createHomeDetail} from '../template/theme';

const HomeDetail = {
  async render() {
    return `
      <h1 class="kafe__label">Kafe List</h1>
      <div id="restaurants"></div>
    `;
  },
  async afterRender() {
    try {
      const restaurantContainer = document.querySelector('#restaurants');
      restaurantContainer.classList.add('skeleton');
      // add skeleton loading
      restaurantContainer.innerHTML = `
        <div class="skeleton"></div>
        <div class="skeleton"></div>
        <div class="skeleton"></div>
      `;
      // Get all restaurant
      const list = await ProductDb.p_list();
      setTimeout(() => {
        const restaurantList = Object.values(list.restaurants);
        restaurantContainer.innerHTML = restaurantList.length ?
        restaurantList.map(createHomeDetail).join('') :
        '<p>No Data.</p>';
      }, 1000);
      restaurantContainer.classList.remove('skeleton');
    } catch (error) {
      const restaurantContainer = document.querySelector('#restaurants');
      restaurantContainer.innerHTML = '<p>Failed to load restaurant data.</p>';
    }
  },
};

export default HomeDetail;
