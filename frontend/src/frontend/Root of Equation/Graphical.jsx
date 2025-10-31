import { Graphical } from '../../numer/Root of Equation/Graphical.js'
import BasePage from '../../assets/BasePage.jsx'


class GraphicalPage extends BasePage {
  
  getTitle = () => {
    return " ⊹ ࣪ ˖ Graphical Method  ⋆.𐙚 ̊ "
  }

  getMethod = () => { 
    return "graphical"
  };

  calculate = ()=>{
    try {
      if (!this.state.fx){
        alert ("Please enter a function")
        return;
      }
    
      const g = new Graphical(this.state.fx,this.state.xL,this.state.xR,this.state.error)
      this.setState({ table: g.calculate()})
    } catch (error){
      alert(error.message)
    }
  }
}

export default GraphicalPage
