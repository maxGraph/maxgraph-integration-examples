import {
    type AbstractCanvas2D,
    CellRenderer,
    constants,
    EdgeStyle,
    EllipseShape,
    Graph,
    InternalEvent,
    MarkerShape,
    PanningHandler,
    Perimeter,
    type Point,
    RubberBandHandler,
    SelectionCellsHandler,
    SelectionHandler,
    type Shape,
    type StyleArrowValue,
    StyleRegistry,
} from '@maxgraph/core';
import {registerCustomShapes} from "./custom-shapes";


// TODO remove this function when maxGraph 0.18.0 is released and import it from maxGraph instead using EdgeMarker.createArrow
// It is currently duplicated from maxGraph as it is not exported in version 0.17.0
const createArrow =
    (widthFactor: number) =>
        (
            canvas: AbstractCanvas2D,
            _shape: Shape,
            type: StyleArrowValue,
            pe: Point,
            unitX: number,
            unitY: number,
            size: number,
            _source: boolean,
            sw: number,
            filled: boolean
        ) => {
            // The angle of the forward facing arrow sides against the x axis is
            // 26.565 degrees, 1/sin(26.565) = 2.236 / 2 = 1.118 ( / 2 allows for
            // only half the strokewidth is processed ).
            const endOffsetX = unitX * sw * 1.118;
            const endOffsetY = unitY * sw * 1.118;

            unitX *= size + sw;
            unitY *= size + sw;

            const pt = pe.clone();
            pt.x -= endOffsetX;
            pt.y -= endOffsetY;

            const f = type !== constants.ARROW.CLASSIC && type !== constants.ARROW.CLASSIC_THIN ? 1 : 3 / 4;
            pe.x += -unitX * f - endOffsetX;
            pe.y += -unitY * f - endOffsetY;

            return () => {
                canvas.begin();
                canvas.moveTo(pt.x, pt.y);
                canvas.lineTo(
                    pt.x - unitX - unitY / widthFactor,
                    pt.y - unitY + unitX / widthFactor
                );

                if (type === constants.ARROW.CLASSIC || type === constants.ARROW.CLASSIC_THIN) {
                    canvas.lineTo(pt.x - (unitX * 3) / 4, pt.y - (unitY * 3) / 4);
                }

                canvas.lineTo(
                    pt.x + unitY / widthFactor - unitX,
                    pt.y - unitY - unitX / widthFactor
                );
                canvas.close();

                if (filled) {
                    canvas.fillAndStroke();
                } else {
                    canvas.stroke();
                }
            };
        };

/**
 * Create a custom implementation to not load all default built-in styles. This is because Graph registers them.
 *
 * In the future, we expect to have an implementation of Graph that does not do it.
 * See https://github.com/maxGraph/maxGraph/issues/760
 */
class CustomGraph extends Graph {
    /**
     * Only registers the elements required for this example. Do not let Graph load all default built-in styles.
     */
    protected override registerDefaults() {
        // Register builtin shapes
        // RectangleShape is not registered here because it is always available. It is the fallback shape for vertices when no shape is returned by the registry
        // TODO remove ts-ignore when maxGraph 0.18.0 is released
        // @ts-ignore
        CellRenderer.registerShape('ellipse', EllipseShape);

        // Register builtin styles
        StyleRegistry.putValue('ellipsePerimeter', Perimeter.EllipsePerimeter);
        StyleRegistry.putValue('rectanglePerimeter', Perimeter.RectanglePerimeter); // declared in the default vertex style, so must be registered to be used
        StyleRegistry.putValue('orthogonalEdgeStyle', EdgeStyle.OrthConnector);

        const arrowFunction = createArrow(2);
        MarkerShape.addMarker('classic', arrowFunction);
        MarkerShape.addMarker('block', arrowFunction);

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

    const graph = new CustomGraph(container, undefined, [
        PanningHandler, // Enables panning with the mouse
        RubberBandHandler, // Enables rubber band selection
        SelectionCellsHandler, // Enables management of selected cells
        SelectionHandler, // Enables selection with the mouse
    ]);
    graph.setPanning(true); // Use mouse right button for panning

    // Customize the rubber band selection
    graph.getPlugin<RubberBandHandler>('RubberBandHandler').fadeOut = true;

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
