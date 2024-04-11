/* eslint-disable new-cap */
const compare = require('assert');

Feature('Liking Kafe');

Before(({I}) => {
  I.amOnPage('/#/favorite'); // localhost:8080/#/favorite
});

// scenario: empty
Scenario('Empty liked kafe', ({I}) => {
  I.seeElement('#favLists');
  I.see('Failed to load bookmarked restaurant.');
});


// scenario: liking one kafe
Scenario('liking one kafe', async ({I}) => {
  I.see('Failed to load bookmarked restaurant.');

  // Homepage
  I.amOnPage('/');
  I.seeElement('.post-item');
  I.seeElement('.post-item__content a');
  const postItemFav = locate('.post-item__title').first();
  const postItemFavTitle = await I.grabTextFrom(postItemFav);
  I.click(postItemFav);

  // details:id
  I.seeElement('#favoriteBtn');
  I.click('#favoriteBtn');

  // Homepage/#/favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');
  const postTitle = await I.grabTextFrom('.post-item__title');
  compare.strictEqual(postItemFavTitle, postTitle);
});

// scenario: unliking one kafe
Scenario('unliking one kafe', async ({I}) => {
  I.see('Failed to load bookmarked restaurant.');

  // to Homepage
  I.amOnPage('/');
  I.seeElement('.post-item');
  I.seeElement('.post-item__content a');
  const postItemFav = locate('.post-item__title').first();
  const postItemFavTitle = await I.grabTextFrom(postItemFav);
  I.click(postItemFav);

  // click favorite
  I.seeElement('#favoriteBtn');
  I.click('#favoriteBtn');

  // check in Page/#/favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.post-item');
  const postTitle = await I.grabTextFrom('.post-item__title');
  compare.strictEqual(postItemFavTitle, postTitle);

  // See Favorite and to Page post
  I.seeElement('.post-item');
  I.seeElement('.post-item__content a');
  const postItemUnFav = locate('.post-item__title').first();
  I.click(postItemUnFav);

  // click unfavorite Post
  I.seeElement('#favoriteBtn');
  I.click('#favoriteBtn');

  // check to Page/#/favorite
  I.amOnPage('/#/favorite');
  I.see('Failed to load bookmarked restaurant.');
});
