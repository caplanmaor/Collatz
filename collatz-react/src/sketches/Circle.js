import React from "react";
import Sketch from "react-p5";

let collatz = [5, 16, 8, 4, 2, 1];
// let collatz = [6, 3, 10, 5, 16, 8, 4, 2, 1];
let position = 0;
let end = 50;

let d = 400;
let lines = [];
collatz.forEach((num, i) => {
  if (i > 0) {
    let prev_num = collatz[i - 1];
    let cordinates = {
      x_start: (d / 2) * Math.sin(prev_num),
      y_start: (d / 2) * Math.cos(prev_num),
      x_end: (d / 2) * Math.sin(num),
      y_end: (d / 2) * Math.cos(num),
    };
    lines.push(cordinates);
  }
});

let line_amount = lines.length;
let line_counter = 0;

export default (props) => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(800, 800).parent(canvasParentRef);
    p5.noFill();
    p5.frameRate(5);
  };

  const draw = (p5) => {
    p5.translate(400, 400);
    p5.background(0, 0, 0);
    p5.strokeWeight(10);
    p5.stroke(255, 255, 255);
    p5.ellipse(0, 0, 400, 400);

    // draw all previous lines
    lines.forEach((cord, i) => {
      if (i < line_counter) {
        p5.line(cord.x_start, cord.y_start, cord.x_end, cord.y_end);
      }
    });

    // draw current line
    if (line_counter < line_amount) {
      let line_x_start = lines[line_counter]["x_start"];
      let line_y_start = lines[line_counter]["y_start"];
      let x_end =
        ((lines[line_counter]["x_end"] - line_x_start) / end) * position;
      let y_end =
        ((lines[line_counter]["y_end"] - line_y_start) / end) * position;
      p5.translate(line_x_start, line_y_start);
      p5.line(
        lines[line_counter]["x_start"] - line_x_start,
        lines[line_counter]["y_start"] - line_y_start,
        x_end,
        y_end
      );
      position++;
      if (position == end) {
        position = 0;
        line_counter++;
      }
    } else {
      lines.forEach((cord) => {
        p5.line(cord.x_start, cord.y_start, cord.x_end, cord.y_end);
      });
    }
    // screen capture
    if (line_counter < line_amount) {
      let num = "00" + p5.frameCount;
      let string = num.slice(-3);
      p5.save(string + ".jpg");
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};
