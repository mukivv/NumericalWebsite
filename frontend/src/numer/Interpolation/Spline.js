
export class Spline {
    constructor(X,Y,n,x){
        this.state = {
            X : X,
            Y : Y,
            n : n, //(2++)
            x : x
        }
    }

    calculate() {
        let result
        if (this.n === 2){
            result = this.linear()
        } else if (this.n === 3){
            result = this.quadratic()
        } else {
            result = this.polynomial()
        }

        return result

    }

    linear(){
        const { X , Y , n , x} = this.state
        let m = [] , result = 0
        for (let i=0;i<n-1;i++){
            let c = (Y[i+1] - Y[i]) / (X[i+1] - X[i])
            m.push(c)
        }

        for(let i=0;i<n-1;i++){
            if (X[i] <= x && x <= X[i+1]){
                result = Y[i] + m[i]*(x-X[i])
            }
        }
        return result
    }

    quadratic(){
        //
    }

    polynomial(){
        //
    }

}