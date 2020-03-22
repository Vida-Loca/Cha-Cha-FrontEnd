const createSetOfCategories = array => {
  const newArray = [];

  const ListOfCategories = [];
  array.forEach(catgory => {
    ListOfCategories.push(catgory.productCategory.name);
  });

  const uniqCategory = [...new Set(ListOfCategories)];

  uniqCategory.forEach(cate => {
    const tempObject = { Category: cate, supplies: [] };

    for (let i = 0; i < array.length; i += 1) {
      let tempSupply = {};
      if (cate === array[i].productCategory.name) {
        array[i].userCards.forEach(user => {
          tempSupply = {
            id: array[i].id,
            supply: array[i].name,
            userId: user.eventUser.user.id,
            user: user.eventUser.user.username,
            quantity: 2,
            price: array[i].price,
            picUrl: user.eventUser.user.picUrl
          };
        });
        tempObject.supplies.push(tempSupply);
      }
    }
    newArray.push(tempObject);
  });
  return newArray;
};

export default createSetOfCategories;
