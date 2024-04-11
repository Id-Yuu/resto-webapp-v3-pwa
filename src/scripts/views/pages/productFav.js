import FavoriteProduct from '../../data/getData-idb';
import {createHomeDetail} from '../../views/template/theme';

const ProductFav = {
  async render() {
    return `
        <div class="favorite-container" tabindex="0">
          <h2 class="favorite__label">Bookmarked</h2>
          <article id="favLists"></article>
        </div>
    `;
  },

  async afterRender() {
    const tryRenderFav = async () => {
      try {
        const restaurantContainer = document.querySelector('#favLists');
        // Get all bookmarked restaurant
        const fav = await FavoriteProduct.getAllProducts();
        if (fav.length === 0) {
          restaurantContainer.innerHTML = 'Failed to load bookmarked restaurant.';
        }
        fav.forEach((restaurant) => {
          restaurantContainer.innerHTML += createHomeDetail(restaurant);
        });
      } catch (error) {
        const restaurantContainer = document.querySelector('#favLists');
        restaurantContainer.innerHTML = '<p class="error">Failed to load bookmarked restaurant.</p>';
      }
    };
    tryRenderFav();
  },
};

export default ProductFav;
