"use strict";
/**
 * Reflection question 1
 * your answer goes here
 * object properties that are not explicitly assigned a value are undefined by default, which means that it is not necessary to store properties with a value of false in JavaScript objects
 * just the true ones.
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
 * The Object.keys() method returns an array of a given object's own enumerable properties,
 * while the for...in loop iterates over an object's enumerable properties and its inherited ones.
 * The output will then vary if the object has inherited properties.
 *
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
  constructor(arg){
    if (arg === undefined){
      this.ingredients = {}
    } else if (typeof arg === "string"){ //check if string
      this.ingredients = JSON.parse(arg).ingredients;
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

  getPrice(){
    return Object.values(this.ingredients)
          .reduce((p,c) => p + c.price, 0);
  }

  count(property){
    return (Object.values(this.ingredients)
      .filter(x => x[property] !== undefined)).length
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

// inte klar
console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 2: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));


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

// console.log("\n--- Assignment 5 ---------------------------------------");
/*
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
*/
console.log("\n--- Assignment 6 ---------------------------------------");
/*
console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);
*/

/**
 * Reflection question 4
 */
/**
 * Reflection question 5
 */
/**
 * Reflection question 6
 */
