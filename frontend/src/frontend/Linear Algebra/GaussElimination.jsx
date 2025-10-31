import React from 'react';
import BasePage3 from "../../assets/BasePage3";
import { GaussElimination } from '../../numer/Linear Algebra/GaussElimination.js';

class GaussEliminationPage extends BasePage3 {

    getTitle = () => {
        return "⋆˖˚ ༘𐙚  Gauss-Elimination ⋆.°༘⋆"
    }

    calculate = () => {
        try {
            this.cal = new GaussElimination(this.state.n);
            this.setState({ result: this.cal.calculate(this.state.A, this.state.B) });
            
        } catch (error) {
            alert(error.message);
        }
    }
}

export default GaussEliminationPage