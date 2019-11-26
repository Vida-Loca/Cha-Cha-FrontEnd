import React, { useState } from "react";
import "./Suplies.scss";
import SuplyUserTile from "../../../components/SuplyUserTile/SuplyUserTile";
import Button from "../../../components/button/Button";

const Suplies = () => {
  const [supplyList, setsupply] = useState({
    SupplyContainers: [
      {
        Category: "Drinks",
        supplies: [
          { supply: "hortex juice", user: "Lukas", quantity: 2, price: 5 },
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
          { supply: "Coke", user: "Janek", quantity: 3, price: 10 },
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

  return (
    <div className="SuplyBody">
      <div className="PriceLabel">
        <p>2000 zl</p>
      </div>
      {supplyList.SupplyContainers.map((supCont, key) => {
        return (
          <div className="CategoryContainer" key={key}>
            <p className="CategoryLabel">{supCont.Category}</p>

            {supCont.supplies.map((sup, keyt) => {
              return (
                <SuplyUserTile
                  user={sup.user}
                  quantity={sup.quantity}
                  supply={sup.supply}
                  price={sup.price}
                  key={keyt}
                />
              );
            })}

            <Button classes="btn-sm btn-blueGradient"> + Add</Button>
          </div>
        );
      })}
    </div>
  );
};

export default Suplies;
