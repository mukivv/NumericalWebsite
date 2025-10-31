import BasePage2 from "../../assets/BasePage2.jsx"
import { NewtonRaphson } from '../../numer/Root of Equation/NewtonRaphson.js'

class NewtonRaphsonPage extends BasePage2 {


  getTitle = () => {
    return " ⊹ ࣪ ˖ Newton Raphson Method  ⋆.𐙚 ̊ "
  }

  calculate = ()=>{
      try {
        if (!this.state.fx){
          alert ("Please enter a function")
          return;
        }
      
        const n = new NewtonRaphson(this.state.fx,this.state.xInitial,this.state.error)
        this.setState({ table: n.calculate()})
      } catch (error){
        alert(error.message)
      }
    }
}

export default NewtonRaphsonPage