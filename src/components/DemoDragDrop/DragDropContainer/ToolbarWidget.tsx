import React, { Component } from "react";

export interface TrayWidgetProps {}
export interface TrayWidgetState {}

class ToolbarWidget extends Component<TrayWidgetProps, TrayWidgetState> {
  state = {};

  public static defaultProps: TrayWidgetProps = {};

  render() {
    return <div className="tray">{this.props.children}</div>;
  }
}

export default ToolbarWidget;
