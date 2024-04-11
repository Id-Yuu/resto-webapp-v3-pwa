import FavoriteButton from '../../src/scripts/utils/favoriteInitiator';

const createFavoriteButtons = async (restaurant) => {
  await FavoriteButton.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    restaurant,
  });
};

export {createFavoriteButtons};
