// console.log("hello dude!")

// const dude = {name: "wille", age: 23, cool: true}
// console.log(dude);

// const dude2 = Object()

// dude2.name = "Swollo"
// dude2.sad = true

// console.log(dude2);

// // object constructors

// // blueprint

// function Person(name, age, sad, happy) {
//  this.name = name;
//  this.age = age;
//  this.sad = sad;
//  this.happy = happy;
// }

// let person1 = new Person("Wille", 23, "goody")

// let names = Object.keys(person1)

// console.log(Object.keys(person1));

// names
//     .sort((a,b) =>  a>b)
//     .forEach(name => console.log(name))


// Q2

    const parent = {
        a: {type:"long", price: "10"},
        b: 2
     };
   
     const child = Object.create(parent);
     child.c = 3;
     child.d = 4;

    //  console.log(Object.getPrototypeOf(child)); //inherited properties
    //  console.log(child) //own properties

     Object.keys(child)
        .forEach(prop => console.log(prop))

        console.log("----")

        for (const x in child){
            console.log(x);
        }

// let arr = [...Array(10)]
//     .map((v, i) => i+1)
//     .reduce((p, v) => p+v )

// console.log(arr);

// parent.Gurka.amount = 30
// parent.Gurka.amount +=10
// console.log(parent);

// console.log(parent.hasOwnProperty("Gurka"));