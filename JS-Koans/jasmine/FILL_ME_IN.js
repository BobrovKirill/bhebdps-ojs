var FILL_ME_IN = "Fill this value in";
describe("About Arrays (about_arrays.js)", function() {
    it("array literal syntax and indexing", function() {
        let emptyArray = [];
        expect(typeof emptyArray).toBe("object");
        expect(emptyArray.length).toBe(0);

        let multiTypeArray = [0, 1, "two", function () { return 3; }, {value1: 4, value2: 5}, [6, 7]];
        expect(multiTypeArray[0]).toBe(0);
        expect(multiTypeArray[2]).toBe("two");
        expect(multiTypeArray[3]()).toBe(3);
        expect(multiTypeArray[4].value1).toBe(4);
        expect(multiTypeArray[4]["value2"]).toBe(5);
        expect(multiTypeArray[5][0]).toBe(6);
    });

    it("understand array literals", function () {
        let array = [];
        expect(array).toEqual([]);

        array[0] = 1;
        expect(array).toEqual([1]);

        array[1] = 2;
        expect(array).toEqual([1, 2]);

        array.push(3);
        expect(array).toEqual([1, 2, 3]);
    });

    it("length", function() {
        let fourNumberArray = [1, 2, 3, 4];

        expect(fourNumberArray.length).toBe(4);
        fourNumberArray.push(5, 6);
        expect(fourNumberArray.length).toBe(6);

        let tenEmptyElementArray = new Array(10);
        expect(tenEmptyElementArray.length).toBe(10);

        tenEmptyElementArray.length = 5;
        expect(tenEmptyElementArray.length).toBe(5);
    });

    it("slice", function () {
        let array = ["peanut", "butter", "and", "jelly"];

        expect(array.slice(0, 1)).toEqual(["peanut"]);
        expect(array.slice(0, 2)).toEqual(["peanut", "butter"]);
        expect(array.slice(2, 2)).toEqual([]);
        expect(array.slice(2, 20)).toEqual(["and", "jelly"]);
        expect(array.slice(3, 0)).toEqual([]);
        expect(array.slice(3, 100)).toEqual(["jelly"]);
        expect(array.slice(5, 1)).toEqual([]);
    });

    it("splice", function() {
        let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        let workingWeek = daysOfWeek.splice(0, 5);
        let weekend = daysOfWeek;

        expect(workingWeek).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
        expect(weekend).toEqual(['Saturday', 'Sunday']);
    });

    it("stack methods", function() {
        let stack = [];
        stack.push("first");
        stack.push("second");

        expect("second").toBe(stack.pop());
        expect(stack).toEqual(["first"]);
        expect("first").toBe(stack.pop());
        expect(stack).toEqual([]);
    });

    it("queue methods", function() {
        let queue = [];
        queue.push("first");
        queue.push("second");
        queue.unshift("third");

        expect("third").toBe(queue.shift());
        expect(queue).toEqual(["first", "second"]);
        expect("first").toBe(queue.shift());
        expect(queue).toEqual(["second"]);
    });

    it("should know array references", function () {
        let array = [ "zero", "one", "two", "three", "four", "five" ];

        function passedByReference(refArray) {
            refArray[1] = "changed in function";
        }
        passedByReference(array);
        expect(array[1]).toBe("changed in function");

        let assignedArray = array;
        assignedArray[5] = "changed in assignedArray";
        expect(array[5]).toBe("changed in assignedArray");

        let copyOfArray = array.slice();
        copyOfArray[3] = "changed in copyOfArray";
        expect(array[3]).toBe("three");
    });
});

describe("About Objects (about_objects.js)", function() {
    it("object type", function() {
        let emptyObject = {};
        expect("object").toBe(typeof emptyObject);
    });

    it("object literal notation", function() {
        let person = {
            name: "Amory Blaine",
            age: 102
        };
        expect("Amory Blaine").toBe(person.name);
        expect(102).toBe(person.age);
    });

    it("dynamically adding properties", function() {
        let person = {};
        person.name = "Amory Blaine";
        person.age = 102;
        expect("Amory Blaine").toBe(person.name);
        expect(102).toBe(person.age);
    });

    it("adding properties from strings", function() {
        let person = {};
        person["name"] = "Amory Blaine";
        person["age"] = 102;
        expect("Amory Blaine").toBe(person.name);
        expect(102).toBe(person.age);
    });

    it("adding functions", function() {
        let person = {
            name: "Amory Blaine",
            age: 102,
            toString: function() {
                return "I " + this.name + " am " + this.age + " years old.";
            }
        };
        expect("I Amory Blaine am 102 years old.").toBe(person.toString());
    });

    it("property enumeration", function() {
        let keys = [];
        let values = [];
        let person = {name: 'Amory Blaine', age: 102, unemployed: true};
        for(let propertyName in person) {
            keys.push(propertyName);
            values.push(person[propertyName]);
        }
        expect(keys).toEqual(['name', 'age', 'unemployed']);
        expect(values).toEqual(['Amory Blaine', 102, true]);
    });
});

describe("About Applying What We Have Learnt (about_applying_what_we_have_learnt.js)", function() {

    let products;

    beforeEach(function () {
        products = [
            { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
            { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
            { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
            { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
            { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
        ];
    });

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
        let hasMushrooms;
        let productsICanEat = [];

        for (let i = 0; i < products.length; i+=1) {
            if (products[i].containsNuts === false) {
                hasMushrooms = false;
                for (let j = 0; j < products[i].ingredients.length; j+=1) {
                    if (products[i].ingredients[j] === "mushrooms") {
                        hasMushrooms = true;
                    }
                }

                if (!hasMushrooms) {
                    productsICanEat.push(products[i]);
                }
            }
        }

        expect(productsICanEat.length).toBe(1); // Только Pizza Primavera подходит
    });

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
        let sum = 0;
        for(let i = 1; i < 1000; i += 1) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }

        expect(sum).toBe(233168); // Сумма всех чисел кратных 3 или 5 до 1000
    });

    it("should count the ingredient occurrence (imperative)", function () {
        let ingredientCount = { "{ingredient name}": 0 };

        for (let i = 0; i < products.length; i+=1) {
            for (let j = 0; j < products[i].ingredients.length; j += 1) {
                ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
            }
        }

        expect(ingredientCount['mushrooms']).toBe(2); // Грибы встречаются в Sonoma и South Of The Border
    });
});

describe("About this (about_this.js)", function() {
    it("'this' inside a method", function () {
        let person = {
            name: 'bob',
            intro: function () {
                return "Hello, my name is " + this.name;
            }
        }

        expect(person.intro()).toBe("Hello, my name is bob");
    });

    it("'this' on unattached function", function () {
        let person = {
            globalName: 'bob',
            intro: function () {
                return "Hello, my name is " + this.globalName;
            }
        }

        let alias = person.intro;

        window.globalName = 'Peter';

        expect(alias()).toBe("Hello, my name is Peter");
    });

    it("'this' set explicitly", function () {
        let person = {
            name: 'bob',
            intro: function () {
                return "Hello, my name is " + this.name;
            }
        }

        let message = person.intro.call({name: "Frank"});

        expect(message).toBe("Hello, my name is Frank");
    });
});