import { NodeModel } from "storm-react-diagrams";
import DiamondPortModel from "./CustomPortModel";

class CustomNodeModel extends NodeModel {
  constructor() {
    super("custom-node");
    this.addPort(new DiamondPortModel("left"));
    this.addPort(new DiamondPortModel("right"));
  }
}

export default CustomNodeModel;
