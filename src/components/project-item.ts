import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { autobind } from "../decorators/autobind";
import { Component } from "./base-component";

//ProjectItem class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  get manday() {
    if (this.project.manday < 20) {
      return `${this.project.manday}人日`;
    } else {
      return `${this.project.manday / 20}人月`;
    }
  }

  constructor(hostId: string, private project: Project) {
    super("single-project", hostId, false, project.id);
    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    //dataTransferオブジェクトにデータをセットする
    event.dataTransfer!.setData("text/plain", this.project.id);
    //ドラッグ中のカーソルの形を変更する
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent) {
    // console.log("dragEnd");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.manday.toString();
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
