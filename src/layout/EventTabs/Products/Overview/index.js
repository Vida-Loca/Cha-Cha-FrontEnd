/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserCard from "../../../../components/UserCard";
import PaginatedContainer from "../../../../components/PaginatedContainer";
import { productService } from "../../../../Authentication/service";
import Spinner from "../../../../components/Spinner";
import "./Overview.scss";

const Overview = ({ eventId, currency }) => {
  const [userExpenses, setUserExpenses] = useState({ users: [], spinner: true });


  useEffect(() => {
    productService.getAllUSerExpenses(eventId)
      .then((res) => {
        setUserExpenses({ users: res, spinner: false });
      });
    return () => { };
  }, []);


  return (
    <div className="overview-container">
      {userExpenses.users.length > 0
        && (
        <PaginatedContainer
          title="user expenses"
          items={userExpenses.users}
          perPage={6}
          render={
            userExpenses.spinner
              ? () => <Spinner />
              : ({ items }) => items.map((user) => (
                <UserCard
                  key={user.eventUser.user.username}
                  username={user.eventUser.user.username}
                  imageUrl={user.eventUser.user.picUrl}
                  isBanned={user.eventUser.user.banned}
                  showControlls
                >
                  <span className="money-lable">
                    {`${user.expenses} ${currency}`}
                  </span>
                </UserCard>
              ))
          }
        />
        )}
    </div>
  );
};

Overview.propTypes = {
  eventId: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default Overview;
