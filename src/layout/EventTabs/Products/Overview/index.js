import React, {useState, useEffect} from 'react'
import UserCard from "../../../../components/UserCard";
import PaginatedContainer from "../../../../components/PaginatedContainer";
import { eventService } from "../../../../Authentication/service";
import Spinner from "../../../../components/Spinner";
import "./Overview.scss";

const Overview = ({eventProducts, eventId}) => {
    
    const [memebers, setMembers] = useState({users:[], spinner: true});

        const prepareOverview = (userId, userAmount) =>{
            let totalPrice = 0;
            let money = 0;
            eventProducts.forEach(categories =>{
                categories.supplies.forEach(products => {
                    money += products.userId === userId ? products.price: 0;
                    totalPrice += products.price;
                })
            })
            return Number(- totalPrice / userAmount + money).toFixed(2);
        }


        useEffect(() => {
            eventService.getEventMembers(eventId)
            .then(res =>{
                console.log(res);
                setMembers({users: res.map( user =>{
                    return ({...user, money: prepareOverview(user.id, res.length)})
                }), spinner: false});
            }, err =>{
                setMembers({users: [], spinner: false})
                console.log(err);
            })
            return () =>{}
        },[])


    return (
        <div className="overview-container">
            { memebers.users.length > 0 &&
                <PaginatedContainer
                title="user expenses"
                items={memebers.users}
                perPage={6}
                render={
                    memebers.spinner
                ? () => <Spinner />
                : ({ items }) =>
                    items.map(user => (
                    <UserCard key={user.username} username={user.username} imageUrl={user.picUrl} showControlls>
                        <span className={`money-label ${user.money < 0 ? "red" : ""}`}>{user.money > 0 ? `+${user.money}`: user.money}</span>
                    </UserCard>
                    ))
                    }
             />
      }
        </div>
    )
}

export default Overview;