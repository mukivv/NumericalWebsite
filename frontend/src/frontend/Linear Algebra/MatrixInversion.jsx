import React from 'react';
import BasePage3 from "../../assets/BasePage3";
import { MatrixInversion } from '../../numer/Linear Algebra/MatrixInversion.js';

class MatrixInversionPage extends BasePage3 {

    getTitle = () => {
        return "⋆˖˚ ༘𐙚  Matrix Inversion ⋆.°༘⋆"
    }

    calculate = () => {
        try {
            this.cal = new MatrixInversion(this.state.n);
            this.setState({ result: this.cal.calculate(this.state.A, this.state.B) });
            
        } catch (error) {
            alert(error.message);
        }
    }
}

export default MatrixInversionPage