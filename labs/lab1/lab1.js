"use strict";

const { v4: uuidv4 } = require("uuid");


/**
 * Reflection question 1
 * Why don’t we need to store properties with the value false in the JavaScript objects?
 *
 * Object properties that are not explicitly assigned a value are undefined by default,
 * and thereby it is just neccesary to store the true ones.
 */

const imported = require("./inventory.js");

console.log("Sallad:", imported.inventory["Sallad"]);

console.log("Object.keys():");
const names = Object.keys(imported.inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: "case" }))
  .forEach((name) => console.log(name));

console.log("\n\nfor ... in:");
for (const name in imported.inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * When will the two examples (object.keys, for...in) give different outputs?
 *
 * The output will then vary if the object has inherited properties.
 * The Object.keys() method returns an array of a given object's own enumerable properties,
 * while the for...in loop iterates over an object's enumerable properties and its inherited ones.
 *
 * Why is inherited functions, such as sort(), not printed?
 * inherited function like sort will not be listed cuz functions are not enumerable in javascript.
 */

console.log("\n--- Assignment 1 ---------------------------------------");

//1. get all keys that has a certain property = filter check
//2. get the price
//3. print out the html code with key and price
//4. do that for every key that upholds the predicate = map
//5. reduce to a single string = reduce

function makeOptions(inv, prop) {
  return Object.keys(inv)
    .filter(key => inv[key][prop] === true)
    .map(key => `<option value="${key}"> ${key}, ${inv[key]["price"]} kr</option>`)
    .reduce((p, v) => p+"\n"+v)
}

console.log(makeOptions(imported.inventory, "foundation"));

console.log("\n--- Assignment 2 ---------------------------------------");
class Salad {

  static instanceCounter = 0;

  constructor(arg){
    const uuid = uuidv4();
    this.uuid = "salad_" + uuid;
    this.id = "salad_" + Salad.instanceCounter++;

    if (arg === undefined){
      this.ingredients = {}
    } else if (typeof arg === "string"){ //check if string
      let parsed = JSON.parse(arg);
      this.ingredients = parsed.ingredients;
      this.uuid = parsed.uuid;
    } else if(arg instanceof Salad){ //check if Salad object
      this.ingredients = {...arg.ingredients}
    }
  }

  add(name, properties) {
    this.ingredients[name] = properties
    return this
  }

  remove(name) {
    delete this.ingredients[name]
    return this
  }

  getPrice = function(){
      return Object.values(this.ingredients)
            .reduce((p,c) => p + c.price, 0);
    }
    
    count = function(){
      return (Object.values(this.ingredients)
        .filter(x => x[property] !== undefined)).length
    }
}

// Salad.prototype.getPrice = function(){
//   return Object.values(this.ingredients)
//         .reduce((p,c) => p + c.price, 0);
// }

// Salad.prototype.count = function(property){
//   return (Object.values(this.ingredients)
//     .filter(x => x[property] !== undefined)).length
// }

class GourmetSalad extends Salad {

  constructor(){
    super();
    this.ingredients = {}
  }

  add(name, properties, size){

    if(this.ingredients[name] !== undefined){ //if ingredient already exists
      this.ingredients[name].size += size //increase size
    } else{
      super.add(name, Object.assign({size:size}, properties))
    }
    return this;
  }

  getPrice(){
    return Object.values(this.ingredients)
          .reduce(((p,c) => p + ((c.size !== undefined) ? c.size : 1) *c.price), 0);
  }
  }


let myCaesarSalad = new Salad()
  .add('Sallad', imported.inventory['Sallad'])
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'])
  .add('Bacon', imported.inventory['Bacon'])
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'])
  .add('Ceasardressing', imported.inventory['Ceasardressing'])
  .add('Gurka', imported.inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');


console.log("\n--- Assignment 3 ---------------------------------------");
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör

/**
* Reflection question 3
* How are classes and inherited properties represented in JavaScript?
* Classes are templates for creating objects
*
* What is the difference between an object’s prototype chain and having a prototype property? 
* [ obj3 -> [obj2] -> obj1 -> Object ]
*
* Which objects have a prototype property? How do you get the next object in the prototype chain?
* Object.getPrototypeOf(obj2) => obj
*
*/
console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));


console.log("\n--- Assignment 4 ---------------------------------------");

const objectCopy = new Salad(myCaesarSalad);
const json = JSON.stringify(myCaesarSalad);
const jsonCopy = new Salad(json);
console.log('myCesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('copy from object\n' + JSON.stringify(objectCopy));
console.log('copy from json\n' + JSON.stringify(jsonCopy));
objectCopy.add('Gurka', imported.inventory['Gurka']);
console.log('originalet kostar kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('med gurka kostar den ' + objectCopy.getPrice() + ' kr');

console.log("\n--- Assignment 5 ---------------------------------------");
// Not done
let myGourmetSalad = new GourmetSalad()
  .add('Sallad', imported.inventory['Sallad'], 0.5)
  .add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2)
  .add('Bacon', imported.inventory['Bacon'], 0.5)
  .add('Krutonger', imported.inventory['Krutonger'])
  .add('Parmesan', imported.inventory['Parmesan'], 2)
  .add('Ceasardressing', imported.inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');
console.log("------------------");
console.log(myGourmetSalad)

console.log("\n--- Assignment 6 ---------------------------------------");

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

/**
* Reflection question 4
* In which object are static properties stored?
*
* Static properties are stored on the class itself rather than on individual instances of the class.
* This means that all instances of a class share the same static properties.

/** Reflection question 5
* Can you make the id property read only?
* Yes, by using the Object.defineProperty()
* ex:
* Object.defineProperty(this, 'id', {
*   value: Salad.instanceCounter++,
*   writable: false
* });

/** Reflection question 6
* Can properties be private?
* Yes, by prefixing the property name with #
* ex:   #private = 'private';
*/

// Extra assignment:

class HandleOrder{

  constructor(){
    this.cart = []
  }

  addOrder(Salad){
    this.cart.push(Salad);
  }

  removeOrder(Salad){
    const index = this.cart.indexOf(Salad)
    this.cart.splice(index, 1)
  }

  getTotalPrice(){
    return this.cart.reduce((p,c) => p + c.getPrice(), 0)
  }

}
console.log("-------TEST-------");
let h = new HandleOrder();
// console.log(h.cart);
h.addOrder(myGourmetSalad)
h.addOrder(myGourmetSalad)
h.addOrder(myCaesarSalad)
// console.log(h.cart);
// h.removeOrder(myGourmetSalad)
// console.log(h.cart);
console.log("Total price: \n", h.getTotalPrice());
