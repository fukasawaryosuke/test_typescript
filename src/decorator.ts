//デコレータ
//クラスデコレータ
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

// デコレータファクトリ
// デコレータを動的に生成することができる
function Logger2(logString: string) {
  //constructorを使わない場合は_を使う
  return function (_: Function) {
    console.log(logString);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (constructor: any) {
    console.log("Rendering template");
    // ここでテンプレートを生成する
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

//デコレータはクラスを定義する時に実行される!
// @Logger
@Logger2("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person2 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person2();

// console.log(pers);

//Angularのコンポーネントはデコレータを使っている
