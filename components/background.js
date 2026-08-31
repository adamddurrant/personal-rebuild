import React, { useEffect } from "react";
import { useTheme } from "next-themes";

export default function Background() {
  //   const { theme, setTheme } = useTheme();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    let time = 0;

    let baseNum = resolvedTheme == "dark" ? 50 : 150;

    // Out of range channels make an invalid rgb() string, which the canvas
    // ignores - the cell would silently keep the previous cell's colour.
    const clamp = function (v) {
      return Math.max(0, Math.min(255, v));
    };

    const color = function (x, y, r, g, b) {
      context.fillStyle = `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
      context.fillRect(x, y, 10, 10);
    };
    const B = function (x, y, time) {
      return Math.floor(baseNum + 57.6 * Math.cos((x * x - y * y) / 200 + time));
    };

    const G = function (x, y, time) {
      return Math.floor(
        baseNum +
          60 *
            Math.sin(
              (x * x * Math.cos(time / 4) + y * y * Math.sin(time / 3)) / 300
            )
      );
    };

    // const R = "209";
    // //function (x, y, time) {
    // // return (Math.floor(192 + 64 * Math.sin(5 * Math.sin(time / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100)));
    // //}
    const R = function (x, y, time) {
      return Math.floor(
        baseNum +
          76.8 *
            Math.sin(
              5 * Math.sin(time / 9) +
                ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
            )
      );
    };

    const startAnimation = function () {
      for (let x = 0; x <= 30; x++) {
        for (let y = 0; y <= 30; y++) {
          color(x, y, R(x, y, time), G(x, y, time), B(x, y, time));
        }
      }
      time = time + 0.015;
      window.requestAnimationFrame(startAnimation);
    };

    startAnimation();
  }, [resolvedTheme]);
  return (
    <>
      <canvas id="canvas" width="32px" height="20px" className="bg" />
    </>
  );
}
