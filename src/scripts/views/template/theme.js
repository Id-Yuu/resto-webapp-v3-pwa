/* eslint-disable max-len */
import CONFIG from '../../global/config';
import ReviewProduct from '../../utils/reviewProduct';

const createProductDetail = (restaurant) => `
<div class="product-img">
    <img alt="${restaurant.name}" src="${CONFIG.BASE_IMAGE_URL_LARGE + restaurant.pictureId}"/>
</div>
<ul class="product-info">
    <li><b>Name</b><span>${restaurant.name}</span></li>
    <li><b>Address</b><span>${restaurant.address}</span>, <span>${restaurant.city}</span></li>
    <li><b>Rate</b><span>${restaurant.rating}</span></li>
    <li><b>Description</b><span>${restaurant.description}</span></li>
</ul>
<div class="product-categories">
    ${restaurant.categories.map((category) => `<p class="category-name">${category.name}</p>`).join('')}
</div>
<div class="product-menu">    
    <h2>Menu Kafe</h2>
    <div class="product-menu-list">
        <div class="product-menu-item">
            <h3>Makanan</h3>
            <ul>
                ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
            </ul>
        </div>
        <div class="product-menu-item">
            <h3>Minuman</h3>
            <ul>
                ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
            </ul>
        </div>
    </div>
</div>
<div class="product-review">
    <h2 class="review-title">Reviews</h2>
    ${ReviewProduct.eachCustomersReview(restaurant)}
</div>
`;

const createComments = (customerReview) => `
    <div class="product-review-container">
        <div class="product-review__inner">
            <div class="product-review-header">
                <p class="product-review-name"><i class="far fa-user"></i> ${customerReview.name}</p>
                <p class="product-review-date">${customerReview.date}</p>
            </div>
            <div class="product-review-comment">
                <p>${customerReview.review}</p>
            </div>
        </div>
    </div>
`;
const createHomeDetail = (restaurant) => `
    <article class="post-item">
        <div class="post-thumbnail">
            <img class="post-item__thumbnail lazyload" loading="lazy" width="355" height="200" crossorigin="anonymous" alt="${restaurant.name}" data-src="${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}"/>
            <p class="post-city">${restaurant.city}</p>
        </div>
        <div class="post-item__content">
            <a href="#/detail/${restaurant.id}">
                <h2 class="post-item__title">${restaurant.name}</h2>
            </a>
            <p><i class="fas fa-star"></i> Rating: ${restaurant.rating}</p>
            <p class="post-item__description">${restaurant.description.slice(0, 150)}...</p>
        </div>
    </article>
`;

const createFavoriteBtn = () => `
    <button aria-label="like this menu" id="favoriteBtn">
        <i class="far fa-heart" aria-hidden="true"></i>
    </button>
`;

const createUnfavoriteBtn = () => `
    <button aria-label="unlike this menu" id="favoriteBtn">
        <i class="fas fa-heart" aria-hidden="true"></i>
    </button>
`;

const createFormComments = () => `
    <form id="formReview">
        <h2>Tulis Review Kamu :</h2>
        <div class="form-field">
            <label for="setNama">Nama</label>
            <input id="setNama" name="setNama" type="text" placeholder="Your Name...">
        </div>
        <div class="form-field">
            <label for="setReview">Review</label>
            <textarea id="setReview" name="setReview" type="text" rows="4" cols="50" placeholder="Tambahkan Review"></textarea>
        </div>
        <div class="form-field">
            <button id="submitReview" type="submit">Kirim Review</button>
        </div>
    </form>
`;

export {
  createProductDetail,
  createHomeDetail,
  createFavoriteBtn,
  createUnfavoriteBtn,
  createComments,
  createFormComments,
};
