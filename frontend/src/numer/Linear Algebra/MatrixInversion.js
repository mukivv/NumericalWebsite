import { round } from 'mathjs';

export class MatrixInversion {
    constructor(n) {
    this.n = n
  }

  //แปลง matrix เป็น LaTeX
    formatMatrixLatex(A,I) {

        const AI = A.map( (row,index) => {
            const a = row.map(val => round(val,6));
            const i = I[index].map(val => round(val, 6));
            return [...a,...i];
        } );


        const col = A[0].length;
        const colFormat = 'c'.repeat(col) + '|' + 'c'.repeat(col);
        const content = AI.map(row => row.join(' & ')).join('\\\\')

        return `\\left[ \\begin{array}{${colFormat}} ${content}\\end{array} \\right]`;
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


    calculate(a,b) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0));
        const B = b.map(val => parseFloat(val) || 0);
        const I = [];
        for (let i=0;i<this.n;i++){
            I[i] = [];
            for (let j=0;j<this.n;j++){
                i === j ? I[i][j] = 1 : I[i][j] = 0;
            }
        }

        const result = [];
        const x = [];


      for (let r=0;r<this.n;r++){
        for (let e=r+1;e<this.n;e++){
          if (A[e][r] === 0) continue;

          result.push({
            Ai: A.map(row => [...row]),
            Ii: I.map(row => [...row]),
            e: e+1,
            r: r+1
          });

          let er = A[e][r];
          for (let R=0;R<this.n;R++){
            A[e][R] = A[e][R] - (A[r][R] / A[r][r]) * er;
            I[e][R] = I[e][R] - (I[r][R] / A[r][r]) * er;
          }
        }
      }

      for (let r=this.n-1;r>0;r--){
        for (let e=r-1;e>=0;e--){
          if (A[e][r] === 0) continue;

          result.push({
            Ai: A.map(row => [...row]),
            Ii: I.map(row => [...row]),
            e: e+1,
            r: r+1
          });

          let er = A[e][r]
          for (let R=0;R<this.n;R++){
            A[e][R] = A[e][R] - (A[r][R] / A[r][r]) * er;
            I[e][R] = I[e][R] - (I[r][R] / A[r][r]) * er;
          }
        }
      }

      for (let r=0;r<this.n;r++){
        if (A[r][r] === 1 ) continue;

        result.push({
            Ai: A.map(row => [...row]),
            Ii: I.map(row => [...row]),
            r: r+1
        });
        
        let rr = A[r][r];
        for (let e=0;e<this.n;e++){
            A[r][e] /= rr;
            I[r][e] /= rr;
        }
        
      }

      result.push({
        Ai: A.map(row => [...row]),
        Ii: I.map(row=> [...row]),
      });

      for (let i=0 ; i<this.n ; i++){
        x[i] = 0;
        for (let j=0 ; j<this.n ; j++){
            x[i] += I[i][j] * B[j];
        }
      }

      return {
        results : result,
        X : x,
        B : B,
        I : I
      }
    }

    getSolution(result) {
        if (!result) return null;

        const { results , X , B , I} = result; //ดึงค่าตัวแปรต่างๆออกมาใช้
        
        let count = 0;
        const part1 = results.map((res) => {
          const { Ai , Ii , e , r } = res;
          if (count === results.length-1){
            return `${this.formatMatrixLatex(Ai,Ii)}`
          } else if (count >= results.length-this.n-1){
            count++;
            return `${this.formatMatrixLatex(Ai,Ii)} 
            R_{${r}} = \\frac{R_{${r}}}{a_{${r}${r}}} \\\\`;
          }  
          else {
            count++;
            return `${this.formatMatrixLatex(Ai,Ii)} 
            R_{${e}} = R_{${e}} - \\frac{R_{${r}}}{R_{${r}${r}}} \\times R_{${e}${r}} \\\\`;
          }
        }).join('\\\\[2em]');

        const part2 = `
            \\text{X} = \\mathbf{A}^{-1}\\mathbf{B}
            \\quad = {${this.formatMatrix(I,0)}}{${this.formatMatrix(B,1)}} =
            \\begin{Bmatrix}
                ${X.map(xi => round(xi, 6)).join(' \\\\ ')}
            \\end{Bmatrix}
        `


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
            ${part1} \\\\[2em]
            ${part2} \\\\[2em]
            ${answer}
            \\end{gather*}
        `;
    }
  }