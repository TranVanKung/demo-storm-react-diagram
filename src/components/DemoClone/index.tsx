import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  NodeModel,
  DiagramWidget,
  BaseModel
} from "storm-react-diagrams";
import _ from "lodash";
import React, { Component } from "react";
import { DemoWorkspaceWidget } from "../DemoWorkSpaceWidget";

class CloneSelected extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  cloneSelected = () => {
    const { engine } = this.props;
    const offset = { x: 100, y: 100 };
    const model = engine.getDiagramModel();

    const itemMap = {};
    _.forEach(model.getSelectedItems(), (item: BaseModel<any>) => {
      const newItem = item.clone(itemMap);

      // offset the nodes slightly
      if (newItem instanceof NodeModel) {
        newItem.setPosition(newItem.x + offset.x, newItem.y + offset.y);
        model.addNode(newItem);
      } else if (newItem instanceof LinkModel) {
        //   offset the link points
        newItem.getPoints().forEach(point => {
          point.updateLocation({
            x: point.getX() + offset.x,
            y: point.getY() + offset.y
          });
        });

        model.addLink(newItem);
      }

      newItem.selected = false;
    });

    this.forceUpdate();
  };

  render() {
    const { engine } = this.props;

    return (
      <DemoWorkspaceWidget
        buttons={<button onClick={this.cloneSelected}>Copy</button>}
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

  const node1 = new DefaultNodeModel("Node 1", "rgba(0, 192, 255)");
  const port = node1.addOutPort("Out");
  node1.setPosition(100, 100);

  const node2 = new DefaultNodeModel("Node 2", "rgba(192, 255, 0");
  const port2 = node2.addInPort("In");
  node2.setPosition(400, 100);

  const link1 = port.link(port2);

  model.addAll(node1, node2, link1);

  engine.setDiagramModel(model);

  return <CloneSelected engine={engine} model={model} />;
};
