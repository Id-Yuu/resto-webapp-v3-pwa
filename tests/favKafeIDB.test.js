import {itActsAsfavKafeModel} from './contract/favoriteKafeContract';
import FavoriteProduct from '../src/scripts/data/getData-idb';

describe('Favorite Kafe Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteProduct.getAllProducts()).forEach(async (restaurant) => {
      await FavoriteProduct.deleteProduct(restaurant.id);
    });
  });

  itActsAsfavKafeModel(FavoriteProduct);
});
