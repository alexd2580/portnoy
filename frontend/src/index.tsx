import { TSDI } from "tsdi";

import * as ReactDOM from "react-dom";
import * as React from "react";

import "semantic-ui-css-offline/semantic.min.css";

import { Application } from "./application";

function renderApp(): React.ReactElement {
  return <p>nothing here yet</p>;
}

async function main(): Promise<void> {
  new TSDI(new Application());
  ReactDOM.render(renderApp(), document.getElementById("app"));
}

main();
