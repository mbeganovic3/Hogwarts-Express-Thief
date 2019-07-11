/**
 * Author: Meris Beganovic 
 *
 * ONYEN: merisb
 *
 * UNC Honor Pledge: I certify that no unauthorized assistance has been received
 * or given in the completion of this work. I certify that I understand and
 * could now rewrite on my own, without assistance from course staff,
 * the problem set code I am submitting.
 */

import { print, csvToList } from "introcs";
import { List, cons, first, rest, listify } from "introcs/list";

class Car {
    carriage: number = 0;
    person: string = "";
    color: string = "";
    topHatch: boolean = false;
    weapon: string = "";
    note: string = "";
}
 
export let main = async () => {
   let data: List<Car> = await csvToList("Hogwarts Crime Data", Car);
   print(data);
   // TODO: Your function calls go inside of this block
   let filtered: List<Car> = filterYellow(data);
   print(filtered);

   print(nth(data, 4));

   let clue1: string = findClue1(data);
   print("Clue 1: " + clue1);

   print(sum(listify(1, 2, 3))); // Prints 6

   print(count(listify(1, 2, 3))); // Prints 3

   print(average(listify(1, 2, 3))); // Prints 2

   filtered = filterAboveCarriage(data, 20);
   print(filtered); // Only displays cars whose carriage property is greater than 20

   filtered = filterByColor(data, "blue");
   print(filtered); // Only displays cars whose color property is blue

   let carriageNumbers: List<number> = mapToCarriage(data);
   print(carriageNumbers); // Only displays the carriage numbers of each Car

   let clue2: string = findClue2(data);
   print("Clue 2:" + clue2);

   let thief: string = findThief(data);
   print("Thief: " + thief);
};
 
// TODO: Define your functions here
export let filterYellow = (carriages: List<Car>): List<Car> => {
    if (carriages === null) {
        return null;
    } else {
        let carriage: Car = first(carriages); 
        if (carriage.color === "yellow") {
            return cons(carriage, filterYellow(rest(carriages)));
        } else {
            return filterYellow(rest(carriages));
        }
    }
};

export let nth = (carriages: List<Car>, i: number): Car => {
    if (carriages === null) {
        throw new Error("index does not exist");
    } else {
        if (i === 0) {
            return first(carriages);
        } else {
            return nth(rest(carriages), i - 1);
        } 
    }
};

export let findClue1 = (carriages: List<Car>): string => {
    let carriage: Car = nth(filterYellow(carriages), 4);
    return carriage.note;
};       

export let sum = (list: List<number>): number => {
    if (list === null) {
        return 0;
    } else {
        return first(list) + sum(rest(list));
    }
};

export let count = (list: List<number>): number => {
    if (list === null) {
        return 0;
    } else {
        return 1 + count(rest(list));
    }
};

export let average = (list: List<number>): number => {
    return sum(list) / count(list);
};

export let filterAboveCarriage = (carriages: List<Car>, carriageNumber: number): List<Car> => {
    if (carriages === null) {
        return null;
    } else {
        let carriage: Car = first(carriages);
        if (carriage.carriage > carriageNumber) {
            return cons(carriage, filterAboveCarriage(rest(carriages), carriageNumber));
        } else {
            return  filterAboveCarriage(rest(carriages), carriageNumber);
        }
    }
};

export let filterByColor = (carriages: List<Car>, color: string): List<Car> => {
    if (carriages === null) {
        return null;
    } else {
        let carriage = first(carriages);
        if (carriage.color === color) {
            return cons(carriage, filterByColor(rest(carriages), color));
        } else {
            return filterByColor(rest(carriages), color);
        }
    }
};

export let mapToCarriage = (carriages: List<Car>): List<number> => {
    if (carriages === null) {
        return null;
    } else {
        let carriage = first(carriages);
        return cons(carriage.carriage, mapToCarriage(rest(carriages))); 
}
};

export let findClue2 = (carriages: List<Car>): string => {
    let blueCarriage = first(filterByColor(carriages, "blue"));
    let averageCarriages: number = average(mapToCarriage(carriages));
    if (blueCarriage.carriage > averageCarriages) {
        return blueCarriage.note;
    } else {
        return findClue2(rest(carriages));
    }
};

export let filterWeapon = (carriages: List<Car>, weapon: string): boolean => {
    if (carriages === null) {
        return false; 
    } else {
        if (first(carriages).weapon.includes(weapon)) {
            return true;
        } else { 
            return filterWeapon(rest(carriages), weapon);
        }
}
};

export let filterTopHatch = (carriages: List<Car>, hatch: boolean): boolean => {
    if (carriages === null) {
        return false; 
    } else {
        if (first(carriages).topHatch === hatch) {
            return true;
        } else { 
            return filterTopHatch(rest(carriages), hatch);
        }
}
};
export let findThief = (carriages: List<Car>): string => {
    let carriage = first(carriages);
    if (carriage.weapon.includes("humor") && carriage.topHatch === true) {
        return carriage.person;
    } else {
        return findThief(rest(carriages));
    }
};

main();