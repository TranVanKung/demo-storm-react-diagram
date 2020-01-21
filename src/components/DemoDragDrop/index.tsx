import React from "react";
import DragDropContainer from "./DragDropContainer";
import MainEngine from "./MainEngine";
import "./sass/main.scss";

export default () => {
  const app = new MainEngine();

  return <DragDropContainer app={app} />;
};
