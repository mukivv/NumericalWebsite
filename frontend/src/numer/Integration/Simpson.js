import { evaluate } from 'mathjs'

export class Simpson {
    constructor(a,b,fx){
        this.state = {
            a : a,
            b : b,
            fx : fx,
            n : 2
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

        let result = h/3 * (Y[0] + 4*Y[1]+ Y[2])

        /*const real = math.integral(fx,'x')

        const error = Math.abs( (result - real) / result)*/

        return(table)
    }
}