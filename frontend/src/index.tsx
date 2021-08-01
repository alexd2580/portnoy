import { TSDI } from "tsdi";

import * as ReactDOM from "react-dom";
import * as React from "react";

import "semantic-ui-css-offline/semantic.min.css";

import { Application } from "./application";
import { Questionnaire } from "./components/questionnaire";

function renderApp(): React.ReactElement {
  return <Questionnaire />;
}

async function main(): Promise<void> {
  new TSDI(new Application());
  ReactDOM.render(renderApp(), document.getElementById("app"));
}

main();
