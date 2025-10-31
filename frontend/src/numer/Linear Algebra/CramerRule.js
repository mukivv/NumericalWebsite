import { matrix, det, round } from 'mathjs';

export class CramerRule {
    constructor(n) {
    this.n = n
  }

    formatMatrixLatex(data) {

        const type = 'vmatrix';
        
        const content = data.map(row => row.map(val => round(val, 6)).join(' & ')).join('\\\\');
        return `\\begin{${type}} ${content} \\end{${type}}`;
    }


    calculate(a,b) {
        const A = a.map(row => row.map(val => parseFloat(val) || 0)); //แปลงเปน float
        const B = b.map(val => parseFloat(val) || 0);

        const A_matrix = matrix(A); //matrix A
        const detA = det(A_matrix);  // det(A)

        const result = [];

        if (Math.abs(detA) < 1e-9) { //det = 0 หรือใกล้ 0 มาก
            throw new Error("Determinant = 0 : System can't solve");
        }

        for (let i = 0; i < this.n; i++) {
            const Ai_array = A.map((row, rowIndex) => //matrix Ai แทนด้วย B
                row.map((val, colIndex) => colIndex === i ? B[rowIndex] : val)
            );

            const Ai_matrix = matrix(Ai_array); //matrix Ai
            const detAi = det(Ai_matrix); // det(Ai)
            const xi = detAi / detA; // find xi

            result.push({
                index: i + 1,
                Ai: Ai_array,
                detAi: detAi,
                xi: xi,
            });
        }

        
        return {
            detA : detA,
            results: result,
            A : A
        }; //main result [ ]
    }

    getSolution(result) {
        if (!result) return null;

        const { detA, results , A } = result; //ดึงค่าตัวแปรต่างๆออกมาใช้

        const part1 = `
            det(A) = ${this.formatMatrixLatex(A)} = ${round(detA, 6)}
        `; //detA

        const part2 = results.map((res) => {
            const { index, detAi, xi, Ai} = res; //ดึงค่าตัวแปรจาก results อีกที
            return `
                \\mathbf{x_{${index}}} = \\quad 
                \\frac{det({A_{${index}}})}{det(A)} 
                = \\frac{${this.formatMatrixLatex(Ai)}}{${round(detA, 6)}}
                = \\frac{${round(detAi,6)}}{${round(detA,6)}}
                = ${round(xi, 6)}
            `; //xi
        }).join('\\\\[2em]');

        const answer = `
            \\mathbf{x} = 
            \\begin{Bmatrix}
                ${results.map(res => `x_{${res.index}}`).join(' \\\\ ')}
            \\end{Bmatrix}
            =
            \\begin{Bmatrix}
                ${results.map(res => round(res.xi, 6)).join(' \\\\ ')}
            \\end{Bmatrix}
        `;

        return `
            \\begin{gather*}
            ${part1} \\\\[2em]
            ${part2} \\\\[2em]
            \\therefore \\quad ${answer}
            \\end{gather*}
        `;
    }
}