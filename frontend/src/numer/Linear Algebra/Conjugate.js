
export class Conjugate {
    constructor(n,error){
        this.n = n
        this.error = error
    }

    // คูณ matrix-vector
    vmulti(A, v) {
        return A.map(row => row.reduce((sum, a, i) => sum + a * v[i], 0))
    }

    // dot product
    vdot(a, b) {
        return a.reduce((sum, val, i) => sum + val * b[i], 0)
    }

    // vector subtraction
    vsub(a, b) {
        return a.map((val, i) => val - b[i])
    }

    // vector addition
    vadd(a, b) {
        return a.map((val, i) => val + b[i])
    }

    // scalar-vector multiplication
    smulti(s, v) {
        return v.map(val => val * s)
    }

    calculate(a, b, x) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0))
        const B = b.map(val => parseFloat(val) || 0)
        const X = x.map(val => parseFloat(val) || 0)
        const result = []
        let count = 0 , lamda = 0 , alpha = 0 , err = 0

        let R = this.vsub(this.vmulti(A, X),B) // R = AX - B
        let D = R.map(val => val*-1) // D = -R

        do {
            if (count != 0){
                alpha =  this.vdot( this.vmulti(A, R) , D ) / this.vdot( this.vmulti(A, D) , D )
                D = this.vsub(this.smulti(alpha,D) , R)
            }
            count++

            // lamda
            lamda = -1 * ( this.vdot(D,R) / this.vdot( this.vmulti(A, D) , D ))
            //X
            for (let i = 0; i < this.n; i++) {
                X[i] += lamda * D[i]
            }
            //R
            R = this.vsub(this.vmulti(A, X),B) // R = AX - B

            err = Math.sqrt(this.vdot(R,R))

            result.push({
                Iteration: count,
                X: [...X],
                error: err * 100
            })

        } while (err > this.error)

        return result
    }
}