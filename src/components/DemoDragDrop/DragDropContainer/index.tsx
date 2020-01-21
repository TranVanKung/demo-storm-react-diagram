import React, { Component } from "react";
import _ from "lodash";
import {
  DefaultNodeModel,
  DiagramWidget,
  NodeModel,
  LinkModel,
  BaseModel,
  DiagramModel
} from "storm-react-diagrams";
import { Button } from "antd";
import ToolbarWidget from "./ToolbarWidget";
import { TrayItemWidget } from "./TrayItemWidget";
import MainEngine from "../MainEngine";
import CustomNodeModel from "../CustomNode/CustomNodeModel";
import { engineData } from "../engineScript.js";

export interface BodyWidgetProps {
  app: MainEngine;
}

export interface BodyWidgetState {}

class DragDropContainer extends Component<BodyWidgetProps, BodyWidgetState> {
  constructor(props: BodyWidgetProps) {
    super(props);
    this.state = {};
  }

  onCloneSelectedNode = () => {
    const { app } = this.props;
    const model = app.getDiagramEngine().getDiagramModel();
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

      if (newItem instanceof LinkModel) {
        newItem.getPoints().forEach(point => {
          point.updateLocation({
            x: point.getX() + offset.x,
            y: point.getY() + offset.y
          });
        });

        model.addLink(newItem);
      }

      newItem.selected = false;

      this.forceUpdate();
    });
  };

  onRemoveSelectedItem = () => {
    const { app } = this.props;
    const model = app.getDiagramEngine().getDiagramModel();
    const selectedItems = model.getSelectedItems();
    console.log("selected to remove", selectedItems);

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

  onDropNode = event => {
    const { app } = this.props;
    const data = JSON.parse(event.dataTransfer.getData("drag-node"));
    let node = null;

    if (data.type === "in") {
      node = new DefaultNodeModel("Stop", "rgb(192, 255, 0)");
      node.addInPort("In");
    } else if (data.type === "out") {
      node = new DefaultNodeModel("Start", "rgb(0, 192, 255)");
      node.addOutPort("Out");
    } else if (data.type === "custom-node") {
      node = new CustomNodeModel();
    }

    const points = app.getDiagramEngine().getRelativeMousePoint(event);
    node.x = points.x;
    node.y = points.y;

    app
      .getDiagramEngine()
      .getDiagramModel()
      .addNode(node);

    this.forceUpdate();
  };

  onRemoveMiddlePoint = () => {
    const { app } = this.props;
    const model = app.getDiagramEngine().getDiagramModel();
    const selectedItems = model.getSelectedItems();

    _.forEach(selectedItems, (item: BaseModel<any>) => {
      if (item instanceof LinkModel) {
        if (item.points.length > 2) {
          item.points.splice(1, item.points.length - 2);
        }
      }

      this.forceUpdate();
    });
  };

  onSaveEngine = () => {
    const { app } = this.props;

    const engineScript = JSON.stringify(
      app
        .getDiagramEngine()
        .getDiagramModel()
        .serializeDiagram()
    );

    console.log("engine script", engineScript);
  };

  onLoadEngineFromScript = () => {
    const { app } = this.props;

    const newModel = new DiagramModel();
    newModel.deSerializeDiagram(engineData, app.getDiagramEngine());
    app.setActiveDiagram(newModel);

    this.forceUpdate();
  };

  render() {
    const { app } = this.props;

    return (
      <div className="body">
        <div className="content">
          <ToolbarWidget>
            <Button
              type="primary"
              onClick={this.onLoadEngineFromScript}
              style={{ marginBottom: "15px" }}
            >
              Load engine
            </Button>

            <Button
              type="primary"
              onClick={this.onSaveEngine}
              style={{ marginBottom: "15px" }}
            >
              Save engine
            </Button>

            <Button
              type="primary"
              onClick={this.onCloneSelectedNode}
              style={{ marginBottom: "15px" }}
            >
              Clone
            </Button>

            <Button
              type="danger"
              onClick={this.onRemoveSelectedItem}
              style={{ marginBottom: "15px" }}
            >
              Remove item
            </Button>

            <Button
              type="danger"
              onClick={this.onRemoveMiddlePoint}
              style={{ marginBottom: "15px" }}
            >
              Remove point
            </Button>

            <TrayItemWidget
              model={{ type: "in" }}
              name="Stop"
              color="rgb(192, 255, 0)"
            />

            <TrayItemWidget
              model={{ type: "out" }}
              name="Start"
              color="rgb(0, 192, 255)"
            />

            <TrayItemWidget
              model={{ type: "custom-node" }}
              name="Custom node"
            />
          </ToolbarWidget>

          <div
            className="diagram-layer"
            onDrop={this.onDropNode}
            onDragOver={event => event.preventDefault()}
          >
            <DiagramWidget
              className="srd-demo-canvas"
              diagramEngine={app.getDiagramEngine()}
              deleteKeys={[]}
              maxNumberPointsPerLink={1}
              // smartRouting={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContainer;
