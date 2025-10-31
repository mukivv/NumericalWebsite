import { evaluate } from "mathjs";

export class Secant {
    constructor(fx,xInitial,x,error) {
    this.xInitial = xInitial
    this.fx = fx
    this.x1 = x
    this.error = error
    this.table = []
    this.maxIter = 200;
  }

  f = (x) =>{
    return evaluate(this.fx,{x:x})
  }

  calculate(){
    let x0 = this.xInitial , x1 = this.x1 , x2 , e=1 , fx
    let iteration = 0
    const result = []
  
    do {
        x2 = x1 - (this.f(x1) * (x0-x1) / (this.f(x0) - this.f(x1)))
        fx = this.f(x2)
        e = Math.abs((x2 - x1) / x2)

        result.push({
          Iteration: iteration,
          x: x2,
          Fx: fx,
          Error: (e * 100).toFixed(6)
        })

        x0 = x1
        x1 = x2
  
        iteration++
      } while (e > this.error && iteration <= this.maxIter)
  
      this.table = result
      return result
    }
}