import {
    BaseGraph,
    CellEditorHandler,
    EdgeMarker, EdgeMarkerRegistry,
    EdgeStyle,
    EdgeStyleRegistry,
    EllipseShape,
    InternalEvent,
    PanningHandler,
    Perimeter, PerimeterRegistry,
    RubberBandHandler,
    SelectionCellsHandler,
    SelectionHandler, ShapeRegistry,
} from '@maxgraph/core';
import {registerCustomShapes} from "./custom-shapes";


/**
 * Custom implementation of {@link BaseGraph} that only register the built-in styles required by the example.
 */
class CustomGraph extends BaseGraph {
    /**
     * Only registers the elements required for this example. Do not let Graph load all default built-in styles.
     */
    protected override registerDefaults() {
        // Register builtin shapes
        // RectangleShape is not registered here because it is always available. It is the fallback shape for vertices when no shape is returned by the registry
        ShapeRegistry.add('ellipse', EllipseShape);

        // Register builtin styles
        PerimeterRegistry.add('ellipsePerimeter', Perimeter.EllipsePerimeter);
        PerimeterRegistry.add('rectanglePerimeter', Perimeter.RectanglePerimeter); // declared in the default vertex style, so must be registered to be used
        EdgeStyleRegistry.add('orthogonalEdgeStyle', EdgeStyle.OrthConnector, {handlerKind: 'segment', isOrthogonal: true});

        const arrowFunction = EdgeMarker.createArrow(2);
        EdgeMarkerRegistry.add('classic', arrowFunction);
        EdgeMarkerRegistry.add('block', arrowFunction);

        // Register custom shapes
        registerCustomShapes();
    }
}

/**
 * Initializes the graph inside the given container.
 * @param container if not set, use the element matching the selector '#graph-container'
 */
export const initializeGraph = (container?: HTMLElement) => {
   container ??= document.querySelector<HTMLElement>('#graph-container')!;

    // Disables the built-in context menu
    InternalEvent.disableContextMenu(container);

    const graph = new CustomGraph({
        container,
        plugins: [
            CellEditorHandler, // Enables in-place editing of cell labels
            PanningHandler, // Enables panning with the mouse
            RubberBandHandler, // Enables rubber band selection
            SelectionCellsHandler, // Enables management of selected cells
            SelectionHandler, // Enables selection with the mouse
        ],
    });
    graph.setPanning(true); // Use mouse right button for panning

    // Customize the rubber band selection
    const rubberBandHandler = graph.getPlugin<RubberBandHandler>('RubberBandHandler');
    rubberBandHandler && (rubberBandHandler.fadeOut = true);

    // create a dedicated style for "ellipse" to share properties
    graph.getStylesheet().putCellStyle('myEllipse', {
        perimeter: 'ellipsePerimeter',
        shape: 'ellipse',
        verticalAlign: 'top',
        verticalLabelPosition: 'bottom',
    });

    // Adds cells to the model in a single step
    graph.batchUpdate(() => {
        const vertex01 = graph.insertVertex({
                value: 'a regular rectangle',
                position: [10, 10],
                size: [100, 100],
            }
        );
        const vertex02 = graph.insertVertex({
                value: 'a regular ellipse',
                position: [350, 90],
                size: [50, 50],
                style: {
                    baseStyleNames: ['myEllipse'],
                    fillColor: 'orange',
                }
            }
        );
        graph.insertEdge({
            value: 'an orthogonal style edge',
            source: vertex01,
            target: vertex02,
            style: {
                edgeStyle: 'orthogonalEdgeStyle',
                rounded: true,
            }
        });

        const vertex11 = graph.insertVertex({
            value: 'a custom rectangle',
            position: [20, 200],
            size: [100, 100],
            style: {shape: 'customRectangle'},
        });
        const vertex12 = graph.insertVertex({
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
        graph.insertEdge({
            value: 'another edge',
            source: vertex11,
            target: vertex12,
            style: {endArrow: 'block'},
        });
    });
}
