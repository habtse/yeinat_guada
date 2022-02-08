import { MinusIcon, PlusIcon } from "@heroicons/react/outline"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MotherBetProvider } from "../../api/MotherbetProvider"
import { NavBar } from "../nav/navBar"
import { Rating } from "../rating/rating"


const MotherBetDetailsCard = ({ details }) => {

    return (
        <aside className="flex flex-col">
            <img src={details.imageURL} className="aspect-square rounded-tl rounded-tr" alt={`profile of ${details.name}`} />
            <span>{details.name}</span>
            <span>{details.ordersPending} orders pending</span>
        </aside>

    )
}

const QuantityInput = (props) => {
    return (
        <div className="flex flex-row rounded m-1">
            <PlusIcon className="h-5 w-5 p-1 bg-orange-500 text-white rounded-tl rounded-bl" onClick={() => props.setQuantity(props.quantity + 1)} />
            <input type="number" className=" flex-grow-0 h-5 text-center outline-none border-t border-b w-12" value={props.quantity} readOnly />
            <MinusIcon className="h-5 w-5 p-1 bg-orange-500 text-white rounded-tr rounded-br" onClick={() => props.setQuantity(props.quantity - 1)} />
        </div>
    )
}

const FoodCard = ({ food, cart, setCart }) => {
    const getQuantity = () => {
        if (cart.items.find(item => item.food.id === food.id)) {
            return cart.items.find(item => item.food.id === food.id).quantity
        } else {
            return 0
        }
    }
    const setQuantity = (quantity) => {
        quantity = Math.max(0, quantity)
        let newCart = { ...cart }
        if (newCart.items.find(item => item.food.id === food.id)) {
            newCart.items.find(item => item.food.id === food.id).quantity = quantity
        }
        else {
            newCart.items.push({ id: food.id, food: food, quantity: quantity })
        }
        setCart(newCart)
    }

    const rateFood = (rating) => { }

    return (
        <div className="flex flex-col gap-2 border rounded shadow-lg">
            <img className="aspect-video object-cover rounded-t" src={food.imageURL} alt={`preview of ${food.name}`} />
            <div className="flex flex-col justify-around p-3">
                <h1 className="text-xl">{food.name}</h1>
                <p>{food.description}</p>
                <p>${food.price}</p>
                <Rating rating={Number(food.rating / 1)} isInteractive={true} onRate={rateFood} />
                <div className="self-end flex flex-row gap-1 items-center justify-center">
                    Qty :<QuantityInput quantity={getQuantity()} setQuantity={setQuantity} />
                </div>
            </div>
        </div>
    )
}

export const MotherBet = ({ cart, setCart }) => {
    const params = useParams()
    const [motherBetDetails, setMotherBetDetails] = useState()
    const [foods, setFoods] = useState()

    useEffect(() => {
        MotherBetProvider.getMotherBetDetail(parseInt(params.id)).then(
            data => setMotherBetDetails(data)
        )
        MotherBetProvider.getFoods(parseInt(params.id)).then(
            foods => setFoods(foods)
        )
    }, [params.id])

    return (
        <div className='flex flex-col w-screen h-screen'>
            <NavBar cart={cart}></NavBar>


            <h1 className="text-5xl font-bold  m-4">Our Foods</h1>
            <div className="flex mx-4">
                {foods !== undefined ?
                    <div className="flex flex-row flex-wrap gap-4">
                        {foods.map(food => <FoodCard food={food} key={food.id} cart={cart} setCart={setCart} />)}
                    </div>
                    : ""
                }
                {motherBetDetails !== undefined ?
                    <MotherBetDetailsCard details={motherBetDetails} /> : ""}
            </div>
        </div>
    )
}