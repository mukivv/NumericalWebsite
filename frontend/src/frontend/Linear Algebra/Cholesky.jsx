import BasePage3 from "../../assets/BasePage3";
import { Cholesky } from '../../numer/Linear Algebra/Cholesky.js';

class CholeskyPage extends BasePage3{

    getTitle = () => {
        return "⋆˖˚ ༘𐙚  Cholesky Decomposition ⋆.°༘⋆"
    }

    calculate = () => {
        try {
            this.cal = new Cholesky(this.state.n)
            this.setState({result: this.cal.calculate(this.state.A,this.state.B)})

        } catch (error) {
            alert (error.message)
        }
    }

}

export default CholeskyPage