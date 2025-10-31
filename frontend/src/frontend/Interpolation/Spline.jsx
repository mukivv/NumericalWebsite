import BasePage4 from '../../assets/BasePage4.jsx'
import { Spline } from '../../numer/Interpolation/Spline.js'


class SplinePage extends BasePage4 {

    getTitle = () => {
        return "Spline Iterpolation"
    }

    calculate = () => {
        try{
            const {X,Y,findX,n} = this.state

            this.cal = new Spline(X,Y,findX,n)
            this.setState({ table: this.cal.calculate() })

        } catch(error){
            alert(error.message)
        }
    }

}
export default SplinePage