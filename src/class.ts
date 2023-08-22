abstract class Department {
  // private id: string;
  // name: string;
  protected employees: string[] = [];

  //プロパティ初期化の省略記法
  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
  }

  abstract describe(this: Department) : void;

  addName(name: string) {
    this.name = name;
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe() {
    console.log("IT部門 - ID: " + this.id);
  }
}

class accountingDepartment extends Department {
  lastReport: string;
  private static instance: accountingDepartment;

  //シングルトンパターン
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (accountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new accountingDepartment("d2", []);
    return this.instance;
  }

  // getter
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("レポートが見つかりません。");
  }

  // setter
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("正しい値を設定してください。");
    }
    this.addReport(value);
  }

  describe() {
    console.log("会計部門 - ID: " + this.id);
  }

  addReport(text: string) {
    this.reports.push(text);
  }

  printReports() {
    console.log(this.reports);
  }

  // オーバーライド
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }
}

// const accounting = new Department("d1","Accounting");
// const accountingCopy = { name: "DUMMY", describe: accounting.describe };
// accountingCopy.describe();

const it = new ITDepartment("d1", ["Max"]);
it.addEmployee("Max");
it.addEmployee("Manu");
// it.describe();
// it.printEmployeeInformation();

// const accounting = new accountingDepartment("d2", []);
//一度インスタンス化したら、インスタンス化したものを使い回す
const accounting = accountingDepartment.getInstance();
accounting.mostRecentReport = "通期会計レポート";
accounting.addReport("Something went wrong...");
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
// accounting.describe();
// accounting.printReports();
// accounting.printEmployeeInformation();
