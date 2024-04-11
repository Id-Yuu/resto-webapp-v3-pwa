/* eslint-disable max-len */
import {createComments} from '../views/template/theme';

const ReviewProduct = {
  eachCustomersReview({customerReviews}) {
    let commentsPeople = '';
    customerReviews.forEach((customerReview) => {
      commentsPeople += createComments(customerReview);
    });
    return commentsPeople;
  },
};
export default ReviewProduct;
