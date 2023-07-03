import './style.css';
import {type CellStyle, Graph, InternalEvent, RubberBandHandler} from '@maxgraph/core';
import {registerCustomShapes} from "./custom-shapes";
import {html, LitElement} from "lit";
import { customElement } from "lit/decorators.js";

// TODO mainly duplicated with other projects
const initializeGraph = (container: HTMLElement) => {
  // Disables the built-in context menu
  InternalEvent.disableContextMenu(container);

  const graph = new Graph(container);
  graph.setPanning(true); // Use mouse right button for panning
  // WARN: as the maxGraph css files are not available in the npm package (at least for now), dedicated CSS class must be defined in style.css
  new RubberBandHandler(graph); // Enables rubber band selection

  // shapes and styles
  registerCustomShapes();
  // @ts-ignore TODO fix TS2532: Object is possibly 'undefined'.
  graph.getStylesheet().getDefaultEdgeStyle().edgeStyle = 'orthogonalEdgeStyle'; // TODO use constants.EDGESTYLE instead of 'orthogonalEdgeStyle'

  // Gets the default parent for inserting new cells. This
  // is normally the first child of the root (ie. layer 0).
  const parent = graph.getDefaultParent();

  // Adds cells to the model in a single step
  graph.batchUpdate(() => {
    const vertex01 = graph.insertVertex(parent, null, 'a regular rectangle', 10, 10, 100, 100);
    const vertex02 = graph.insertVertex(parent, null, 'a regular ellipse', 350, 90, 50, 50, <CellStyle>{shape: 'ellipse', fillColor: 'orange'});
    graph.insertEdge(parent, null, 'a regular edge', vertex01, vertex02);

    // insert vertices using custom shapes
    // TODO type issue in CellStyle type, shape should allow string to manage custom implementation
    const vertex11 = graph.insertVertex(parent, null, 'a custom rectangle', 20, 200, 100, 100, /*<CellStyle>*/{shape: 'customRectangle'});
    const vertex12 = graph.insertVertex(parent, null, 'a custom ellipse', 150, 350, 70, 70, /*<CellStyle>*/{shape: 'customEllipse'});
    graph.insertEdge(parent, null, 'another edge', vertex11, vertex12);
  });
};

@customElement("maxgraph-graph")
export class GraphElement extends LitElement {
  firstUpdated(): void {
    initializeGraph(<HTMLElement>this.renderRoot.querySelector("#graph-container"));
  }

  render() {
    return html`<div id="graph-container"></div>`;
  }
}
