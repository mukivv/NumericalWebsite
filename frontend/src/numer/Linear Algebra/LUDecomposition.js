import { round } from 'mathjs'

export class LUDecomposition {
    constructor(n){
        this.n = n
    }

    formatMatrix(m,n) {
        //vector 1 matrix 0
        const type = n ? 'Bmatrix' : 'bmatrix' ;

        if (n === 1) {
            const content = m.map(val => round(val, 6)).join('\\\\');
            return `\\begin{${type}} ${content} \\end{${type}}`;
        }
        
        const content = m.map(row => row.map(val => round(val, 6)).join(' & ')).join('\\\\');
        return `\\begin{${type}} ${content} \\end{${type}}`;
    }

    calculate(a,b){
        const A = a.map(row => row.map(val => parseFloat(val) || 0))
        const B = b.map(val => parseFloat(val) || 0)
        const L = Array.from({ length: this.n }, () => Array(this.n).fill(0));
        const U = Array.from({ length: this.n }, () => Array(this.n).fill(0));
        const x = [] , Y = []
        const result = []

        for (let r=0;r<this.n;r++){
            for (let e=r;e<this.n;e++){
    		    L[e][r] = A[e][r];
			    for (let R=0;R<r;R++){
				    L[e][r] -= L[e][R]*U[R][r];
			    }

                U[r][r] = 1

                for (let e=r+1;e<this.n;e++){
			        U[r][e] = A[r][e];
			        for (let R=0;R<r;R++){
				        U[r][e] -= L[r][R]*U[R][e];
			        }
			        U[r][e] /= L[r][r];
		        }
		    }
        }

        //forward
        for (let i=0;i<this.n;i++) {
            Y[i] = B[i];
            for (let j=0;j<i;j++) {
                Y[i] -= L[i][j] * Y[j]; 
            }
            Y[i] /= L[i][i];
        }

        //backward
        for (let i=this.n-1;i>=0;i--) {
            x[i] = Y[i];
            for (let j=i+1;j<this.n;j++) {
                x[i] -= U[i][j] * x[j];
            }
            x[i] /= U[i][i];
            x[i] = round(x[i],6);
        }

        return {
            L: L,
            U: U,
            A: A,
            B: B,
            X: x,
            Y: Y
        }
    }

    getSolution(result){
        if (!result) return null;

        const { L , U , A , B , X , Y } = result;

        const part1 = `
        \\text{From [L][U] = [A]} \\\\
        \\text{Magical mujikaaaa LU matrixxxxx BOOM!} \\\\[2em]
        {${this.formatMatrix(L,0)}}{${this.formatMatrix(U,0)}} = {${this.formatMatrix(A,0)}} \\\\[2em]
        
        \\text{From [L][U]{X} = {B}} \\\\[2em]
        {${this.formatMatrix(L,0)}}{${this.formatMatrix(U,0)}}
        \\begin{Bmatrix}
            ${X.map(( xi, index)=> `x_{${index+1}}`).join(' \\\\ ')}
        \\end{Bmatrix} = {${this.formatMatrix(B,1)}} \\\\[4em]

        \\text{Forward Substitution from [L]{Y} = {B}} \\\\[2em]
        {${this.formatMatrix(L,0)}}\\begin{Bmatrix}
            ${X.map(( xi, index)=> `y_{${index+1}}`).join(' \\\\ ')}
        \\end{Bmatrix} = {${this.formatMatrix(B,1)}}
        `

        const part2 = this.getPart2(Y);

        const Yanswer = `
            \\mathbf{y} = 
            \\begin{Bmatrix}
                ${Y.map(( xi, index)=> `y_{${index+1}}`).join(' \\\\ ')}
            \\end{Bmatrix}
            =
            \\begin{Bmatrix}
                ${Y.map(xi => round(xi, 6)).join(' \\\\ ')}
            \\end{Bmatrix}
        `;

        const part3 = `\\\\[2em]
        \\text{Back Substitution from [U]{X} = {Y}} \\\\[2em]
        {${this.formatMatrix(U,0)}}\\begin{Bmatrix}
            ${X.map(( xi, index)=> `x_{${index+1}}`).join(' \\\\ ')}
        \\end{Bmatrix} = {${this.formatMatrix(Y,1)}}
        `

        const part4 = this.getPart4(X);

        const Xanswer = `
            \\mathbf{x} = 
            \\begin{Bmatrix}
                ${X.map(( xi, index)=> `x_{${index+1}}`).join(' \\\\ ')}
            \\end{Bmatrix}
            =
            \\begin{Bmatrix}
                ${X.map(xi => round(xi, 6)).join(' \\\\ ')}
            \\end{Bmatrix}
        `;

        return `
            \\begin{gather*}
            ${part1} \\\\[2em]
            ${part2} \\\\[2em]
            ${Yanswer} \\\\[2em]
            ${part3} \\\\[2em]
            ${part4} \\\\[2em]
            ${Xanswer}
            \\end{gather*}
        `;

    }

    getPart2(Y) {
        const equations = [];
        
        for (let i = 0; i < this.n ; i++) {
            let sum = `b_{${i + 1}}`;
            for (let j = 0; j < i; j++) {
                sum += ` - l_{${i + 1}${j + 1}}y_{${j + 1}}`;
            }            
            
            const eqLatex = `
                y_{${i + 1}} = \\frac{${sum}}{l_{${i + 1}${i + 1}}} = ${round(Y[i], 6)}
            \\\\[2em]`;
            
            equations.push(eqLatex);
        }
        
        return `
        \\begin{gathered}
        ${equations.join('')}
        \\end{gathered}
        `;
    }

    getPart4(X) {
        const equations = [];
        
        for (let i = this.n - 1; i >= 0; i--) {
            let sum = `y_{${i + 1}}`;
            for (let j = i + 1; j < this.n; j++) {
                sum += ` - u_{${i + 1}${j + 1}}x_{${j + 1}}`;
            }            
            
            const eqLatex = `
                x_{${i + 1}} = \\frac{${sum}}{u_{${i + 1}${i + 1}}} = ${round(X[i], 6)}
            \\\\[2em]`;
            
            equations.push(eqLatex);
        }
        
        return `
        \\begin{gathered}
        ${equations.join('')}
        \\end{gathered}
        `;
    }

}