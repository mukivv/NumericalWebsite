import React from 'react';
import BasePage3 from "../../assets/BasePage3";
import { Jacobi } from '../../numer/Linear Algebra/Jacobi.js';

class JacobiPage extends BasePage3 {

    getTitle = () => {
        return "⋆˖˚ ༘𐙚  Jacobi Iteration ⋆.°༘⋆"
    }

    calculate = () => {
        try {
            this.cal = new Jacobi(this.state.n, this.state.error);
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
                <td>{t.error[i]?.toFixed(6)}%</td>
              </tr>
            ))}
          </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

    renderForm = () => {
    return(
      <>
        <h2>{this.getTitle()}</h2>
        <form>
          <div className='ip'>
            <label> Matrix Size (nxn) : </label>
            <input type='number' min='0' max='10' placeholder='0' value={this.state.n} onChange={this.handle_n} />
            <label> (2-10) </label>
          </div>

          <div className='ip'>
            <label> Error : </label>
            <input type='number' placeholder='0' value={this.state.error} onChange={(e) => this.setError(parseFloat(e.target.value))} />
          </div>
        </form>

        {/* Vector X0 */}
        <div>
          <label>X initial</label>
          <div>
            <div className='div-row-matrix'>
              {this.state.X0.map((val, i) => (
                <input
                  key={i}
                  type="text"
                  value={val}
                  onChange={(e) => this.handleX0Change(i,e.target.value)}
                  placeholder="0"
                  className='ip-matrix'
                />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    return (
      <>
        {this.renderHead()}
        <main>
          {this.renderForm()}
          <div> {this.renderMatrix()} </div>
          <div>
              <button className="content-btn" type="button" onClick={this.calculate}> Calculate </button>
              <button className="content-btn" type="submit" onClick={this.clear}>Clear</button>
          </div>
          <div id='table'> 
              {this.createTable()} 
          </div>
        </main>
      </>
    );
  }
}

export default JacobiPage