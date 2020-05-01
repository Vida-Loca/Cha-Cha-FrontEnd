import React, {useState, useEffect} from 'react'
import UserCard from "../../../../components/UserCard";
import PaginatedContainer from "../../../../components/PaginatedContainer";
import { eventService } from "../../../../Authentication/service";
import Spinner from "../../../../components/Spinner";
import "./Overview.scss";

const Overview = ({eventProducts, eventId}) => {
    
    const [memebers, setMembers] = useState({users:[], spinner: true});
    const [totalPrice, setTotalPrice] = useState(0);

        const prepareOverview = (userId) =>{
            let money = 0;
            eventProducts.forEach(categories =>{
                categories.supplies.forEach(products => {
                    money += products.userId === userId ? products.price: 0;
                })
            })
            return money;
        }
        const calculateOverallPrice = () =>{
            let money = 0;
            eventProducts.forEach(categories =>{
                categories.supplies.forEach(products => {
                    money +=  products.price;
                })
            })
            return money;
        }

        const calculateExpense = (money) =>{
            const amountOfMoney = Number(- totalPrice / memebers.users.length + money).toFixed(2)
            // return <span className={`money-label ${amountOfMoney < 0 ? "red" : ""}`}>{amountOfMoney > 0 ? `+${amountOfMoney}`: amountOfMoney}</span>
            return <span className={`money-label`}>{amountOfMoney}</span>
        }

        useEffect(() => {
            setTotalPrice(calculateOverallPrice());
            eventService.getEventMembers(eventId)
            .then(res =>{
                console.log(res);
                setMembers({users: res.map( user =>{
                    return ({...user, money: prepareOverview(user.id)})
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
                        {calculateExpense()}
                    </UserCard>
                    ))
                    }
             />
      }
        </div>
    )
}

export default Overview;