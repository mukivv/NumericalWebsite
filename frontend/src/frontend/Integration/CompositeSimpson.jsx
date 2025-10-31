import BasePage5 from '../../assets/BasePage5.jsx'
import { CompositeSimpson } from '../../numer/Integration/CompositeSimpson.js'
import Plotly from 'react-plotly.js'
import { evaluate } from 'mathjs'


class CompositeSimpsonPage extends BasePage5 {

    getTitle = () => {
        return "Composite Simpson"
    }

    calculate = () => {
        try{
            const {a,b,fx,n} = this.state

            this.cal = new CompositeSimpson(a,b,fx,n)
            this.setState({ table: this.cal.calculate() })

        } catch(error){
            alert(error.message)
        }
    }

}
export default CompositeSimpsonPage