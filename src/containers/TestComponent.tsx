import React, { Component } from "react";
import * as SRD from "storm-react-diagrams";

const engine = new SRD.DiagramEngine();
engine.installDefaultFactories();

// 2) setup the diagram model
const model = new SRD.DiagramModel();

// 3) create a default node
const node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
const port1 = node1.addOutPort("Out");
node1.setPosition(100, 100);

// 4) create another default node
const node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
const port2 = node2.addInPort("In");
node2.setPosition(400, 100);

node2.addListener({
  selectionChanged: () => console.log("haha")
});

// 5) link the ports
const link1 = port1.link(port2);
(link1 as SRD.DefaultLinkModel).addLabel("Hello World");

// 6) add the models to the root graph
model.addAll(node1, node2, link1);

// 7) load model into engine
engine.setDiagramModel(model);

class App extends Component {
  render() {
    return (
      <div className="app">
        <SRD.DiagramWidget diagramEngine={engine} />
      </div>
    );
  }
}

export default App;
