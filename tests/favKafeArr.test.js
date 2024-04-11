import {itActsAsfavKafeModel} from './contract/favoriteKafeContract';

let FavoriteProduct = [];

const FavKafeArr = {
  getProduct(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return, , eqeqeq
    return FavoriteProduct.find((restaurant) => restaurant.id == id);
  },

  getAllProducts() {
    return FavoriteProduct;
  },

  putProduct(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar FavoriteProduct
    if (this.getProduct(restaurant.id)) {
      return;
    }

    FavoriteProduct.push(restaurant);
  },

  deleteProduct(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    FavoriteProduct = FavoriteProduct.filter((restaurant) => restaurant.id != id);
  },
};

describe('Favorite Movie Array Contract Test Implementation', () => {
  afterEach(() => {
    FavoriteProduct = [];
  });

  itActsAsfavKafeModel(FavKafeArr);
});
