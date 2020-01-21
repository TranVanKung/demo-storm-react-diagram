import React, { Component } from "react";

export interface TrayItemWidgetProps {
  model: any;
  color?: string;
  name: string;
  type?: any;
}

export interface TrayItemWidgetState {}

class TrayItemWidget extends Component<
  TrayItemWidgetProps,
  TrayItemWidgetState
> {
  state = {};

  render() {
    const { name, color, model } = this.props;

    return (
      <div
        style={{ borderColor: color }}
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData("drag-node", JSON.stringify(model));
        }}
        className="tray-item"
      >
        {name}
      </div>
    );
  }
}

export { TrayItemWidget };
