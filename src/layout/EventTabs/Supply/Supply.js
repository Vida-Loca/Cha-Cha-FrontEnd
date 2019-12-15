import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./Supply.scss";
import { FormContext } from "../../../context/FormContext";
import SupplyUserTile from "../../../components/SupplyUserTile/SupplyUserTile";
import Button from "../../../components/button/Button";
import ShowMoreButton from "../../../components/ShowMoreButton/ShowMoreButton";
import ThreeDots from "../../../components/ThreeDots/ThreeDots";
import TextInput from "../../../components/Inputs/TextInput/TextInput";
import Form from "../../../components/Form/Form";

const Supply = ({ openModal }) => {
  const setform = useContext(FormContext)[1];

  const [supplyList, setsupply] = useState({
    SupplyContainers: [
      {
        Category: "Drinks",
        showMore: false,
        supplies: [
          {
            supply:
              "hortex juice with a salty hortex juice with a salty taste for not to much",
            user: "Lukas200K",
            quantity: 2,
            price: 5
          },
          { supply: "beer", user: "Gorgios", quantity: 1, price: 5 },
          { supply: "muler michkskd", user: "Jankek", quantity: 2, price: 5 },
          { supply: "Coke", user: "Janek", quantity: 3, price: 10 },
          { supply: "hortex juice", user: "Lukas", quantity: 2, price: 5 }
        ]
      },
      {
        Category: "Food",
        showMore: false,
        supplies: [
          { supply: "hortex juice", user: "Lukas", quantity: 2, price: 5 },
          { supply: "beer", user: "Gorgios", quantity: 1, price: 5 },
          { supply: "muler michkskd", user: "Jankek", quantity: 2, price: 5 },
          { supply: "Coke", user: "Janek", quantity: 3, price: 1000005 },
          { supply: "hortex juice", user: "Lukas", quantity: 2, price: 5 }
        ]
      },
      {
        Category: "Party Items",
        showMore: false,
        supplies: [
          { supply: "hortex juice", user: "Lukas", quantity: 2, price: 5 },
          { supply: "beer", user: "Gorgios", quantity: 1, price: 5 },
          { supply: "muler michkskd", user: "Jankek", quantity: 2, price: 5 },
          { supply: "Coke", user: "Janek", quantity: 32, price: 10 },
          { supply: "hortex juice", user: "Lukas", quantity: 2, price: 5 }
        ]
      }
    ]
  });

  const showMoreHandler = index => {
    const tempSupplyContainers = supplyList.SupplyContainers;
    tempSupplyContainers[index].showMore = !tempSupplyContainers[index]
      .showMore;
    setsupply({ ...supplyList, tempSupplyContainers });
  };

  const newSupplyContainerForm = () => {
    return (
      <Form>
        <TextInput
          placeholder="Supply Container Name"
          name="supplyContainerName"
        />
        <Button to="/home" classes="btn-blueGradient btn-md">
          apply
        </Button>
      </Form>
    );
  };

  const editSupplyForm = () => {
    return (
      <Form>
        <TextInput placeholder="Username" name="username" />
        <TextInput
          placeholder="Supply Container Name"
          name="supplyContainerName"
        />
        <TextInput placeholder="price" name="price" />
        <Button to="/home" classes="btn-blueGradient btn-md">
          apply
        </Button>
      </Form>
    );
  };

  const addSupplyForm = () => {
    return (
      <Form>
        <TextInput placeholder="Username" name="username" />
        <TextInput
          placeholder="Supply Container Name"
          name="supplyContainerName"
        />
        <TextInput placeholder="price" name="price" />
        <Button to="/home" classes="btn-blueGradient btn-md">
          apply
        </Button>
      </Form>
    );
  };

  const openModalNewSupplyContainer = () => {
    setform({ renderForm: newSupplyContainerForm() });
    openModal();
  };
  const openModalEditSupply = userId => {
    setform({ renderForm: editSupplyForm() });
    console.log(userId);
    openModal();
  };
  const openModalAddSupply = () => {
    setform({ renderForm: addSupplyForm() });
    openModal();
  };

  return (
    <div className="SuplyBody">
      <p className="EventName">Event Name</p>
      <div className="buttonContainer">
        <Button
          classes="btn-md btn-blueGradient"
          clicked={openModalNewSupplyContainer}
        >
          Create new supply container
        </Button>
      </div>
      {supplyList.SupplyContainers.map((supCont, key) => {
        return (
          <div
            className={
              supCont.showMore ? "CategoryContainer" : "CategoryContainer hide"
            }
            key={supCont.Category}
          >
            <div className="SupplyHeader">
              <div>
                <p className="CategoryLabel">{supCont.Category}</p>
                <ShowMoreButton
                  showState={supCont.showMore}
                  clicked={() => showMoreHandler(key)}
                />
              </div>
              <div className="DotsAndPrice">
                <div className="PriceAndAdd">
                  <p className="PriceLabel">
                    {Object.keys(supCont.supplies).reduce((previous, index) => {
                      return previous + supCont.supplies[index].price;
                    }, 0)}
                    <span> zl</span>
                  </p>
                  <Button
                    clicked={openModalAddSupply}
                    classes="btn-sm btn-orangeGradient"
                  >
                    <i className="fas fa-plus-circle" />
                  </Button>
                </div>
                <ThreeDots />
              </div>
            </div>

            <div className="SupplyBody">
              {supCont.supplies.map((sup, indexing) => {
                return (
                  <SupplyUserTile
                    user={sup.user}
                    supply={sup.supply}
                    price={sup.price}
                    key={sup.user + indexing}
                    openModal={openModalEditSupply}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Supply.propTypes = {
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func
};

export default Supply;
