import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DefaultPortModel,
  DiagramWidget,
  NodeModel,
  BaseModel
} from "storm-react-diagrams";
import React, { Component } from "react";

// import the custom models
import { DiamondNodeModel } from "./DiamondNodeModel";
import { DiamondNodeFactory } from "./DiamondNodeFactory";
import { SimplePortFactory } from "./SimplePortFactory";
import { DiamondPortModel } from "./DiamondPortModel";
import { Row, Col, Button } from "antd";
import _ from "lodash";

//1) setup the diagram engine
const engine = new DiagramEngine();
engine.installDefaultFactories();

// register some other factories as well
engine.registerPortFactory(
  new SimplePortFactory("diamond", config => new DiamondPortModel())
);
engine.registerNodeFactory(new DiamondNodeFactory());

//2) setup the diagram model
const model = new DiagramModel();

//3-A) create a default node
const node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
const port1 = node1.addOutPort("Out");
node1.setPosition(100, 150);

//3-B) create our new custom node
const node2 = new DiamondNodeModel();
node2.setPosition(250, 108);

const node3 = new DefaultNodeModel("Node 3", "red");
const port3 = node3.addInPort("In");
node3.setPosition(850, 150);

//3-C) link the 2 nodes together
const link1 = port1.link(node2.getPort("left"));
// const link2 = port3.link(node2.getPort("right"));
const link2 = node2.getPort("right").link(port3);
console.log("link diamond", link2);

//4) add the models to the root graph
const allNodeOfModel = model.addAll(node1, node2, node3, link1, link2);

allNodeOfModel.forEach(node => {
  node.addListener({
    selectionChanged: event => console.log("event click", event),
    entityRemoved: event => console.log("event remove", event)
  });
});

//5) load model into engine
engine.setDiagramModel(model);

class CustomNode extends Component {
  onCloneSelectedNode = () => {
    const offset = { x: 100, y: 100 };

    const itemMap = {};
    _.forEach(model.getSelectedItems(), (item: BaseModel<any>) => {
      const newItem = item.clone(itemMap);
      console.log("new item: ", newItem);

      // offset the nodes slightly
      if (newItem instanceof NodeModel) {
        newItem.setPosition(newItem.x + offset.x, newItem.y + offset.y);
        model.addNode(newItem);
      }

      newItem.selected = false;

      this.forceUpdate();
    });
  };

  onRemoveSelectedNode = () => {
    const selectedItems = model.getSelectedItems();

    console.log(selectedItems);

    _.forEach(selectedItems, (item: BaseModel<any>) => {
      if (item instanceof NodeModel) {
        model.removeNode(item);
      }

      if (item instanceof LinkModel) {
        model.removeLink(item);
      }

      console.log("model", model.serializeDiagram());
      this.forceUpdate();
    });
  };

  render() {
    return (
      <Row type="flex" justify="space-between">
        <Col span={3}>
          <div className="toolbar">
            <Button
              type="primary"
              onClick={this.onCloneSelectedNode}
              style={{ marginBottom: "15px" }}
            >
              Clone
            </Button>

            <Button
              type="danger"
              onClick={this.onRemoveSelectedNode}
              style={{ marginBottom: "15px" }}
            >
              Remove
            </Button>
          </div>
        </Col>

        <Col span={21}>
          <DiagramWidget
            className="srd-demo-canvas"
            diagramEngine={engine}
            deleteKeys={[]}
            // smartRouting={true}
            maxNumberPointsPerLink={0}
          />
        </Col>
      </Row>
    );
  }
}

export default CustomNode;
