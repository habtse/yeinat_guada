export class MotherBetInfo {
    imageUrl = ""
    name = ""
    rating = 5.0
    id = 0
    constructor(profileImageUrl, name, rating, id) {
        this.imageUrl = profileImageUrl
        this.name = name
        this.id = id
        this.rating = rating
    }
}

export class MotherBetDetails {
    id = 0
    name = ""
    description = ""
    imageURL = ""
    ordersPending = 0
    constructor(id, name, description, imageURL, ordersPending) {
        this.id = id
        this.name = name
        this.description = description
        this.imageURL = imageURL
        this.ordersPending = ordersPending
    }
}

export class Food {
    id = 0
    imageURL = ""
    name = ""
    price = 0.0
    description = ""
    rating = 0.0
    constructor(imageURL, name, rating, id, price, description) {
        this.imageURL = imageURL
        this.name = name
        this.id = id
        this.price = price
        this.rating = rating
        this.description = description
    }
}

export class MotherBetProvider {
    static #motherBets = [
        new MotherBetInfo("https://picsum.photos/200/300", "Saron's Fast Food", 4.5, 0),
        new MotherBetInfo("https://picsum.photos/200/300", "Gadisa's Fast Food", 3.5, 1),
        new MotherBetInfo("https://picsum.photos/200/300", "Haile's Fast Food", 4, 2),
        new MotherBetInfo("https://picsum.photos/200/300", "Bruk's Fast Food", 2, 3),
    ]


    static #foods = [
        new Food("https://picsum.photos/200/300", "Tastie Soy", 5.0, 0, 35.00, "A delicious food"),
        new Food("https://picsum.photos/200/300", "Special Firfir", 2.0, 1, 35.00, "A delicious food"),
        new Food("https://picsum.photos/200/300", "Shiro", 4.5, 2, 35.00, "A delicious food"),
        new Food("https://picsum.photos/200/300", "Tibs", 5.0, 3, 35.00, "A delicious food"),

    ]

    static getMotherBetsList() {
        return new Promise(resolve => {
            resolve(this.#motherBets)
        })
    }

    static getMotherBetDetail(id) {
        return new Promise(resolve => {
            let m = this.#motherBets.find(i => i.id === id)
            resolve(new MotherBetDetails(m.id, m.name, m.description, m.imageUrl, Math.floor(Math.random() * 100)))
        })
    }

    static rateMotherBet(id, rating) {
        return new Promise(resolve => {
            const m = this.#motherBets.find(i => i.id === id)
            m.rating = rating
            resolve()
        }
        )
    }

    /**
     * 
     * @param  motherBetid 
     * @returns An array of Food that the motherbet with the id will serve
     */
    static getFoods(motherBetid) {
        return new Promise(resolve => {
            resolve(this.#foods)
        }
        )
    }


}

