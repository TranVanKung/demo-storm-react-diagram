import React, { Component } from "react";
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DiagramWidget
} from "storm-react-diagrams";
import { DemoWorkspaceWidget } from "../DemoWorkSpaceWidget";

class NodeDelayedPosition extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  updatePosition = () => {
    const engine = new DiagramEngine();
    let model = engine.getDiagramModel();
    const nodes = model.getNodes();
    let node = nodes[Object.keys(nodes)[0]];
    node.setPosition(node.x + 30, node.y + 30);
    this.forceUpdate();
  };

  updatePositionViaSerialize = () => {
    const { engine } = this.props;
    let model = engine.getDiagramModel();
    let str = JSON.stringify(model.serializeDiagram());
    let model2 = new DiagramModel();
    let obj = JSON.parse(str);
    let node = obj.nodes[0];
    node.x += 30;
    node.y += 30;
    model2.deSerializeDiagram(obj, engine);
    engine.setDiagramModel(model2);
    this.forceUpdate();
  };

  render() {
    const { engine } = this.props;

    return (
      <DemoWorkspaceWidget
        buttons={[
          <button key={1} onClick={this.updatePosition}>
            Update position
          </button>,
          <button key={2} onClick={this.updatePositionViaSerialize}>
            Update position via serialize
          </button>
        ]}
      >
        <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />
      </DemoWorkspaceWidget>
    );
  }
}

export default () => {
  const engine = new DiagramEngine();
  engine.installDefaultFactories();

  const model = new DiagramModel();

  const node1 = new DefaultNodeModel("Node 1", "rgb(0, 192, 255)");
  const port1 = node1.addOutPort("Out");
  node1.setPosition(100, 100);

  const node2 = new DefaultNodeModel("Node 2", "rgb(192, 255, 0)");
  const port2 = node2.addInPort("In");
  node2.setPosition(400, 100);

  const link1 = port1.link(port2);

  model.addAll(node1, node2, link1);

  engine.setDiagramModel(model);

  return <NodeDelayedPosition engine={engine} model={model} />;
};
