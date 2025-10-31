import { evaluate } from "mathjs";

export class OnePoint {
  constructor(fx,xInitial,error) {
    this.xInitial = xInitial
    this.fx = fx
    this.error = error
    this.table = []
    this.maxIter = 200;
  }

  calculate(){
    let x = this.xInitial , xOld , e=1
    let iteration = 1
    const result = []
  
    do {
        xOld = x
        x = evaluate(this.fx,{x:x})
  
        e = Math.abs((x - xOld) / x)

        result.push({
          Iteration: iteration,
          x: x,
          Error: (e * 100).toFixed(6)
        })
  
        iteration++
      } while (e > this.error && iteration <= this.maxIter)
  
      this.table = result
      return result
    }
}