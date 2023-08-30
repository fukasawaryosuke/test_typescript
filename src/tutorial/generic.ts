//ジェネリック型とは
//追加の型情報を提供できる型

//ジェネリック型:配列
const names: Array<string> = []; //string[]と同じ
// stringのメソッドが使える
// names[0].split(" ");

//ジェネリック型:Promise
const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});

promise.then((data) => {
  //stringのメソッドが使える
  data.split(" ");
});

//独自のジェネリック型

//ジェネリック型を使わない場合
// function merge(objA: {}, objB: {}) {
//   return Object.assign(objA, objB);
// }

// mergedObjの型は{}になってしまう！
// const mergedObj = merge({ name: "Max" }, { age: 30 });
// mergedObj.nameにアクセスできない
// mergedObj.name = "Maximilian";

//ジェネリック型を使う場合
function merge<T extends {}, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// mergedObjの型は{name: string, age: number}になる！
const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
const mergedObj2 = merge({ name: "Max" }, { age: 30 });
// mergedObj.nameにアクセスできる
mergedObj.name = "Maximilian";
mergedObj.age = 30;

//ジェネリック型:制約
function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// objectでないものを渡すとエラーになる
// merge2("aaa", "bbb");

//ジェネリック型:制約2
interface Lengthy {
  length: number;
}

//引数を柔軟にする
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there!"));
console.log(countAndDescribe(["Sports", "Cooking"]));
console.log(countAndDescribe([]));

//ジェネリック型:キー制約
//keyofでオブジェクトのキーを取得できる
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

//エラーになる
// console.log(extractAndConvert({}, "name"));
console.log(extractAndConvert({ name: "Max" }, "name"));

//ジェネリック型:クラス
//クラスのジェネリック型はインスタンス化時に指定する
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    // オブジェクトを渡すとindexOfで見つからない
    // 要素がみつからない場合は-1を返す
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); //indexOfは===で比較する
  }

  getItems() {
    return [...this.data];
  }
}

//高い柔軟性と型安全性を両立できる
const textStorage = new DataStorage<string>();
textStorage.addItem("Max");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);

// オブジェクトを渡すとエラーになる
// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Manu" });
// objStorage.removeItem({ name: "Max" });
// console.log(objStorage.getItems());

//ジェネリック型は関数を呼び出すタイミングやクラスをインスタンス化するタイミングで型を指定する

//ジェネリック型:ユーティリティ型
//Partial
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

//全てのプロパティをオプショナルにする
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  //エラーになる
  // let courseGoal = {}
  // let courseGoal: CourseGoal = {};

  // CourseGoalのすべてのプロパティをオプションプロパティにするため、{}を代入できる
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  // Partial<CourseGoal>をCourseGoalに変換する
  return courseGoal as CourseGoal;
}

//Readonly
const names2: Readonly<string[]> = ["Max", "Anna"];
//エラーになる
// names2.push("Manu");
