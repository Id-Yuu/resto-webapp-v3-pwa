/* eslint-disable require-jsdoc */
import API_ENDPOINT from '../global/api-endpoint';

class ProductDb {
  static async p_list() {
    const res = await fetch(API_ENDPOINT.PRODUCT_LIST);
    return res.json();
  }

  static async p_detail(id) {
    // eslint-disable-next-line new-cap
    const res = await fetch(API_ENDPOINT.PRODUCT_DETAIL(id));
    return res.json();
  }

  static async p_addReview(data) {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
    const res = await fetch(API_ENDPOINT.PRODUCT_REVIEW, options);
    return res.json();
  }
}

export default ProductDb;

