import BasePage5 from '../../assets/BasePage5.jsx'
import { Trapezoidal } from '../../numer/Integration/Trapezoidal.js'
import Plotly from 'react-plotly.js'
import { evaluate } from 'mathjs'

class TrapezoidalPage extends BasePage5 {

    getTitle = () => {
        return "Trapezoidal's Rule"
    }

    calculate = () => {
        try{
            const {a,b,fx,n} = this.state

            this.cal = new Trapezoidal(a,b,fx,n)
            this.setState({ table: this.cal.calculate() })

        } catch(error){
            alert(error.message)
        }
    }

}
export default TrapezoidalPage