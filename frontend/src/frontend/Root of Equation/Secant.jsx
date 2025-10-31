import BasePage2 from "../../assets/BasePage2.jsx"
import { Secant } from '../../numer/Root of Equation/Secant.js'

class SecantPage extends BasePage2 {


  getTitle = () => {
    return " ⊹ ࣪ ˖ Secant Iteration Method  ⋆.𐙚 ̊ "
  }

  getMethod() {
    return "secant";
  }

  getExample = async () => {
    try {
      const methodName = this.getMethod();
      const example = await fetch(`http://127.0.0.1:8000/example/${methodName}`).then(res => res.json());

      this.setState({
        xInitial: example.xInitial,
        error: example.error,
        fx: example.fx,
        x: example.x
      });
    } catch (error) {
      console.error('Error fetching example:', error);
      alert('Failed to load example');
    }
  };

  calculate = ()=>{
      try {
        if (!this.state.fx){
          alert ("Please enter a function")
          return;
        }
      
        const s = new Secant(this.state.fx,this.state.xInitial,this.state.x,this.state.error)
        s.calculate()
        this.setState({ table: s.getTable()})
      } catch (error){
        alert(error.message)
      }
    }

    renderForm() {
    return (
      <>
        <h2>{this.getTitle()}</h2>
        <form>
          <span className="ip">
            <label>X initial : </label>
            <input
              type="number"
              placeholder="0.00"
              value={this.state.xInitial}
              onChange={(xInitial) => this.setxInitial(parseFloat(xInitial.target.value))}
            />
          </span>

          <span className="ip">
            <label>X1 : </label>
            <input
              type="number"
              placeholder="2.00"
              value={this.state.x}
              onChange={(x) => this.setx(parseFloat(x.target.value))}
            />
          </span>

          <span className="ip">
            <label>Error : </label>
            <input
              type="number"
              placeholder="0.000001"
              value={this.state.error}
              onChange={(e) => this.setError(parseFloat(e.target.value))}
            />
          </span>

          <span className="ip">
            <label>Enter function : </label>
            <input
              type="text"
              placeholder="(x+7)/(x+1)"
              value={this.state.fx}
              onChange={(f) => this.setFx(f.target.value)}
            />
          </span>

          <div>
            <div className="">
              <button className="content-btn" type="button" onClick={this.getExample}>
                Example
              </button>
              <button className="content-btn" type="button" onClick={this.calculate}>
                Calculate
              </button>
              <button className="content-btn" type="submit">Clear</button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default SecantPage