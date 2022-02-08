import { NavBar } from "../nav/navBar"
import { PlusIcon, MinusIcon } from "@heroicons/react/outline"

const QuantityInput = (props) => {

    return (
        <div className="flex flex-row rounded m-1">
            <PlusIcon className="h-5 w-5 p-1 bg-orange-500 text-white rounded-tl rounded-bl" onClick={() => props.setQuantity(props.quantity + 1)} />
            <input type="number" className=" flex-grow-0 h-5 text-center outline-none border-t border-b w-12" value={props.quantity} readOnly />
            <MinusIcon className="h-5 w-5 p-1 bg-orange-500 text-white rounded-tr rounded-br" onClick={() => props.setQuantity(props.quantity - 1)} />
        </div>
    )
}

const CartItem = ({ item, cart, setCart }) => {
    const setQuantity = (quantity) => {
        quantity = Math.max(0, quantity)
        let newCart = { ...cart }
        newCart.items.find(i => i.food.id === item.food.id).quantity = quantity
        newCart.items = newCart.items.filter(i => i.quantity !== 0)
        if (newCart === undefined || newCart === null) {
            newCart = { items: [] }
        }
        setCart(newCart)
    }
    const removeItem = () => {
        let newCart = { ...cart }
        newCart.items = newCart.items.filter(i => i.food.id !== item.food.id)
        setCart(newCart)
    }
    return (
        <div className="flex flex-row border rounded items-center p-4 justify-between ">

            <div className="inline-flex flex-row gap-2 items-center">
                <span className="text-lg">{item.food.name}</span>
                <span className="text-sm">{item.food.price}$</span>
            </div>
            <div className="inline-flex flex-row gap-2 items-center">
                <QuantityInput quantity={item.quantity} setQuantity={setQuantity} />
                <button className="bg-orange-500 text-white p-2 rounded" type="button" onClick={removeItem}>
                    Remove
                </button>
            </div>
        </div>
    )
}

const Items = ({ cart, setCart }) => {
    return (
        <div className="flex flex-col gap-2 my-4">
            {cart.items.filter(i => i.quantity !== 0).map(item => <CartItem item={item} cart={cart} setCart={setCart} key={item.id} />)}
        </div>
    )
}


export const Cart = ({ cart, setCart }) => {
    const getTotal = () => {
        return cart.items.reduce((acc, item) => acc + item.food.price * item.quantity, 0)
    }
    return (
        <div className='flex flex-col w-screen h-screen items-center'>
            <NavBar />
            <div className="flex flex-col w-full md:w-8/12">
                <h1 className="text-2xl md:text-5xl m-4">Cart</h1>
                <hr />
                {cart.items.length === 0 ? <h2 className="text-lg text-center my-4">Your cart is empty</h2> : <Items cart={cart} setCart={setCart} />}
                <hr />

                <section className="flex flex-row border rounded items-center p-4 justify-between my-4" name="total">
                    <span className="text-lg">Total</span>
                    <span className="text-lg">{getTotal()}$</span>
                </section>
                <button className="bg-orange-500 text-white p-2 my-4 rounded self-end">
                    Order
                </button>
            </div>

        </div>
    )
}