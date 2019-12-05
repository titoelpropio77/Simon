import React from "react";
import ReactDOM  from 'react-dom';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

const App = () => (
  <Provider template={AlertTemplate} {...options}>
  </Provider>
);
ReactDOM.render(<App />, document.getElementById('contentBody'));
