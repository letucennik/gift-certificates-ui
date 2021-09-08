'use strict';

/**
 * You must return a date that comes in a predetermined number of seconds after 01.06.2020 00:00:002020
 * @param {number} seconds
 * @returns {Date}
 *
 * @example
 *      31536000 -> 01.06.2021
 *      0 -> 01.06.2020
 *      86400 -> 02.06.2020
 */
 function secondsToDate(seconds) {
    let date = new Date(2020, 5, 1, 0, 0, 0);
    date.setSeconds(seconds);
    return date.toLocaleDateString("ru");
}

/**
 * You must create a function that returns a base 2 (binary) representation of a base 10 (decimal) string number
 * ! Numbers will always be below 1024 (not including 1024)
 * ! You are not able to use parseInt
 * @param {number} decimal
 * @return {string}
 *
 * @example
 *      5 -> "101"
 *      10 -> "1010"
 */
 function toBase2Converter(decimal) {
    return (decimal >>> 0).toString(2);
}

/**
 * You must create a function that takes two strings as arguments and returns the number of times the first string
 * is found in the text.
 * @param {string} substring
 * @param {string} text
 * @return {number}
 *
 * @example
 *      'a', 'test it' -> 0
 *      't', 'test it' -> 2
 *      'T', 'test it' -> 2
 */
 function substringOccurrencesCounter(substring, text) {
    return text.toLowerCase().split(substring.toLowerCase()).length-1;
}

/**
 * You must create a function that takes a string and returns a string in which each character is repeated once.
 *
 * @param {string} string
 * @return {string}
 *
 * @example
 *      "Hello" -> "HHeelloo"
 *      "Hello world" -> "HHeello  wworrldd" // o, l is repeated more then once. Space was also repeated
 */
function repeatingLitters(string) {
    let result = "";
  for (let i = 0; i < string.length; i++) {
    let element = string[i];
    result += element;
    if (string.indexOf(element) == string.lastIndexOf(element)) {
      result += element;
    }
  }
  return result;
}

/**
 * You must write a function redundant that takes in a string str and returns a function that returns str.
 * ! Your function should return a function, not a string.
 *
 * @param {string} str
 * @return {function}
 *
 * @example
 *      const f1 = redundant("apple")
 *      f1() ➞ "apple"
 *
 *      const f2 = redundant("pear")
 *      f2() ➞ "pear"
 *
 *      const f3 = redundant("")
 *      f3() ➞ ""
 */
 function redundant(str) {
    return ()=>{
    	return str;
    }
}

/**
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi
 *
 * @param {number} disks
 * @return {number}
 */
function towerHanoi(disks) {
    let count = 0;
    function stepsToSolve(disks) {
      let source = "A";
      let destination = "C";
      let buffer = "B";
      if (disks >= 1) {
        stepsToSolve(disks - 1, source, buffer, destination);
        stepsToSolve(disks - 1, source, destination, source);
        count++;
      }
      return;
    }
    stepsToSolve(disks);
    return count;
}

/**
 * You must create a function that multiplies two matricies (n x n each).
 *
 * @param {array} matrix1
 * @param {array} matrix2
 * @return {array}
 *
 */
function matrixMultiplication(matrix1, matrix2) {
  let rowsM1 = matrix1.length;
  let colsM1 = matrix1[0].length;
  let rowsM2 = matrix2.length;
  let colsM2 = matrix2[0].length;
  let result = [];
  if (colsM1 != rowsM2) {
    return result;
  }
  for (let i = 0; i < rowsM1; i++) {
    result[i] = [];
  }
  for (let k = 0; k < colsM2; k++) {
    for (let i = 0; i < rowsM1; i++) {
      let t = 0;
      for (var j = 0; j < rowsM2; j++) {
        t += matrix1[i][j] * matrix2[j][k];
      }
      result[i][k] = t;
    }
  }
  return result;
}

/**
 * Create a gather function that accepts a string argument and returns another function.
 * The function calls should support continued chaining until order is called.
 * order should accept a number as an argument and return another function.
 * The function calls should support continued chaining until get is called.
 * get should return all of the arguments provided to the gather functions as a string in the order specified in the order functions.
 *
 * @param {string} str
 * @return {string}
 *
 * @example
 *      gather("a")("b")("c").order(0)(1)(2).get() ➞ "abc"
 *      gather("a")("b")("c").order(2)(1)(0).get() ➞ "cba"
 *      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()  ➞ "hello"
 */
 function gather(str) {
    let text = [str];
    let indexes = [];
    let add = function (char) {
      text.push(char);
      return add;
    };
    add.order = function (index) {
      indexes.push(index);
      return add.order;
    };
    add.order.get = function () {
      let result = [];
      indexes.forEach(element => {
        result.push(text[element]);  
      });
      return result.join("");
    };
    return add;
  }

  module.exports = {
    secondsToDate,
    toBase2Converter,
    substringOccurrencesCounter,
    repeatingLitters,
    redundant,
    towerHanoi,
    matrixMultiplication,
    gather,
  };