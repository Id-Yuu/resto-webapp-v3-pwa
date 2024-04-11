/* eslint-disable max-len */
/* eslint-disable no-alert */
import ProductDb from '../data/product-idb';
import UrlParser from '../routes/url-parser';
import {createFormComments, createComments} from '../views/template/theme';

const CustomerReviewInitiator = {
  init({customerReviewContainer, customerReviewFormContainer}) {
    this.customerReviewContainer = customerReviewContainer;
    this.customerReviewFormContainer = customerReviewFormContainer;
    this.renderForm();
  },
  renderForm() {
    this.customerReviewFormContainer.innerHTML = createFormComments();
    this.isFormSubmitted();
  },
  isFormSubmitted() {
    const reviewFormElement = document.querySelector('#formReview');

    reviewFormElement.addEventListener('submit', (e) => {
      e.preventDefault();

      const url = UrlParser.parseActiveUrlWithoutCombiner();
      const inputName = document.querySelector('#setNama');
      const inputReview = document.querySelector('#setReview');
      const data = {
        id: url.id,
        name: inputName.value,
        review: inputReview.value,
      };
      this.makeRequest(data);
    });
  },

  async makeRequest(data) {
    const name = document.querySelector('#setNama').value;
    const review = document.querySelector('#setReview').value;
    const responseJSON = ProductDb.p_addReview({...data, name, review});

    responseJSON.then(({error, message}) => {
      if (!error) {
        const date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
        this.customerReviewContainer.innerHTML += createComments({
          id: data.id,
          name,
          review,
          date,
        });
        document.querySelector('#setNama').value = '';
        document.querySelector('#setReview').value = '';

        confirm('Successfully submitted review');
      } else {
        alert(`Failed to submit review: ${message}`);
      }
    });
  },
};
export default CustomerReviewInitiator;
