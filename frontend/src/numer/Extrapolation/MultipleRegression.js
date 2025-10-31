
import { GaussJordan } from '../Linear Algebra/GaussJordan.js'

export class MultipleRegression {
    constructor(X,Y,n,k,x){
        this.state = {
            X : X,
            Y : Y,
            n : n, //number of point
            k : k, //จำนวนเซตของ X
            x : x //set ของ x ที่จะแทนลงฟังก์ชัน มีจำนวน k 
        }
    }

    calculate(){
        const {X,Y,n,k,x} = this.state
        const N = k+1
        const A = Array.from({ length: N}, () => Array(this.N).fill(0));
        const B = []

        for (let i=0;i<k+1;i++){ 
            if (i===0) A[0][i] = n
            let sum = 0
            for (let k=0;k<n;k++){
                A[0][i] += X[i-1][k]
                if (i===0) sum += Y[k]
            }
            if (i===0) B.push(sum)
            A[i][0] = A[0][i]
        }
        
        
        for (let i=1;i<k;i++){
            for (let j=1;j<k;j++){
                if (A[i][j] != 0) continue;
                for (let k=0;k<n;k++){
                    A[i][j] += X[i-1][k] * X[j-1][k]
                }
                A[j][i] = A[i][j]
            }

            let sum = 0
            for (let k=0;k<n;k++){
                sum += Math.pow(X[i],k) * Y[k]
            }
            B.push(sum)
        }


        const g = new GaussJordan(m)
        const gauss = g.calculate(A,B)
        const {r , b} = gauss
        
        let result = b[0]
        for(let i=0;i<m+1;i++){
            result += b[i]*x[i]
        }

        return result
    }
}
