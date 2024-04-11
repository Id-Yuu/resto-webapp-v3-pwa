/* eslint-disable new-cap */

Feature('Review Kafe');


Before(({I}) => {
  I.amOnPage('/'); // localhost:8080
});

Scenario('Review Kafe', async ({I}) => {
  I.seeElement('#restaurants');
  I.seeElement('.post-item');
  I.seeElement('.post-item__content a');
  const postItem = locate('.post-item__title').first();
  I.click(postItem);

  I.seeElement('#formReview');
  I.fillField('setNama', 'Name-Test2');
  I.fillField('setReview', 'Review-Test-E2e2');
  I.click('#submitReview');

  I.seeElement('.product-review');
  I.see('Name-Test2');
  I.see('Review-Test-E2e2');
});
