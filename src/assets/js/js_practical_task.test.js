const {
    secondsToDate,
    toBase2Converter,
    substringOccurrencesCounter,
    repeatingLitters,
    redundant,
    towerHanoi,
    matrixMultiplication,
    gather,
  } = require("./js_practical_task");
  
  test("when add seconds to 01.06.2020 -> then return new date", () => {
    expect(secondsToDate(31536000)).toEqual(
      new Date("2021-06-01").toLocaleDateString("ru")
    );
    expect(secondsToDate(0)).toEqual(
      new Date("2020-06-01").toLocaleDateString("ru")
    );
    expect(secondsToDate(86400)).toEqual(
      new Date("2020-06-02").toLocaleDateString("ru")
    );
  });
  
  test("when pass base 10 (decimal) number -> then return base 2 number", () => {
    expect(toBase2Converter(5)).toEqual("101");
    expect(toBase2Converter(10)).toEqual("1010");
  });
  
  test("when pass substring and text -> then returns the number of times the substring is found in the text", () => {
    expect(substringOccurrencesCounter("a", "test it")).toEqual(0);
    expect(substringOccurrencesCounter("t", "test it")).toEqual(3);
    expect(substringOccurrencesCounter("T", "test it")).toEqual(3);
  });
  
  test("when pass string -> then returns a string in which each character is repeated once", () => {
    expect(repeatingLitters("Hello")).toEqual("HHeelloo");
    expect(repeatingLitters("Hello world")).toEqual("HHeello  wworrldd");
  });
  
  test("when pass string -> then returns a function that returns passed string", () => {
    expect(redundant("Hello")()).toEqual("Hello");
    expect(redundant("Hello world")()).toEqual("Hello world");
    expect(redundant("")()).toEqual("");
  });
  
  test("when pass count of disks -> then returns count of steps", () => {
    expect(towerHanoi(3)).toEqual(7);
    expect(towerHanoi(10)).toEqual(1023);
    expect(towerHanoi(1)).toEqual(1);
  });
  
  test("when pass two matricies -> then returns result of multiplies", () => {
    expect(
      matrixMultiplication(
        [
          [3, 45, 6],
          [2, 12, 0],
          [4, 6, 1],
        ],
        [
          [5, 6, 1],
          [3, 4, 7],
          [1, 6, 8],
        ]
      )
    ).toEqual([
      [156, 234, 366],
      [46, 60, 86],
      [39, 54, 54],
    ]);
  });
  
  test("when pass strings -> then returns string in defined order", () => {
    expect(gather("a")("b").order(1)(0).get()).toEqual("ba");
    expect(gather("a")("b")("c").order(0)(1)(2).get()).toEqual("abc");
    expect(gather("a")("b")("c").order(2)(1)(0).get()).toEqual("cba");
    expect(
      gather("e")("l")("o")("l")("!")("h").order(5)(0)(1)(3)(2)(4).get()
    ).toEqual("hello!");
  });