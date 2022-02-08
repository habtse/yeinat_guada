import { Food } from "./MotherbetProvider";

export class Order {
    constructor(id, customerId, status, motherBetId, items) {
        this.id = id;
        this.customerId = customerId;
        this.status = status;
        this.motherBetId = motherBetId;
        this.items = items;
    }
}

const orders = [
    new Order(0, 0, "pending", 0, [
        { food: new Food("https://picsum.photos/200/300", "Tastie Soy", 5.0, 0, 35.00, "A delicious food"), quantity: 1 },
        { food: new Food("https://picsum.photos/200/300", "Shiro Soy", 5.0, 0, 35.00, "A delicious food"), quantity: 2 },
        { food: new Food("https://picsum.photos/200/300", "Siga Soy", 5.0, 0, 35.00, "A delicious food"), quantity: 12 },
    ]),
    new Order(2, 0, "pending", 0, [
        { food: new Food("https://picsum.photos/200/300", "Tastie Soy", 5.0, 0, 35.00, "A delicious food"), quantity: 1 },
        { food: new Food("https://picsum.photos/200/300", "Shiro Soy", 5.0, 0, 35.00, "A delicious food"), quantity: 2 },
        { food: new Food("https://picsum.photos/200/300", "Siga Soy", 5.0, 0, 35.00, "A delicious food"), quantity: 12 },
    ]),
    new Order(3, 0, "pending", 0, [
        { food: new Food("https://picsum.photos/200/300", "Tastie Soy", 5.0, 0, 35.00, "A delicious food"), quantity: 1 },
        { food: new Food("https://picsum.photos/200/300", "Shiro Soy", 5.0, 0, 35.00, "A delicious food"), quantity: 2 },
        { food: new Food("https://picsum.photos/200/300", "Siga Soy", 5.0, 0, 35.00, "A delicious food"), quantity: 12 },
    ]),
];

/**
 * @brief Return a list of orders for the user, the user should be a provider
 * @returns {Promise<Array<OrderInfo>>}
 */
export const getOrdersList = () => {
    return new Promise(resolve => {
        resolve(orders)
    })
}

/**
 * @brief Marks the order as delivered
 * @param {*} orderId 
 */
export const markOrderAsDelivered = (orderId) => {
    return new Promise(resolve => {
        orders.find(order => order.id === orderId).status = "delivered";
        resolve(orders.find(order => order.id === orderId))
    })
}

/**
 * @brief Marks the order as ready to be delivered
 * @param {*} orderId 
 */
export const markOrderAsReady = (orderId) => {
    return new Promise(resolve => {
        orders.find(order => order.id === orderId).status = "ready";
        resolve(orders.find(order => order.id === orderId))
    })
}

/**
 * @brief Orders the food,the user should be a customer
 * @param {*} order Order to be ordered
 */
export const submitOrder = (order) => {
    return new Promise(resolve => {
        orders.push(order);
        resolve(order)
    })
}

