import FavoriteProduct from '../src/scripts/data/getData-idb';
import * as TestFavButton from './helper/likeButton';

describe('Unliking Kafe', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await TestFavButton.createFavoriteButtons({id: 1});
    document.querySelector('#favoriteBtn').dispatchEvent(new Event('click'));
  });

  afterEach(async () => {
    await FavoriteProduct.deleteProduct(1);
    document.body.innerHTML = '';
  });

  it('should show the unlike button when the resto has been liked before', async () => {
    await TestFavButton.createFavoriteButtons({id: 1});

    expect(
        document.querySelector('[aria-label="unlike this menu"]'),
    ).toBeTruthy();
  });

  it('should not show the like button when the resto has been liked before', async () => {
    await TestFavButton.createFavoriteButtons({id: 1});

    expect(
        document.querySelector('[aria-label="like this menu"]'),
    ).toBeFalsy();
  });

  it('should be able to remove liked movie from the list', async () => {
    await TestFavButton.createFavoriteButtons({id: 1});

    document.querySelector('[aria-label="unlike this menu"]').dispatchEvent(new Event('click'));

    expect(await FavoriteProduct.getAllProducts()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked movie is not in the list', async () => {
    await TestFavButton.createFavoriteButtons({id: 1});

    // Hapus dulu film dari daftar film yang disukai
    await FavoriteProduct.deleteProduct(1);

    // Kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector('[aria-label="unlike this menu"]').dispatchEvent(new Event('click'));
    expect(await FavoriteProduct.getAllProducts()).toEqual([]);
  });
});
