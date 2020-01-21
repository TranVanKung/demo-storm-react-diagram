import { NodeModel } from "storm-react-diagrams";
import { DiamondPortModel } from "./DiamondPortModel";

export class DiamondNodeModel extends NodeModel {
  constructor() {
    super("diamond");
    this.addPort(new DiamondPortModel("left"));
    this.addPort(new DiamondPortModel("right"));
  }
}
