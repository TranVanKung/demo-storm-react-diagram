import React, { Component } from "react";
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DiagramWidget
} from "storm-react-diagrams";

const generateNodes = (
  model: DiagramModel,
  offsetX: number,
  offsetY: number
) => {
  // create default node
  var node1 = new DefaultNodeModel("Node 1", "rgb(0, 192, 255)");
  const port1 = node1.addOutPort("Out");
  node1.setPosition(100 + offsetX, 100 + offsetY);

  // create another default node
  const node2 = new DefaultNodeModel("Node 2", "rgb(192, 255, 0");
  const port2 = node2.addInPort("In");
  node2.setPosition(200 + offsetY, 100 + offsetY);

  // link the 2 nodes together
  const link1 = port1.link(port2);

  // add the models to the root graph
  model.addAll(node1, node2, link1);
};

export default () => {
  // set up the diagram engine
  const engine = new DiagramEngine();
  engine.installDefaultFactories();

  // set up the diagram model
  const model = new DiagramModel();

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      generateNodes(model, i * 200, j * 100);
    }
  }

  // load model into engine
  engine.setDiagramModel(model);

  return <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />;
};
