
export class NewtonDivided {
    constructor(X,Y,n,x){
        this.state = {
            X : X,
            Y : Y,
            n : n, //(2++)
            x : x
        }
    }

    calculate(){
        const { X , Y , n , x} = this.state
        const m = Array.from(({ length: n }, () => Array(n).fill(0)));
        const result = 0
        for (let i = 0; i < n; i++) {
            let c = this.newton(X,Y, m, 0, i);

            for (let j = 0; j < i; j++) {
                c *= (x - X[j]);
            }
            result += c;
        }
        return result
    }

    newton(X,Y,m,i,j){
        if (i == j) return Y[i]; // base case
        if (m[i][j] != 0) return m[i][j];
        return m[i][j] = (this.newton(X, Y, m, i+1, j) - this.newton(X, Y, m, i, j-1)) / (X[j] - X[i]);
    }

}