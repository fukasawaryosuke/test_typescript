//交差型
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Admin, Employee {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// console.log(e1);

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric; //number

//型ガード
function add2(a: number, b: number): number; // 関数オーバーロード
function add2(a: string, b: string): string; // 関数オーバーロード
function add2(a: string, b: number): string; // 関数オーバーロード
function add2(a: number, b: string): string; // 関数オーバーロード
function add2(a: Combinable, b: Combinable) {
  //型ガード
  //typeofで型をチェックする
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add2("Max", " Schwarz");
result.split(" ");

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  //型ガード
  //オブジェクトにプロパティがあるかどうかをチェックする
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

//型ガード
//インスタンスがあるかどうかをチェックする
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // 型ガード
  // if ("loadCargo" in vehicle) {
  //   vehicle.loadCargo(1000);
  // }
  // if (vehicle instanceof Truck) {
  //   vehicle.loadCargo(1000);
  // }

  //型ガード
  //instanceofでインスタンスがあるかどうかをチェックする
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

//判別可能なunion型
interface Bird {
  type: "bird"; //リテラル型
  flyingSpeed: number;
}

interface Horse {
  type: "horse"; //リテラル型
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  //型ガード
  //switch文で型をチェックする
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//型キャスト
// const userInputElement = document.getElementById("user-input") as HTMLInputElement;
// userInputElement.value = "Hi there!";

//reactの場合、jsxのため下記の書き方は使えない
// const userInputElement = <HTMLInputElement>document.getElementById("user-input");
// userInputElement.value = "Hi there!";

const userInputElement = document.getElementById("user-input");
if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there!";
}

//インデックス型(index signature)
interface ErrorContainer {
  // { email: 'Not a valid email', username: 'Must start with a character!' }

  // インデックス型
  // id: number;はエラーになる
  [key: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};

//オプショナルチェイニング
const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData?.job?.title);
console.log(fetchedUserData.job && fetchedUserData.job.title);

// NULL合体演算子(Nullish Coalescing)
const userInput = null;

//falthyな値の場合はDEFAULTになってしまう
const storedData = userInput || "DEFAULT"; //空文字や0の場合もDEFAULTになってしまう
//nullまたはundefinedの場合はDEFAULTになる
const storedData2 = userInput ?? "DEFAULT"; //空文字や0の場合はDEFAULTにならない
