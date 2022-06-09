import './style.css';
import {CellStyle, Client, Graph} from '@maxgraph/core';
import {registerCustomShapes} from "./custom-shapes";

// display the maxGraph version in the footer
const footer = document.querySelector<HTMLElement>('footer')!;
footer.innerText = `maxGraph ${Client.VERSION}`;

// Creates the graph inside the given container
const container = document.querySelector<HTMLDivElement>('#graph-container')!;
const graph = new Graph(container);
graph.setPanning(true); // TODO make it have effect, seems not working

// shapes and styles
registerCustomShapes();
// @ts-ignore TODO fix TS2532: Object is possibly 'undefined'.
graph.getStylesheet().getDefaultEdgeStyle().edgeStyle = 'orthogonalEdgeStyle'; // TODO use constants.EDGESTYLE

// Gets the default parent for inserting new cells. This
// is normally the first child of the root (ie. layer 0).
const parent = graph.getDefaultParent();

// Adds cells to the model in a single step
graph.batchUpdate(() => {
  const vertex01 = graph.insertVertex(parent, null, 'a regular rectangle', 10, 10, 100, 100);
  const vertex02 = graph.insertVertex(parent, null, 'a regular ellipse', 350, 90, 50, 50, <CellStyle>{shape: 'ellipse', fillColor: 'orange'});
  graph.insertEdge(parent, null, 'a regular edge', vertex01, vertex02);
  // insert vertices using custom shapes
  // TODO custom shapes seems not taken into account
  // TODO type issue in CellStyle type, shape should allow string to manage custom implementation
  graph.insertVertex(parent, null, 'a custom rectangle', 20, 200, 100, 100, /*<CellStyle>*/{shape: 'customRectangle'});
  graph.insertVertex(parent, null, 'a custom ellipse', 150, 350, 70, 70, /*<CellStyle>*/{shape: 'customEllipse'});
});
