import { round } from 'mathjs'

export class GaussSeidel {
    constructor(n,error){
        this.n = n
        this.error = error
    }

    calculate(a,b,x){
        const A = a.map(row => row.map(val => parseFloat(val) || 0))
        const B = b.map(val => parseFloat(val) || 0)
        const X = x.map(val => parseFloat(val) || 0)
        const err = [...X]
        const result = []
        let check = 0 , count = 0
        do {
            count++
            const Xold = [...X]

            for (let i=0;i<this.n;i++) {
                X[i] = B[i];
                for (let j=0;j<this.n;j++) {
                    if (i==j) continue;
                    X[i] -= A[i][j] * X[j]; 
                }
                X[i] /= A[i][i];
            }

            check = 0
            for (let i=0;i<this.n;i++){
                err[i] = Math.abs((X[i] - Xold[i])/X[i])
                if (err[i] > this.error){
                    check++
                }
            }

            result.push({
                Iteration: count,
                X: [...X],
                error: err.map(val => val * 100)
            })
        } while (check != 0)
        console.log(result)
        return result
    }
}