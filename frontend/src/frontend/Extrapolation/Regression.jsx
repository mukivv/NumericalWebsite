import BasePage4 from '../../assets/BasePage4.jsx'
import { SimpleRegression } from '../../numer/Extrapolation/Regression.js'


class SimpleRegressionPage extends BasePage4 {

    getTitle = () => {
        return "Simple Regression"
    }

    calculate = () => {
        try{
            const {X,Y,findX,n} = this.state

            this.cal = new SimpleRegression(X,Y,findX,n)
            this.setState({ table: this.cal.calculate() })

        } catch(error){
            alert(error.message)
        }
    }

    renderForm = () => {
    return(
      <>
        <h2>{this.getTitle()}</h2>
        <form>
          <span className='ip'>
            <label> Number of point : </label>
            <input type='number' min='0' max='10' placeholder='0' value={this.state.n} onChange={this.handle_n} />
            <label> (2-10) </label>
          </span>

          <span className='ip'>
            <label> m order : </label>
            <input type='number' placeholder='0' value={this.state.m} onChange={(e) => this.setMOrder(parseInt(e.target.value))} />
          </span>

          <span className='ip'>
            <label> X : </label>
            <input type='number' placeholder='0' value={this.state.findX} onChange={(e) => this.setFindX(parseFloat(e.target.value))} />
          </span>
          
        </form>
      </>
    )
  }

    setMOrder = (e) => this.setState({ m: e });

}
export default SimpleRegressionPage