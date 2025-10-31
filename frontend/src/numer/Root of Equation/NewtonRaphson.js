import { evaluate,derivative } from "mathjs";
import { OnePoint } from "./OnePoint";

export class NewtonRaphson extends OnePoint{

  calculate(){
    let x = this.xInitial , xOld , e=1 , fx
    let df = derivative(this.fx, "x").compile();
    let iteration = 1
    const result = []
  
    do {
        xOld = x
        x = x - evaluate(this.fx,{x:x}) / df.evaluate({x:x})
        fx = evaluate(this.fx,{x:x})
  
        e = Math.abs((x - xOld) / x)

        result.push({
          Iteration: iteration,
          x: x,
          Fx: fx,
          Error: (e * 100).toFixed(6)
        })
  
        iteration++
      } while (e > this.error && iteration <= this.maxIter)
  
      this.table = result
      return result
    }
}