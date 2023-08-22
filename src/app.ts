console.log("Hello World!");

// Tuple
// 配列において、要素の数と型を固定することができる型
let x: [string, number];
x = ["hello", 10]; // OK
// x = [10, 'hello']; // Error

// pushは許可されてしまう点に注意
// x.push('world');

// Enum
// 以下のように定義すると、Redは0、Greenは1、Blueは2となる
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
console.log(c); // 1

//unknown
// どんな型の値でも代入できるが、使う際には型を絞り込む必要がある
let unknownValue: unknown = 10;
// let str: string = unknownValue; // Error
if (typeof unknownValue === "string") {
  let str: string = unknownValue; // OK
  console.log(str);
}

//never
// 決して何も返さない関数の戻り値の型として使われる
function error(message: string): never {
  throw new Error(message);
}
