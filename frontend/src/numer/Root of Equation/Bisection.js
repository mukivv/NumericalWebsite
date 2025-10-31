import { evaluate } from "mathjs";

export class Bisection {
  constructor(fx,xL,xR,error) {
    this.xL = xL
    this.xR = xR
    this.fx = fx
    this.error = error
    this.table = []
    this.maxIter = 200;
  }

  calculate(){
    let xl = this.xL, xr = this.xR
    let xm, xmOld = 1, fxM, fxR, e=1
    let iteration = 0
    const result = []
  
    do {
      xm = (xl + xr) / 2.0
      fxM = evaluate(this.fx,{x:xm})
      fxR = evaluate(this.fx,{x:xr})
  
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