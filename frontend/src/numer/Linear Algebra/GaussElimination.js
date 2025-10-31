import { round } from 'mathjs';

export class GaussElimination {
    constructor(n) {
    this.n = n
  }

  //แปลง matrix เป็น LaTeX
    formatMatrixLatex(A,B) {
        const AB = A.map( (row,index) => {
            const a = row.map(val => round(val,6));
            const b = round(B[index], 6)
            return [...a,b];
        } );


        const col = AB[0].length;
        const colFormat = 'c'.repeat(col-1) + '|c';
        const content = AB.map(row => row.join(' & ')).join('\\\\')

        return `\\left[ \\begin{array}{${colFormat}} ${content}\\end{array} \\right]`;
    }


    calculate(a,b) {
      const A = a.map(row => row.map(val => parseFloat(val) || 0)); //แปลงเปน float
      const B = b.map(val => parseFloat(val) || 0);

      const result = [];
      const x = [];


      for (let r=0;r<this.n;r++){
        for (let e=r+1;e<this.n;e++){
          if (A[e][r] === 0) continue;

          result.push({
            Ai: A.map(row => [...row]),
            Bi: [...B],
            e: e+1,
            r: r+1
          });

          let er = A[e][r]
          for (let R=0;R<this.n;R++){
            A[e][R] = A[e][R] - (A[r][R] / A[r][r]) * er;
          }
          B[e] = B[e] - (B[r] / A[r][r]) * er;
        }
      }
      result.push({
        Ai: A.map(row => [...row]),
        Bi: [...B],
      });

      for (let i=this.n-1 ; i>=0 ;i--){
        x[i] = B[i];
        for (let j=i+1;j<this.n;j++){
          x[i] -= A[i][j] * x[j];
        }
        x[i] /= A[i][i];
      }

      return {
        results : result,
        X : x,
        A : A,
        B : B
      }
    }

    getSolution(result) {
        if (!result) return null;

        const { results , X} = result; //ดึงค่าตัวแปรต่างๆออกมาใช้
        
        let count = 0;
        const part1 = results.map((res) => {
          const { Ai , Bi , e , r } = res;
          if (count === results.length-1){
            return `${this.formatMatrixLatex(Ai,Bi)}`
          } else {
            count++;
            return `${this.formatMatrixLatex(Ai,Bi)} 
            R_{${e}} = R_{${e}} - \\frac{R_{${r}}}{R_{${r}${r}}} \\times R_{${e}${r}} \\\\`;
          }
        }).join('\\\\[2em]');

        const part2 = this.getPart2(X)

        const answer = `
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
            \\text{Forward Elimination} \\\\[2em]
            ${part1} \\\\[2em]
            \\text{Back Substitution} \\\\[2em]
            ${part2} \\\\[2em]
            ${answer}
            \\end{gather*}
        `;
    }

        getPart2(X) {
        const equations = [];
        
        for (let i = this.n - 1; i >= 0; i--) {
            let sum = `b_{${i + 1}}`;
            for (let j = i + 1; j < this.n; j++) {
                sum += ` - a_{${i + 1}${j + 1}}x_{${j + 1}}`;
            }            
            
            const eqLatex = `
                x_{${i + 1}} = \\frac{${sum}}{a_{${i + 1}${i + 1}}} = ${round(X[i], 6)}
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