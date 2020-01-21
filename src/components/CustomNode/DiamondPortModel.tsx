import _ from "lodash";
import {
  LinkModel,
  DiagramEngine,
  PortModel,
  DefaultLinkModel,
  DefaultPortModel
} from "storm-react-diagrams";

export class DiamondPortModel extends PortModel {
  position: string | "top" | "bottom" | "left" | "right";

  constructor(pos: string = "top") {
    super(pos, "diamond");
    this.position = pos;
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position
    });
  }

  deSerialize(data: any, engine: DiagramEngine) {
    super.deSerialize(data, engine);
    this.position = data.position;
  }

  link(port: PortModel): LinkModel {
    let link = this.createLinkModel();
    link.setSourcePort(this);
    link.setTargetPort(port);
    return link;
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }
}
