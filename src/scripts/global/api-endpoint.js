import CONFIG from './config';

const API_ENDPOINT = {
  PRODUCT_LIST: `${CONFIG.BASE_URL}list`,
  PRODUCT_DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  PRODUCT_REVIEW: `${CONFIG.BASE_URL}review`,
};
export default API_ENDPOINT;
