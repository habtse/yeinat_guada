import { User } from './AuthProvider.js';

let customers = [
    new User(0, "John", "Doe", "asdas@gasd.asd", "0934354532", null, "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"),
    new User(1, "Jane", "Doe", "asdas@gasd.asd", "34567435675", null, "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"),
]

/**
 * @brief Return a list of customer of the user, the user should be a provider
 * @returns {Promise<Array<OrderInfo>>}
 */
export const getCustomersList = () => {
    return new Promise(resolve => {
        resolve(customers)
    })
}

/**
 * @brief Adds a new customer of the user, the user should be a provider
 * @returns {Promise<Array<OrderInfo>>}
 */
export const addCustomer = (userId) => {
    return new Promise(resolve => {
        resolve(customers)
    })
}

/**
 * @brief Removes the customer of the user, the user should be a provider
 * @returns {Promise<Array<OrderInfo>>}
 */
export const removeCustomer = (userId) => {
    return new Promise(resolve => {
        customers = customers.filter(c => c.userId !== userId)
        resolve(customers)
    })
}

