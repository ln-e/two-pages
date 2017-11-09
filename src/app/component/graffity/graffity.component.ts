import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Brush } from '../../core/model/graffity/brush';
import { Canvas } from '../../core/model/graffity/canvas';
import { Curve } from '../../core/model/graffity/curve';
import { Point } from '../../core/model/graffity/point';

@Component({
  selector: 'app-graffity',
  templateUrl: './graffity.component.html',
  styleUrls: ['./graffity.component.scss']
})
export class GraffityComponent implements OnInit {
  @ViewChild('canvasCommon') public canvasCommonEl: ElementRef;
  @ViewChild('canvasOverlay') public canvasOverlayEl: ElementRef;

  public brush: Brush;
  public canvasCommon: Canvas;
  public canvasOverlay: Canvas;
  public curve: Curve;
  public curves: Curve[] = [];
  public inProcess = false;
  public historyIndex = -1;

  constructor(
  ) { }

  public ngOnInit() {
    this.brush = new Brush(40, '#c8c832', 0.75);
    this.canvasCommon = new Canvas(this.canvasCommonEl.nativeElement);
    this.canvasOverlay = new Canvas(this.canvasOverlayEl.nativeElement);
  }

  public overlayMouseDown(e) {
    this.inProcess = true;
    this.curve = new Curve(this.brush);
    this.proceedCurveByEvent(e);
  }

  public overlayMouseMove(e) {
    if (this.inProcess) {
      this.proceedCurveByEvent(e);
    }
  }

  public overlayMouseUp(e) {
    if (this.inProcess) {
      this.inProcess = false;
      this.proceedCurveByEvent(e);

      this.canvasOverlay.clear();
      this.canvasCommon.draw(this.curve);

      this.historyIndex += 1;
      this.curves = this.curves.slice(0, this.historyIndex);

      this.curve.optimize(); // сокращаем количество ненужных точек
      this.curves.push(this.curve);
      this.curve = undefined;
    }
  }

  private proceedCurveByEvent(e) {
    if (e) {
      let offset = this.offset(this.canvasOverlay.root);

      this.curve.push(new Point(
        e.pageX - offset.left,
        e.pageY - offset.top,
      ));
    }

    this.canvasOverlay.clear();
    this.canvasOverlay.draw(this.curve);
  }

  private offset(elt) {
    const rect = elt.getBoundingClientRect(), bodyElt = document.body;

    return {
      top: rect.top + bodyElt .scrollTop,
      left: rect.left + bodyElt .scrollLeft
    };
  }

  @HostListener('window:mouseup', ['$event'])
  public documentClick(event) {
    if (this.inProcess) {
      this.overlayMouseUp(null);
    }
  }

  public clear() {
    this.canvasCommon.clear();
    this.historyIndex = -1;
    this.curves = [];
  }

  public data(): string {
    return this.canvasCommon.data();
  }

  public dataJson(): string {
    return JSON.stringify(this.curves);
  }

  public dataPlain(): string {
    return JSON.stringify(this.curves.map((curve: Curve) => {
      return {
        brush: curve.brush,
        points: curve.points.map((point: Point) => point.asString()),
      };
    }));
  }

  public prev() {
    this.canvasCommon.clear();
    this.historyIndex = Math.max(this.historyIndex - 1, -1);

    for (let i = 0; i <= this.historyIndex; i++) {
      this.canvasCommon.draw(this.curves[i]);
    }
  }

  public next() {
    this.canvasCommon.clear();
    this.historyIndex = Math.min(this.historyIndex + 1, this.curves.length - 1);

    for(let i = 0; i <= this.historyIndex; i++) {
      this.canvasCommon.draw(this.curves[i]);
    }
  }

  public setBrush(brush: Brush) {
    this.brush = brush;
  }
}
