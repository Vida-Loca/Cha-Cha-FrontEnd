import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import "./ProductCategory.scss";

import { ShowMore, Button } from "../Button";
import ProductCard from "./ProductCard";
import AddNewProductContainer from "../../layout/EventTabs/Products/AddNewProductContainer";

import { FormContext } from "../../context/FormContext";
import { productService } from "../../Authentication/service";

const ProductCategory = ({
  isEventAdmin, eventId, supCont, currency,
}) => {
  const [supplyContainer, setsupplyContainer] = useState({
    ...supCont,
    showMore: false,
  });
  const [, setform] = useContext(FormContext);

  const addProduct = (addedProduct) => {
    const tempSup = supplyContainer.products;

    const foundIndexOfProduct = tempSup.findIndex((prod) => prod.id === addedProduct.product.id);
    if (foundIndexOfProduct > -1) {
      tempSup[foundIndexOfProduct].quantity = addedProduct.product.quantity;
    } else {
      tempSup.push(addedProduct.product);
    }
    setsupplyContainer({ ...supplyContainer, products: tempSup });
  };

  const openModalAddSupply = () => {
    setform({
      show: true,
      // eslint-disable-next-line max-len
      renderForm: <AddNewProductContainer addProductToList={addProduct} id={eventId} category={supplyContainer.productCategory} />,
    });
  };

  const showMoreHandler = () => {
    supplyContainer.showMore = !supplyContainer.showMore;
    setsupplyContainer({ ...supplyContainer });
  };

  const removeProductFromCategory = (productId) => {
    productService.removeProduct(eventId, productId)
      .then(() => {
        setsupplyContainer({
          ...supplyContainer,
          products: supplyContainer.products.filter((prod) => prod.id !== productId),
          show: true,
        });
      })
      .catch(() => {});
  };

  const updateProductInList = (productId, newProd) => {
    setsupplyContainer({
      ...supplyContainer,
      products: supplyContainer.products.map((prod) => {
        if (prod.id === productId) {
          return {
            ...prod, name: newProd.name, price: newProd.price, quantity: newProd.quantity,
          };
        }
        return prod;
      }),
      show: true,
    });
  };


  return (
    <div className={supplyContainer.showMore ? "category-container" : "category-container hide"}>
      <div className="product-header">
        <div className="label-button">
          <p className="category-label">{supplyContainer.productCategory}</p>
          <ShowMore showState={supplyContainer.showMore} clicked={() => showMoreHandler()} />
        </div>
        <div className="price-and-add">
          <p className="price-label">
            {Number(
              Object.keys(supplyContainer.products)
                // eslint-disable-next-line max-len
                .reduce((previous, index) => previous + supplyContainer.products[index].price * supplyContainer.products[index].quantity, 0),
            ).toFixed(2)}
            <span>
              {" "}
              {currency}
            </span>
          </p>
          <Button clicked={openModalAddSupply} classes="btn-sm btn-orangeGradient">
            <i className="fas fa-plus-circle" />
          </Button>
        </div>
      </div>

      <div className="product-collection">
        {supplyContainer.products.map((sup) => (
          <ProductCard
            currency={currency}
            updateProductList={updateProductInList}
            removeProduct={() => removeProductFromCategory(sup.id)}
            eventId={eventId}
            product={{
              id: sup.id,
              name: sup.name,
              price: sup.price,
              quantity: sup.quantity,
            }}
            user={{
              ...sup.user,
              isEventAdmin,
            }}
            key={`${sup.id}-${sup.userId}`}
            category={supCont.productCategory}
          />
        ))}
      </div>
    </div>
  );
};

ProductCategory.propTypes = {
  eventId: PropTypes.string.isRequired,
  isEventAdmin: PropTypes.bool.isRequired,
  supCont: PropTypes.shape({
    productCategory: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
  }).isRequired,
  currency: PropTypes.string.isRequired,
};

export default ProductCategory;
