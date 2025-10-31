import BasePage5 from '../../assets/BasePage5.jsx'
import { Simpson } from '../../numer/Integration/Simpson.js'


class SimpsonPage extends BasePage5 {

    getTitle = () => {
        return "Simpson's Rule"
    }

    calculate = () => {
        try{
            const {a,b,fx,n} = this.state

            this.cal = new Simpson(a,b,fx,n)
            this.setState({ table: this.cal.calculate() })

        } catch(error){
            alert(error.message)
        }
    }

}
export default SimpsonPage