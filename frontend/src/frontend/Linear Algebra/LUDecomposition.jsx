import React from 'react';
import BasePage3 from "../../assets/BasePage3";
import { LUDecomposition } from '../../numer/Linear Algebra/LUDecomposition.js';

class LUDecompositionPage extends BasePage3 {

    getTitle = () => {
        return "⋆˖˚ ༘𐙚  LU Decomposition ⋆.°༘⋆"
    }

    calculate = () => {
        try {
            this.cal = new LUDecomposition(this.state.n);
            this.setState({ result: this.cal.calculate(this.state.A, this.state.B) });
            
        } catch (error) {
            alert(error.message);
        }
    }
}

export default LUDecompositionPage