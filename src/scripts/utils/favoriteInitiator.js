/* eslint-disable max-len */
import FavoriteProduct from '../data/getData-idb';
import {createFavoriteBtn, createUnfavoriteBtn} from '../views/template/theme';

const FavoriteButton = {
  async init({likeButtonContainer, restaurant}) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const {id} = this._restaurant;

    const isFavorited = await this._isRestaurantExist(id);
    isFavorited ? this._renderLiked() : this._renderLike();
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteProduct.getProduct(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createFavoriteBtn();

    const likeButton = document.querySelector('#favoriteBtn');
    likeButton.addEventListener('click', async () => {
      await FavoriteProduct.putProduct(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnfavoriteBtn();

    const likeButton = document.querySelector('#favoriteBtn');
    likeButton.addEventListener('click', async () => {
      await FavoriteProduct.deleteProduct(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavoriteButton;
