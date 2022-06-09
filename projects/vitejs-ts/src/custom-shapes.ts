// TODO fully duplicated with the rollup-ts project

import {AbstractCanvas2D, EllipseShape, Rectangle, RectangleShape} from '@maxgraph/core';
import CellRenderer from "../../../../maxGraph/packages/core/src/view/cell/CellRenderer";

export function registerCustomShapes(): void {
    console.info('Registering custom shapes...');
    // @ts-ignore TODO fix CellRenderer. Calls to this function are also marked as 'ts-ignore' in CellRenderer
    CellRenderer.registerShape('customRectangle', CustomMxRectangleShape);
    // @ts-ignore
    CellRenderer.registerShape('customEllipse', CustomMxEllipse);
    console.info('Custom shapes registered');
}

class CustomMxRectangleShape extends RectangleShape {

    constructor(bounds: Rectangle, fill: string, stroke: string, strokewidth?: number) {
        super(bounds, fill, stroke, strokewidth);
        this.isRounded = true; // force rounded shape
    }

    paintBackground(c: AbstractCanvas2D, x: number, y: number, w: number, h: number): void {
        c.setFillColor('Chartreuse');
        super.paintBackground(c, x, y, w, h);
    };

}

class CustomMxEllipse extends EllipseShape {
    constructor(bounds: Rectangle, fill: string, stroke: string) {
        super(bounds, fill, stroke, 5);
    }

    paintVertexShape(c: AbstractCanvas2D, x: number, y: number, w: number, h: number) {
        c.setFillColor('Yellow');
        c.setStrokeColor('Red');
        super.paintVertexShape(c, x, y, w, h);
    }
}
