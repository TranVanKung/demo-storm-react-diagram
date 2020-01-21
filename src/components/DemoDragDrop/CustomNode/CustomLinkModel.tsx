/**
 * @author Dylan Vorster
 */
import {
  LinkModel,
  LinkModelListener,
  BaseEvent,
  DiagramEngine,
  DefaultLabelModel,
  LabelModel
} from "storm-react-diagrams";
import _ from "lodash";

export interface CustomLinkModelListener extends LinkModelListener {
  colorChanged?(
    event: BaseEvent<CustomLinkModel> & { color: null | string }
  ): void;

  widthChanged?(
    event: BaseEvent<CustomLinkModel> & { width: 0 | number }
  ): void;
}

export class CustomLinkModel extends LinkModel<CustomLinkModelListener> {
  width: number;
  color: string;
  curvyness: number;
  markers: any;

  constructor(type: string = "default") {
    super(type);
    this.color = "rgba(255,255,255,0.5)";
    this.width = 3;
    this.curvyness = 50;
    this.markers = { startMarker: false, endMarker: false };
  }

  serialize() {
    return _.merge(super.serialize(), {
      width: this.width,
      color: this.color,
      curvyness: this.curvyness
    });
  }

  deSerialize(ob, engine: DiagramEngine) {
    super.deSerialize(ob, engine);
    this.color = ob.color;
    this.width = ob.width;
    this.curvyness = ob.curvyness;
  }

  addLabel(label: LabelModel | string) {
    if (label instanceof LabelModel) {
      return super.addLabel(label);
    }
    let labelOb = new DefaultLabelModel();
    labelOb.setLabel(label);
    return super.addLabel(labelOb);
  }

  setWidth(width: number) {
    this.width = width;
    this.iterateListeners(
      (listener: CustomLinkModelListener, event: BaseEvent) => {
        if (listener.widthChanged) {
          listener.widthChanged({ ...event, width: width });
        }
      }
    );
  }

  setColor(color: string) {
    this.color = color;
    this.iterateListeners(
      (listener: CustomLinkModelListener, event: BaseEvent) => {
        if (listener.colorChanged) {
          listener.colorChanged({ ...event, color: color });
        }
      }
    );
  }

  setMarkers(startMarker: boolean, endMarker: boolean) {
    this.markers = { startMarker: startMarker, endMarker: endMarker };
  }
}
