import {
    constants,
    getDefaultPlugins,
    Graph,
    GraphDataModel,
    InternalEvent,
    Perimeter,
    RubberBandHandler,
} from '@maxgraph/core';
import {registerCustomShapes} from "./custom-shapes";

export const initializeGraph = (container: HTMLElement) => {
    // Disables the built-in context menu
    InternalEvent.disableContextMenu(container);

    const graph = new Graph(container, new GraphDataModel(), [
        ...getDefaultPlugins(),
        RubberBandHandler, // Enables rubber band selection
    ]);
    graph.setPanning(true); // Use mouse right button for panning

    // Customize the rubber band selection
    graph.getPlugin<RubberBandHandler>('RubberBandHandler').fadeOut = true;

    // shapes and styles
    registerCustomShapes();
    // create a dedicated style for "ellipse" to share properties
    graph.getStylesheet().putCellStyle('myEllipse', {
        perimeter: Perimeter.EllipsePerimeter,
        shape: 'ellipse',
        verticalAlign: 'top',
        verticalLabelPosition: 'bottom',
    });

    // Gets the default parent for inserting new cells. This
    // is normally the first child of the root (ie. layer 0).
    const parent = graph.getDefaultParent();

    // Adds cells to the model in a single step
    graph.batchUpdate(() => {
        // use the legacy insertVertex method
        const vertex01 = graph.insertVertex(
            parent,
            null,
            'a regular rectangle',
            10,
            10,
            100,
            100
        );
        const vertex02 = graph.insertVertex(
            parent,
            null,
            'a regular ellipse',
            350,
            90,
            50,
            50,
            {
                baseStyleNames: ['myEllipse'],
                fillColor: 'orange',
            }
        );
        // use the legacy insertEdge method
        graph.insertEdge(parent, null, 'an orthogonal style edge', vertex01, vertex02, {
            edgeStyle: constants.EDGESTYLE.ORTHOGONAL,
            rounded: true,
        });

        // insert vertex using custom shapes using the new insertVertex method
        const vertex11 = graph.insertVertex({
            parent,
            value: 'a custom rectangle',
            position: [20, 200],
            size: [100, 100],
            style: {shape: 'customRectangle'},
        });
        // use the new insertVertex method using position and size parameters
        const vertex12 = graph.insertVertex({
            parent,
            value: 'a custom ellipse',
            x: 150,
            y: 350,
            width: 70,
            height: 70,
            style: {
                baseStyleNames: ['myEllipse'],
                shape: 'customEllipse',
            },
        });
        // use the new insertEdge method
        graph.insertEdge({
            parent,
            value: 'another edge',
            source: vertex11,
            target: vertex12,
            style: {endArrow: 'block'},
        });
    });
}
