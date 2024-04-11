/* eslint-disable max-len */
import UrlParser from '../../routes/url-parser';
import ProductDb from '../../data/product-idb';
import {createProductDetail} from '../template/theme';
import ReviewInitiator from '../../utils/reviewInitiator';
import FavoriteButton from '../../utils/favoriteInitiator';

const ProductDetail = {
  async render() {
    return `
  <article class="content" id="content" tabindex="0">
    <div class="content__inner">
      <h1 class="content__label">Restaurant's Detail</h1>
      <div id="detail__kafe"></div>
      <div id="favoriteBtn"></div>
      <div id="reviewProduct"></div>
    </div>
  </article>  
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()s
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      // Detail Restaurant
      const {restaurant} = await ProductDb.p_detail(url.id);

      FavoriteButton.init({
        likeButtonContainer: document.querySelector('#favoriteBtn'),
        restaurant,
      });

      const kafe = document.querySelector('#detail__kafe');
      kafe.innerHTML = createProductDetail(restaurant);

      ReviewInitiator.init({
        customerReviewContainer: document.querySelector('.product-review-container'),
        customerReviewFormContainer: document.querySelector('#reviewProduct'),
      });
    } catch (error) {
      const kafe = document.querySelector('#detail__kafe');
      kafe.innerHTML = '<p>Failed to load restaurant data.</p>';
    }
  },
};

export default ProductDetail;
