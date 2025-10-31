import { GaussJordan } from '../Linear Algebra/GaussJordan.js'

export class SimpleRegression {
    constructor(X,Y,n,m,x){
        this.state = {
            X : X,
            Y : Y,
            n : n, //number of point
            m : m, //order m
            x : x
        }
    }

    calculate(){
        const {X,Y,n,m,x} = this.state
        const A = Array.from({ length: this.n }, () => Array(this.n).fill(0));
        const B = []
        
        for (let i=0;i<m+1;i++){
            for (let j=0;j<m;j++){
                if (A[i][j] != 0) continue;
                if (i === 0 && j === 0) A[i][j] = n
                if (i === j) {
                    for (let k=0;k<n;k++){
                        A[i][j] += Math.pow(X[i],2*i)
                    }
                } else {
                    for (let k=0;k<n;k++){
                        A[i][j] += Math.pow(X[i],j)
                    }
                    A[j][i] = A[i][j]
                }
            }

            let sum = 0
            for (let k=0;k<n;k++){
                sum += Math.pow(X[i],i) * Y[i]
            }
            B.push(sum)
        }

        const g = new GaussJordan(m)
        const gauss = g.calculate(A,B)
        const {r , b} = gauss

        const result = 0
        for (let i=0;i<m;i++){
            result += b[i] * Math.pow(X,i)
        }


        return result
    }
}