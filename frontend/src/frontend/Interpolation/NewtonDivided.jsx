/*import BasePage4 from '../../assets/BasePage4.jsx'
import { NewtonDivided } from '../../numer/Interpolation/NewtonDivided.js'


class NewtonDividedPage extends BasePage4 {

    getTitle = () => {
        return "Newton Divided Difference"
    }

    calculate = () => {
        try{
            const {X,Y,findX,n} = this.state

            this.cal = new NewtonDivided(X,Y,findX,n)
            this.setState({ table: this.cal.calculate() })

        } catch(error){
            alert(error.message)
        }
    }

}
export default NewtonDividedPage*/