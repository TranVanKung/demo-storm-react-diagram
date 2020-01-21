import * as SRD from "storm-react-diagrams";
import { CustomNodeWidget } from "./CustomNodeWidget";
import CustomNodeModel from "./CustomNodeModel";
import * as React from "react";

class CustomNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super("custom-node");
  }

  generateReactWidget(
    diagramEngine: SRD.DiagramEngine,
    node: CustomNodeModel
  ): JSX.Element {
    return <CustomNodeWidget node={node} size={500} />;
  }

  getNewInstance() {
    return new CustomNodeModel();
  }
}

export default CustomNodeFactory;
