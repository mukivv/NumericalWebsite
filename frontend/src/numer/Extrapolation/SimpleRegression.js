import { inv } from 'mathjs'

export class SimpleRegression {
    constructor(X,Y,n,m,findX){
        this.state = {
            X : X,
            Y : Y,
            n : n,
            m : m,
            findX : findX
        }
    }

    calculate(){
        const {X,Y,n,m,findX} = this.state

        const A = Array.from({ length: m+1}, () => Array(m+1).fill(0))
        const B = []

        for (let i=0;i<m+1;i++){
            for (let j=0;j<m+1;j++){
                if (i==0 && j==0){
                    A[i][j] = n
                }

                if (i==0) {
                    if (A[i][j] != 0) continue;
                    A[i][j] = 0
                    for (let k=0;k<n;k++){
                         A[i][j] += Math.pow(X[k],j)
                    }
                } else {
                    if (A[i][j] != 0) continue;
                    A[i][j] = 0
                    for (let k=0;k<n;k++){
                         A[i][j] += Math.pow(X[k],i+j)
                    }
                }
                A[j][i] =  A[i][j]
            }
            let sum=0
            for (let k=0;k<n;k++){
                sum += Math.pow(X[k],i) * Y[k]
            }
            B.push(sum)
        }

        let Aa = inv(A)

        const result = Array(m+1).fill(0)

        for (let i=0;i<m+1;i++){
            for (let j=0;j<m+1;j++){
                result[i] += Aa[i][j] * B[j]
            }
        }
        
        return result

    }
}