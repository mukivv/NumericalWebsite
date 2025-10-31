import BasePage2 from "../../assets/BasePage2.jsx"
import { OnePoint } from '../../numer/Root of Equation/OnePoint.js'

class OnePointPage extends BasePage2 {


  getTitle = () => {
    return " ⊹ ࣪ ˖ One-Point Iteration Method  ⋆.𐙚 ̊ "
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
          {this.state.table.map((t, index) => {
            return (
              <tr key={index}>
                <td>{t.Iteration}</td>
                <td>{t.x.toFixed(6)}</td>
                <td>{t.Error}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  calculate = ()=>{
      try {
        if (!this.state.fx){
          alert ("Please enter a function")
          return;
        }
      
        const o = new OnePoint(this.state.fx,this.state.xInitial,this.state.error)
        this.setState({ table: o.calculate()})
      } catch (error){
        alert(error.message)
      }
    }
}

export default OnePointPage