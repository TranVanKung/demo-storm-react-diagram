import * as SRD from "storm-react-diagrams";
import CustomNodeModel from "./CustomNode/CustomNodeModel";
import CustomNodeFactory from "./CustomNode/CustomNodeFactory";
import CustomPortModel from "./CustomNode/CustomPortModel";
import CustomPortFactory from "./CustomNode/CustomPortFactory";
import { DefaultLinkModel } from "storm-react-diagrams";
import { CustomLinkModel } from "./CustomNode/CustomLinkModel";
import { CustomLinkFactory } from "./CustomNode/CustomLinkFactory";

class MainEngine {
  protected mainModel: SRD.DiagramModel;
  protected mainEngine: SRD.DiagramEngine;

  constructor() {
    this.mainEngine = new SRD.DiagramEngine();
    this.mainEngine.installDefaultFactories();
    // register custome port and node factory
    this.mainEngine.registerPortFactory(
      new CustomPortFactory("custom-node", config => new CustomPortModel())
    );
    this.mainEngine.registerNodeFactory(new CustomNodeFactory());
    this.mainEngine.registerLinkFactory(new CustomLinkFactory());

    this.newModel();
  }

  public newModel(newModel?: SRD.DiagramModel) {
    this.mainModel = new SRD.DiagramModel();
    this.mainModel.setGridSize(5);
    this.mainEngine.setDiagramModel(this.mainModel);

    //3-A) create a default node
    var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
    let port = node1.addOutPort("Out");
    node1.setPosition(100, 150);

    const customNode1 = new CustomNodeModel();
    customNode1.setPosition(250, 110);

    // link the ports
    const link1 = port.link(customNode1.getPort("left"));
    (link1 as CustomLinkModel).addLabel("with parameter");

    const allNodeOfModel = this.mainModel.addAll(node1, link1, customNode1);

    allNodeOfModel.forEach(node => {
      node.addListener({
        selectionChanged: event => console.log("event click", event),
        entityRemoved: event => console.log("event remove", event)
      });
    });
  }

  public getActiveDiagram(): SRD.DiagramModel {
    return this.mainModel;
  }

  public setActiveDiagram(newModel: SRD.DiagramModel): void {
    console.log("set active", newModel);
    this.mainModel = newModel;
    this.mainEngine.setDiagramModel(newModel);
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.mainEngine;
  }
}

export default MainEngine;
