import { evaluate } from "mathjs";
import { Bisection } from "./Bisection";

export class Graphical extends Bisection {
  calculate() {
    let xl = this.xL, xr = this.xR, xOld
    let fxL, fxR, e = 1
    let ii = 0, i = Math.pow(10, ii)
    let iteration = 0;
    const result = [];

    while (xl < xr && iteration <= this.maxIter) {
      fxL = evaluate(this.fx, { x: xl });
      fxR = evaluate(this.fx, { x: xl + i });

      if (iteration != 0) {
        e = Math.abs((xl - xOld) / xl);
      }

      result.push({
        Iteration: iteration,
        x: xl,
        Fx: fxL,
        Error: (e * 100).toFixed(6)
      });

      if (e < this.error) break;

      iteration++;
      xOld = xl;

      if (fxL * fxR < 0) {
        xr = xl + i;
        ii -= 1;
        i = Math.pow(10, ii)
        if (xl != 0){
            xl += i
        }
      } else{
        xl += i
      }
    }
    this.table = result;
    return result;
  }
}
