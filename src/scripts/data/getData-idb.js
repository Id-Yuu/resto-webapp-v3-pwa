import {openDB} from 'idb';
import CONFIG from '../global/config';

const databaseName = CONFIG.DATABASE_NAME;
const databaseVersion = CONFIG.DATABASE_VERSION;
const objectStoreName = CONFIG.OBJECT_STORE_NAME;

const db = openDB(databaseName, databaseVersion, {
  upgrade(database) {
    database.createObjectStore(objectStoreName, {
      keyPath: 'id',
    });
  },
});

const FavoriteProduct = {
  async getProduct(id) {
    if (!id) {
      return;
    }
    return (await db).get(objectStoreName, id);
  },
  async getAllProducts() {
    return (await db).getAll(objectStoreName);
  },
  async putProduct(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
    return (await db).put(objectStoreName, restaurant);
  },
  async deleteProduct(id) {
    return (await db).delete(objectStoreName, id);
  },
};

export default FavoriteProduct;

