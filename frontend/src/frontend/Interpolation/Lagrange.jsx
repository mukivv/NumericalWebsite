import BasePage4 from '../../assets/BasePage4.jsx'
import { Lagrange } from '../../numer/Interpolation/Lagrange.js'


class LagrangePage extends BasePage4 {

    getTitle = () => {
        return "Lagrange Iterpolation"
    }

    calculate = () => {
        try{
            const {X,Y,findX,n} = this.state

            this.cal = new Lagrange(X,Y,findX,n)
            this.setState({ table: this.cal.calculate() })

        } catch(error){
            alert(error.message)
        }
    }

}
export default LagrangePage