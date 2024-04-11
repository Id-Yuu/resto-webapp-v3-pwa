const itActsAsfavKafeModel = (FavoriteProduct) => {
  it('should return the kafe that has been added', async () => {
    FavoriteProduct.putProduct({id: 1});
    FavoriteProduct.putProduct({id: 2});

    expect(await FavoriteProduct.getProduct(1)).toEqual({id: 1});
    expect(await FavoriteProduct.getProduct(2)).toEqual({id: 2});
    expect(await FavoriteProduct.getProduct(3)).toEqual(undefined);
  });

  it('should refuse a kafe from being added if it does not have the correct property', async () => {
    FavoriteProduct.putProduct({aProperty: 'property'});

    expect(await FavoriteProduct.getAllProducts()).toEqual([]);
  });

  it('can return all of the kafe that have been added', async () => {
    FavoriteProduct.putProduct({id: 1});
    FavoriteProduct.putProduct({id: 2});

    expect(await FavoriteProduct.getAllProducts()).toEqual([{id: 1}, {id: 2}]);
  });

  it('should remove favorite kafe', async () => {
    FavoriteProduct.putProduct({id: 1});
    FavoriteProduct.putProduct({id: 2});
    FavoriteProduct.putProduct({id: 3});

    await FavoriteProduct.deleteProduct(1);

    expect(await FavoriteProduct.getAllProducts()).toEqual([{id: 2}, {id: 3}]);
  });

  it('should handle request to remove a kafe even though the kafe has not been added', async () => {
    FavoriteProduct.putProduct({id: 1});
    FavoriteProduct.putProduct({id: 2});
    FavoriteProduct.putProduct({id: 3});

    await FavoriteProduct.deleteProduct(4);

    expect(await FavoriteProduct.getAllProducts()).toEqual([{id: 1}, {id: 2}, {id: 3}]);
  });
};


export {itActsAsfavKafeModel};
