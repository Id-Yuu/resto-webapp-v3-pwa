import FavoriteProduct from '../src/scripts/data/getData-idb';
import * as TestFavButton from './helper/likeButton';

// eslint-disable-next-line require-jsdoc

describe('Liking Kafe', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the resto has not been liked before', async () => {
    await TestFavButton.createFavoriteButtons({id: 1});

    expect(
        document.querySelector('[aria-label="like this menu"]'),
    ).toBeTruthy();
  });

  it('should not show the unlike button when the resto has not been liked before', async () => {
    await TestFavButton.createFavoriteButtons({id: 1});

    expect(
        document.querySelector('[aria-label="unlike this menu"]'),
    ).toBeFalsy();
  });

  it('should be able to like the resto', async () => {
    await TestFavButton.createFavoriteButtons({id: 1});

    document.querySelector('#favoriteBtn').dispatchEvent(new Event('click'));
    const resto = await FavoriteProduct.getProduct(1);
    expect(resto).toEqual({id: 1});

    await FavoriteProduct.deleteProduct(1);
  });

  it('should not add a resto again when its already liked', async () => {
    await TestFavButton.createFavoriteButtons({id: 1});
    await FavoriteProduct.putProduct({id: 1});

    document.querySelector('#favoriteBtn').dispatchEvent(new Event('click'));
    const restaurants = await FavoriteProduct.getAllProducts();
    expect(restaurants).toEqual([{id: 1}]);

    await FavoriteProduct.deleteProduct(1);
  });

  // menggunakan metode xit, bukan it
  it('should not add a resto when it has no id', async () => {
    await TestFavButton.createFavoriteButtons({});

    document.querySelector('#favoriteBtn').dispatchEvent(new Event('click'));
    const restaurants = await FavoriteProduct.getAllProducts();
    expect(restaurants).toEqual([]);
  });
});
