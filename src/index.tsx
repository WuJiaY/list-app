import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/base";
import { Provider } from "mobx-react";
import { configure } from "mobx";
import Main from "./pages/Main";
import store from "./store";
//mobx严格模式
configure({ enforceActions: "observed", isolateGlobalState: true });

ReactDOM.render(
  <Provider {...store}>
      <Main />
  </Provider>,
  document.getElementById("root") as HTMLElement
);
