import { FalsePosition } from '../../numer/Root of Equation/FalsePosition.js'
import BasePage from '../../assets/BasePage.jsx'


class FalsePositionPage extends BasePage {
  
  getTitle = () => {
    return " ⊹ ࣪ ˖ False Position Method  ⋆.𐙚 ̊ "
  }

  getMethod = () => { 
    return "false-position"
  };

  calculate = ()=>{
    try {
      if (!this.state.fx){
        alert ("Please enter a function")
        return;
      }
    
      const f = new FalsePosition(this.state.fx,parseFloat(this.state.xL),parseFloat(this.state.xR),parseFloat(this.state.error))
      this.setState({ table: f.calculate()})
    } catch (error){
      alert(error.message)
    }
  }
}

export default FalsePositionPage
