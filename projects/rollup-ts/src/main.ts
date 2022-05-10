import {registerCustomShapes} from "./custom-shapes";
import {Cell, CellStyle, Client, Geometry, Graph, InternalEvent, RubberBandHandler} from '@maxgraph/core';


// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.ts:5 -->');
console.log(`Use maxGraph ${Client.VERSION} with Typescript!`);

const container = document.getElementById('graph-container') as HTMLElement;
// Disables the built-in context menu
InternalEvent.disableContextMenu(container);

const graph = new Graph(container);
graph.setConnectable(true);
graph.setAllowDanglingEdges(false);

graph.setPanning(true)
new RubberBandHandler(graph); // Enables rubber band selection

// shapes and styles
registerCustomShapes();
// @ts-ignore TODO fix TS2532: Object is possibly 'undefined'.
graph.getStylesheet().getDefaultEdgeStyle().edgeStyle = 'orthogonalEdgeStyle'; // TODO use constants.EDGESTYLE instead

// TODO the signatures of the insertVertex and createVertex methods are not up-to-date in VertexMixin
// insertVertex: (...args: any[])
// createVertex all parameters are declared as mandatory whereas some are optional
const insertVertex = (parentCell: Cell, id: string | null, value: any, x: number, y: number, width: number, height: number, style?: CellStyle, relative: boolean = false, geometryClass: typeof Geometry = Geometry): Cell => {
    // @ts-ignore
    const vertex = graph.createVertex(parentCell, id, value, x, y, width, height, style, relative, geometryClass);
    return graph.addCell(vertex, parentCell)
}

// TODO use graph.batchUpdate() instead
const model = graph.getDataModel();
model.beginUpdate();
try {
    const parent = graph.getDefaultParent();
    // TODO temporarily use 'insertVertex' instead of 'graph.insertVertex'
    // TODO restore custom style
    const vertex01 = insertVertex(parent, null, 'a regular rectangle', 10, 10, 100, 100);
    const vertex02 = insertVertex(parent, null, 'a regular ellipse', 350, 90, 50, 50);
    // const vertex02 = insertVertex(parent, null, 'a regular ellipse', 350, 90, 50, 50, 'shape=ellipse;fill=orange');
    graph.insertEdge(parent, null, 'a regular edge', vertex01, vertex02);
    // insert vertices using custom shapes
    insertVertex(parent, null, 'a custom rectangle', 20, 200, 100, 100);
    insertVertex(parent, null, 'a custom ellipse', 150, 350, 70, 70);
    // insertVertex(parent, null, 'a custom rectangle', 20, 200, 100, 100, 'shape=customRectangle');
    // insertVertex(parent, null, 'a custom ellipse', 150, 350, 70, 70, 'shape=customEllipse');
} finally {
    model.endUpdate();
}
