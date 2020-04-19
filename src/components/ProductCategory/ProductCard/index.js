/* eslint-disable no-nested-ternary */
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Avatar from "../../Avatar";
import { Button, EditButton } from "../../Button";
import "./ProductCard.scss";
import { TextInputNL, TextArea } from "../../Inputs";
import { UserContext } from "../../../context/UserContext";

import { eventService, adminService } from "../../../Authentication/service";


const ProductCard = ({ removeProduct, eventId, prductId, user, userId, supply, price, picUrl }) => {


  const [loggedInUser,] = useContext(UserContext);

  const [tileSupply, setTileSuply] = useState({
    user,
    supply,
    price: String(price),
    picUrl,
    tempSupply: supply,
    tempPrice: price
  });

  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);

  const [tileState, tileStateSet] = useState(false);

  const [isAuthorized, setAuthorization] = useState(false);


  useEffect(() => {
    // console.log(loggedInUser);
    // adminService.isLoggedInUserAdmin()
    //   .then(res => {
    //     setAuthorization(isAuthorized || res);
    //   }, err => {
    //     console.log(err);
    //   })
    eventService.isCurrentUserAdminOfEvent(eventId)
      .then(res => {
        setAuthorization(isAuthorized || res || loggedInUser.isAdmin || (userId === loggedInUser.user.id));
        console.log(`ev: ${res}`);
      }, err => {
        console.log(err);
      })

    // Promise.all([adminService.isLoggedInUserAdmin(), eventService.isCurrentUserAdminOfEvent(eventId)])
    //   .then(res => {
    //     setAuthorization(isAuthorized || res || res[1]);
    //   }).catch(err => {
    //     console.log(err);
    //   })

    return () => {

    }
  }, []);


  const onChangeHandlerPrice = event => {
    if (event.target.value.length < 20) {
      setTileSuply({
        ...tileSupply,
        [`${event.target.name}`]: event.target.value
      });
    };
  }
  const onChangeHandlerDescription = event => {
    if (event.target.value.length < 250) {
      setTileSuply({
        ...tileSupply,
        [`${event.target.name}`]: event.target.value
      });
    };
  }

  const changeOptions = () => {
    tileStateSet(!tileState);
    setDeleteState(false);
    setEditState(false);
    setTileSuply({
      ...tileSupply,
      supply: tileSupply.tempSupply,
      price: tileSupply.tempPrice
    });
  };

  const deleteHandler = () => {
    setDeleteState(!deleteState);
  };
  const editHandler = () => {
    setEditState(!editState);
  };

  const cancelDelete = () => {
    setDeleteState(false);
    tileStateSet(false);
  };

  const cancelEdit = () => {
    setEditState(false);
    tileStateSet(false);
    setTileSuply({
      ...tileSupply,
      supply: tileSupply.tempSupply,
      price: tileSupply.tempPrice
    });
  };

  const deletingProduct = () => {
    console.log(`deleteing product:${prductId} from event: ${eventId}`);
    removeProduct();

  }

  const updatingProduct = () => {
    if (tileSupply.supply.length > 0 && tileSupply.price.length > 0 && !isNaN(tileSupply.price)) {
      setTimeout(() => {
        console.log(`updating product with id: ${prductId}`)
        console.log({
          price: tileSupply.price,
          supply: tileSupply.supply
        })

      }, 2000);
    } else {
      console.log("can't be updatted")
    }

  }

  return (
    <>
      <div className="product-card-container tooltip">
        {/* <span className={editState ? "tooltiptext tooltiptext-active" : "tooltiptext"}> */}
        {tileState && (
          <span className="tooltiptext">
            {!editState &&
              <EditButton
                options={deleteState}
                activate={deleteHandler}
                cancel={cancelDelete}
                render={<i className="far fa-trash-alt" />}
                confirm={deletingProduct}
              />}

            {!deleteState &&
              <EditButton
                options={editState}
                activate={editHandler}
                cancel={cancelEdit}
                render={<i className="far fa-edit" />}
                confirm={updatingProduct}
              />}

          </span>
        )}

        <Avatar title={tileSupply.user} imageLink={tileSupply.picUrl} />
        <span className="product-info">
          <span className="price-container">
            <span className="product-currency">PLN</span>
            <TextInputNL
              onChange={onChangeHandlerPrice}
              value={tileSupply.price}
              placeholder="price"
              name="price"
              size="input-sm"
              classes="product-price"
              disabled={!editState}
            />
          </span>
          <TextArea value={tileSupply.supply} name="supply" onChange={onChangeHandlerDescription} disabled={!editState} />
        </span>
        {isAuthorized && <Button classes="options-btn" clicked={changeOptions}>
          {tileState ? <i className="fas fa-times" /> : <i className="fas fa-ellipsis-v" />}
        </Button>}

      </div>
    </>

  );
};
ProductCard.defaultProps = {
  picUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLmktkJrArXh_zZVovazl5mb3lna9HXqPo7XvvviCSQAuru5C&s"
};

ProductCard.propTypes = {
  prductId: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
  supply: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  picUrl: PropTypes.string
};

export default ProductCard;
