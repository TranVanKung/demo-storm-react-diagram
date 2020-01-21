import React from "react";
import { CustomLinkModel } from "./CustomLinkModel";
import { DiagramEngine, AbstractLinkFactory } from "storm-react-diagrams";
import { CustomLinkWidget } from "./CustomLinkWidget";

/**
 * @author Dylan Vorster
 */
export class CustomLinkFactory extends AbstractLinkFactory<CustomLinkModel> {
  constructor() {
    super("default");
  }

  generateReactWidget(
    diagramEngine: DiagramEngine,
    link: CustomLinkModel
  ): JSX.Element {
    return React.createElement(CustomLinkWidget, {
      link: link,
      diagramEngine: diagramEngine
    });
  }

  getNewInstance(initialConfig?: any): CustomLinkModel {
    return new CustomLinkModel();
  }

  generateLinkSegmentOld(
    model: CustomLinkModel,
    widget: CustomLinkWidget,
    selected: boolean,
    path: string
  ) {
    return (
      <path
        className={selected ? widget.bem("--path-selected") : ""}
        strokeWidth={model.width}
        stroke={model.color}
        d={path}
      />
    );
  }

  generateLinkSegment(
    model: CustomLinkModel,
    widget: CustomLinkWidget,
    selected: boolean,
    path: string,
    startMarkerId: string = "-",
    endMarkerId: string = "-"
  ) {
    return (
      <path
        className={selected ? widget.bem("--path-selected") : ""}
        strokeWidth={model.width}
        stroke={model.color}
        d={path}
        markerStart={"url(#" + startMarkerId + ")"}
        markerEnd={"url(#" + endMarkerId + ")"}
      />
    );
  }
}
