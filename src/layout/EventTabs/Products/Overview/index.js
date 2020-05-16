import React, {useState, useEffect} from 'react'
import UserCard from "../../../../components/UserCard";
import PaginatedContainer from "../../../../components/PaginatedContainer";
import { eventService, productService } from "../../../../Authentication/service";
import Spinner from "../../../../components/Spinner";
import "./Overview.scss";

const Overview = ({eventProducts, eventId, currency}) => {
    
    const [userExpenses, setUserExpenses] = useState({users:[], spinner: true});


        useEffect(() => {
            productService.getAllUSerExpenses(eventId)
            .then(res => {
                setUserExpenses({users: res, spinner: false})
            })
            return () =>{}
        },[])


    return (
        <div className="overview-container">
            { userExpenses.users.length > 0 &&
                <PaginatedContainer
                title="user expenses"
                items={userExpenses.users}
                perPage={6}
                render={
                    userExpenses.spinner
                ? () => <Spinner />
                : ({ items }) =>
                    items.map(user => (
                    <UserCard key={user.eventUser.user.username} username={user.eventUser.user.username} imageUrl={user.eventUser.user.picUrl} showControlls>
                        {/* <span className={`money-label ${user.money < 0 ? "red" : ""}`}>
                            {user.money > 0 ? `+${user.money}`: user.money}
                            <span className="currency"> {currency}</span>
                        </span> */}
                        <span className="money-lable">
                            {user.expenses}
                        </span>
                    </UserCard>
                    ))
                    }
             />
      }
        </div>
    )
}

export default Overview;