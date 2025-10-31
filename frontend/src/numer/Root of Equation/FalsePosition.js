import { evaluate } from "mathjs";
import { Bisection } from "./Bisection";

export class FalsePosition extends Bisection {

  calculate(){
    let xl = this.xL, xr = this.xR
    let xm, xmOld = 1, fxM, fxL, fxR, e=1
    let iteration = 0
    const result = []
  
    do {
      fxL = evaluate(this.fx,{x:xl})
      fxR = evaluate(this.fx,{x:xr})
      xm = (fxR*xl - fxL*xr) / (fxR-fxL)
      fxM = evaluate(this.fx,{x:xm})
  
        if (fxM * fxR < 0) {
          xl = xm;
        } else {
          xr = xm;
        }
  
        if (iteration != 0) {
          e = Math.abs((xm - xmOld) / xm)
        }
  
        xmOld = xm
  
        result.push({
          Iteration: iteration,
          x: xm,
          Fx: fxM,
          Error: (e * 100).toFixed(6)
        })
  
        iteration++
      } while (e > this.error && iteration <= this.maxIter)
  
      this.table = result
      return result
    }
}