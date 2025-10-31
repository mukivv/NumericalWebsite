import { evaluate } from 'mathjs'

export class CompositeTrapezoidal {
    constructor(a,b,fx,n){
        this.state = {
            a : a,
            b : b,
            fx : fx,
            n : n
        }
    }

    calculate = () => {
        const { a,b,fx,n } = this.state

        let h = (b-a)/2 , x = 0
        const Y = [] , table = [] 

        console.log(a,b)
        
        for (let i=0;i<=n;i++){
            x = a + i*h
            let y = evaluate(fx,{x:x})
            console.log(x,y)
            Y.push(y)
            table.push(
                {
                    Iteration: i,
                    x: x,
                    fx: y,
                    h: h
                }
            )
        }

        let result = Y[0] + Y[n*2]
        let sum = 0
        for (let i=1;i<n;i++){
            sum += 2*Y[i]
        }
        result = h/2 * ( result + sum )

        /*const real = math.integral(fx,'x')

        const error = Math.abs( (result - real) / result)*/

        return(table)
    }
}