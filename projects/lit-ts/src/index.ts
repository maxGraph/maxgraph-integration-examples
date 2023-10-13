import '@maxgraph/core/css/common.css';
import 'maxgraph-examples-shared/css/rubber-band.css'
import 'maxgraph-examples-shared/css/general-style.css'

import {initializeGraph} from 'maxgraph-examples-shared';

import {html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";

@customElement("maxgraph-graph")
export class GraphElement extends LitElement {
  firstUpdated(): void {
    initializeGraph(<HTMLElement>this.renderRoot.querySelector("#graph-container"));
  }

  render() {
    return html`<div id="graph-container"></div>`;
  }
}
