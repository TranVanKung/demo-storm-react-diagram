import React, { Component } from "react";
import TestComponent from "@/containers/TestComponent";
import CustomNode from "@/components/CustomNode";
import CustomLink from "@/components/CustomLink";
import DemoClone from "@/components/DemoClone";
import CustomGrid from "@/components/CustomGrid";
import DemoLimitPoint from "@/components/DemoLimitPoint";
import DemoEventListener from "@/components/DemoEventListener";
import DemoLock from "@/components/DemoLock";
import DemoMutateGraph from "@/components/DemoMutateGraph";
import DemoPerformance from "@/components/DemoPerformance";
import DemoSimpleFlow from "@/components/DemoSimpleFlow";
import DemoSerialize from "@/components/DemoSerialize";
import DemoSmartRouting from "@/components/DemoSmartRouting";
import DemoZoomToFit from "@/components/DemoZoomToFit";
import DemoDragDrop from "@/components/DemoDragDrop";

class App extends Component {
  render() {
    return (
      <div className="app">
        {/* <CustomNode /> */}
        {/* <CustomLink /> */}
        {/* <DemoClone /> */}
        {/* <CustomGrid /> */}
        {/* <DemoLimitPoint /> */}
        {/* <DemoEventListener /> */}
        {/* <DemoLock /> */}
        {/* <DemoMutateGraph /> */}
        {/* <DemoPerformance /> */}
        {/* <DemoSimpleFlow /> */}
        {/* <DemoSerialize /> */}
        {/* <DemoSmartRouting /> */}
        {/* <DemoZoomToFit /> */}
        <DemoDragDrop />
      </div>
    );
  }
}

export default App;
