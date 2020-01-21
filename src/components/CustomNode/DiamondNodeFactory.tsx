import * as SRD from "storm-react-diagrams";
import { DiamonNodeWidget } from "./DiamondNodeWidget";
import { DiamondNodeModel } from "./DiamondNodeModel";
import * as React from "react";

export class DiamondNodeFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super("diamond");
  }

  generateReactWidget(
    diagramEngine: SRD.DiagramEngine,
    node: DiamondNodeModel
  ): JSX.Element {
    return <DiamonNodeWidget node={node} size={500} />;
  }

  getNewInstance() {
    return new DiamondNodeModel();
  }
}
