import { evaluate } from 'mathjs'

export class CompositeSimpson {
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

        let h = (b-a)/(2*n) , x = 0
        const Y = [] , table = [] 

        console.log(a,b)
        
        for (let i=0;i<=2*n;i++){
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
        for (let i=1;i<2*n;i++){
            (i % 2 === 0) ? sum += 2*Y[i] : sum += 4*Y[i]
        }
        result = h/3 * ( result + sum )

        /*const real = math.integral(fx,'x')

        const error = Math.abs( (result - real) / result)*/

        return(table)
    }
}