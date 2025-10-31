import React from 'react';
import Jacobi from "../../frontend/Linear Algebra/Jacobi.jsx";
import { Conjugate } from '../../numer/Linear Algebra/Conjugate.js';

class ConjugatePage extends Jacobi {

    getTitle = () => {
        return "⋆˖˚ ༘𐙚  Conjugate Gradient Method ⋆.°༘⋆"
    }

    calculate = () => {
        try {
            this.cal = new Conjugate(this.state.n, this.state.error);
            this.setState({ table: this.cal.calculate(this.state.A, this.state.B,this.state.X0) });  
        } catch (error) {
            alert(error.message);
        }
    }

    createTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>x</th>
            <th>% Error</th>
          </tr>
        </thead>

        <tbody>
          {this.state.table.map((t, index) => (
            <React.Fragment key={index}>
            {t.X.map((val, i) => (
              <tr key={`${index}-${i}`}>
                {i === 0 && <td rowSpan={t.X.length}>{t.Iteration}</td>}
                <td>{val.toFixed(6)}</td>
                {i === 0 && <td rowSpan={t.X.length}>{Array.isArray(t.error) ? t.error[0]?.toFixed(6) : t.error?.toFixed(6)}%</td>}
              </tr>
            ))}
          </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };
}

export default ConjugatePage