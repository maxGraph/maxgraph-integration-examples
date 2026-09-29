import {AbstractCanvas2D, EllipseShape, ShapeRegistry, RectangleShape} from '@maxgraph/core';

export const registerCustomShapes = (): void => {
  console.info('Registering custom shapes...');
  ShapeRegistry.add('customRectangle', CustomRectangleShape);
  ShapeRegistry.add('customEllipse', CustomEllipseShape);
  console.info('Custom shapes registered');
};

class CustomRectangleShape extends RectangleShape {
  // The renderer builds a registered shape with no argument, so the defaults are declared as class fields.
  override strokeWidth = 3;
  override isRounded = true; // force rounded shape

  // Both fields are derived from the style, so they are wiped on every style change and have to be reasserted.
  override resetStyles(): void {
    super.resetStyles();
    this.strokeWidth = 3;
    this.isRounded = true;
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
  override strokeWidth = 5;

  override resetStyles(): void {
    super.resetStyles();
    this.strokeWidth = 5;
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
