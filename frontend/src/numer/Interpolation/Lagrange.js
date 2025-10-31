
export class Lagrange {
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
        let result = 0 , save = []
        for (let i=0;i<n;i++){
            let l = 1
            for (let j=0;j<n;j++){
                if (i===j) continue;
                l *= (x - X[j]) / (X[i] - X[j])
            }

            result += l*Y[i]
            save.push({
                L : l,
                i : i,
                fx : Y[i]
            })
        }
        save.push({
            result: result
        })
        return save
    }
}