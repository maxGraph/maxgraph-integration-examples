import {AbstractCanvas2D, ColorValue, EllipseShape, Rectangle, ShapeRegistry, RectangleShape} from '@maxgraph/core';

export const registerCustomShapes = (): void => {
  console.info('Registering custom shapes...');
  ShapeRegistry.add('customRectangle', CustomRectangleShape);
  ShapeRegistry.add('customEllipse', CustomEllipseShape);
  console.info('Custom shapes registered');
};

class CustomRectangleShape extends RectangleShape {
  constructor(bounds: Rectangle, fill: ColorValue, stroke: ColorValue) {
    super(bounds, fill, stroke, 3);
    this.isRounded = true; // force rounded shape
  }

    override paintBackground(
    c: AbstractCanvas2D,
    x: number,
    y: number,
    w: number,
    h: number
  ): void {
    c.setFillColor('Chartreuse');
    super.paintBackground(c, x, y, w, h);
  }

    override paintVertexShape(
    c: AbstractCanvas2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    c.setStrokeColor('Black');
    super.paintVertexShape(c, x, y, w, h);
  }
}

class CustomEllipseShape extends EllipseShape {
  constructor(bounds: Rectangle, fill: string, stroke: string) {
    super(bounds, fill, stroke, 5);
  }

    override paintVertexShape(
    c: AbstractCanvas2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    c.setFillColor('Yellow');
    c.setStrokeColor('Red');
    super.paintVertexShape(c, x, y, w, h);
  }
}
