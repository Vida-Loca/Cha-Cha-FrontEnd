const createSetOfCategories = array => {
  const newArray = [];

  const ListOfCategories = [];
  array.forEach(catgory => {
    ListOfCategories.push(catgory.productCategory.name);
  });

  const uniqCategory = [...new Set(ListOfCategories)];

  uniqCategory.forEach(cate => {
    const tempObject = { productCategory: cate, supplies: [] };

    for (let i = 0; i < array.length; i += 1) {
      let tempSupply = {};
      if (cate === array[i].productCategory.name) {
        array[i].eventUsers.forEach(user => {
          tempSupply = {
            id: array[i].id,
            name: array[i].name,
            userId: user.user.id,
            user: user.user.username,
            price: array[i].price,
            picUrl: user.user.picUrl
          };
        });
        tempObject.supplies.push(tempSupply);
      }
    }
    newArray.push(tempObject);
  });
  return newArray;
};


const userProductList = products =>{
  const user
}

export default createSetOfCategories;
