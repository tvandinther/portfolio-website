import { render } from "solid-js/web";
import * as three from "./threeScript"

import "./index.css";
import App from "./App";

render(App, document.getElementById("root"));

three.init()