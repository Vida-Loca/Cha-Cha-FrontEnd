const createSetOfCategories = (array) => {
  const newArray = [];

  const ListOfCategories = [];
  array.forEach((catgory) => {
    ListOfCategories.push(catgory.productCategory.name);
  });

  const uniqCategory = [...new Set(ListOfCategories)];

  uniqCategory.forEach((cate) => {
    const tempObject = { productCategory: cate, products: [] };

    const categoryFiltered = array.filter((product) => product.productCategory.name === cate);
    const modifiedProductList = categoryFiltered.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      user: {
        id: product.eventUser.user.id,
        username: product.eventUser.user.username,
        picUrl: product.eventUser.user.picUrl,
      },
    }));
    tempObject.products = [...modifiedProductList];
    newArray.push(tempObject);
  });
  return newArray;
};

export default createSetOfCategories;
