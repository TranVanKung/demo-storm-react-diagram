import React from "react";
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DiagramWidget
} from "storm-react-diagrams";

export default () => {
  const engine = new DiagramEngine();
  engine.installDefaultFactories();

  const model = new DiagramModel();
  model.setGridSize(10);

  const node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
  const port = node1.addOutPort("Out");
  node1.setPosition(100, 100);

  const node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
  const port2 = node2.addInPort("In");
  node2.setPosition(400, 100);

  const link = port.link(port2);

  model.addAll(node1, node2, link);

  engine.setDiagramModel(model);

  return <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />;
};
