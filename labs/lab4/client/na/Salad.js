const { v4: uuidv4 } = require("uuid");

class Salad {
    static instanceCounter = 0;

    constructor(arg) {
        const uuid = uuidv4();
        this.uuid = "salad_" + uuid;
        this.id = "salad_" + Salad.instanceCounter++;

        if (arg === undefined) {
            this.ingredients = {};
        } else if (typeof arg === "string") { //check if string
            this.ingredients = JSON.parse(arg).ingredients;
        } else if (arg instanceof Salad) { //check if Salad object
            this.ingredients = { ...arg.ingredients };
        }
    }

    add(name, properties) {
        this.ingredients[name] = properties;
        return this;
    }

    remove(name) {
        delete this.ingredients[name];
        return this;
    }

    getPrice() {
        return Object.values(this.ingredients)
            .reduce((p, c) => p + c.price, 0);
    }

    count(property) {
        return (Object.values(this.ingredients)
            .filter(x => x[property] !== undefined)).length;
    }
}
export default Salad;