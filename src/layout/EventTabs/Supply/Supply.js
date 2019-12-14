import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./Supply.scss";
import { FormContext } from "../../../context/FormContext";
import SupplyUserTile from "../../../components/SupplyUserTile/SupplyUserTile";
import Button from "../../../components/button/Button";
import ShowMoreButton from "../../../components/ShowMoreButton/ShowMoreButton";
import TextInput from "../../../components/Inputs/TextInput/TextInput";
import Form from "../../../components/Form/Form";

const Supply = ({ openModal }) => {
  const setform = useContext(FormContext)[1];

  const [supplyList, setsupply] = useState({
    eventName: "NewYear 2020",
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

  const showMoreHandler = some => {
    let tempSupplyContainers = supplyList.SupplyContainers;
    tempSupplyContainers[some].showMore = !tempSupplyContainers[some].showMore;
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
      <p className="EventName">{supplyList.eventName}</p>

      <Button
        classes="btn-md btn-blueGradient"
        clicked={openModalNewSupplyContainer}
      >
        Create new supply container
      </Button>
      {supplyList.SupplyContainers.map((supCont, key) => {
        return (
          <div
            className={
              supCont.showMore ? "CategoryContainer" : "CategoryContainer hide"
            }
            // className="CategoryContainer"
            key={key}
          >
            <div className="SupplyHeader">
              <div>
                <p className="CategoryLabel">{supCont.Category}</p>
                <ShowMoreButton
                  showState={supCont.showMore}
                  clicked={() => showMoreHandler(key)}
                />
                {/* <Button clicked={() => showMoreHandler(key)}>\/</Button> */}
              </div>
              <p className="PriceLabel">
                {Object.keys(supCont.supplies).reduce((previous, key) => {
                  return previous + supCont.supplies[key].price;
                }, 0)}
                <span> zl</span>
              </p>
            </div>
            <div className="SupplyBody">
              {supCont.supplies.map((sup, key) => {
                return (
                  <SupplyUserTile
                    user={sup.user}
                    supply={sup.supply}
                    price={sup.price}
                    key={key}
                    openModal={openModalEditSupply}
                  />
                );
              })}
              <Button
                clicked={openModalAddSupply}
                classes="btn-sm btn-blueGradient"
              >
                + Add
              </Button>
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
