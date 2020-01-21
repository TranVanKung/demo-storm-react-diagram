import React, { Component } from "react";
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DiagramWidget
} from "storm-react-diagrams";
import { DemoWorkspaceWidget } from "../DemoWorkSpaceWidget";

export default () => {
  const engine = new DiagramEngine();
  engine.installDefaultFactories();

  const model = new DiagramModel();

  const node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
  const port1 = node1.addOutPort("Out");
  node1.setPosition(100, 100);

  //3-B) create another default node
  const node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
  const port2 = node2.addInPort("In");
  node2.setPosition(400, 100);

  const link1 = port1.link(port2);

  model.addAll(node1, node2, link1);

  engine.setDiagramModel(model);

  //   serializing
  const str = JSON.stringify(model.serializeDiagram());

  console.log("test", model.serializeDiagram());

  //   deserailzing
  const model2 = new DiagramModel();
  model2.deSerializeDiagram(JSON.parse(str), engine);
  engine.setDiagramModel(model2);

  return (
    <DemoWorkspaceWidget
      buttons={
        <button
          onClick={() => {
            model2.serializeDiagram();
          }}
        >
          Serialize Graph
        </button>
      }
    >
      <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />
    </DemoWorkspaceWidget>
  );
};
