import React from 'react';
import BasePage3 from "../../assets/BasePage3";
import { GaussJordan } from '../../numer/Linear Algebra/GaussJordan.js';

class GaussJordanPage extends BasePage3 {

    getTitle = () => {
        return "⋆˖˚ ༘𐙚  Gauss-Jordan Elimination ⋆.°༘⋆"
    }

    calculate = () => {
        try {
            this.cal = new GaussJordan(this.state.n);
            this.setState({ result: this.cal.calculate(this.state.A, this.state.B) });
            
        } catch (error) {
            alert(error.message);
        }
    }
}

export default GaussJordanPage