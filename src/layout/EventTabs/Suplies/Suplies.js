import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./Suplies.scss";
import { FormContext } from "../../../context/FormContext";
import SuplyUserTile from "../../../components/SuplyUserTile/SuplyUserTile";
import Button from "../../../components/button/Button";
import TextInput from "../../../components/Inputs/TextInput/TextInput";
import Form from "../../../components/Form/Form";

const Suplies = ({ openModal }) => {
  const setform = useContext(FormContext)[1];

  const [supplyList, setsupply] = useState({
    eventName: "NewYear 2020",
    SupplyContainers: [
      {
        Category: "Drinks",
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
          <div className="CategoryContainer" key={key}>
            <p className="CategoryLabel">{supCont.Category}</p>

            {supCont.supplies.map((sup, key) => {
              return (
                <SuplyUserTile
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
              {" "}
              + Add
            </Button>
          </div>
        );
      })}
    </div>
  );
};

Suplies.propTypes = {
  // eslint-disable-next-line react/require-default-props
  openModal: PropTypes.func
};

export default Suplies;
