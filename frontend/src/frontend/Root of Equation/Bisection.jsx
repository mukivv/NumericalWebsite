import { Bisection } from '../../numer/Root of Equation/Bisection.js'
import BasePage from '../../assets/BasePage.jsx'


class BisectionPage extends BasePage {
  
  getTitle = () => {
    return " ⊹ ࣪ ˖ Bisection Method  ⋆.𐙚 ̊ "
  }

  getMethod = () => { 
    return "bisection"
  };

  calculate = ()=>{
    try {
      if (!this.state.fx){
        alert ("Please enter a function")
        return;
      }
    
      const b = new Bisection(this.state.fx,parseFloat(this.state.xL),parseFloat(this.state.xR),parseFloat(this.state.error))
      this.setState({ table: b.calculate()})
    } catch (error){
      alert(error.message)
    }
  }
}

export default BisectionPage
