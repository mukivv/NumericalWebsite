import React from 'react';
import BasePage3 from "../../assets/BasePage3";
import { CramerRule } from '../../numer/Linear Algebra/CramerRule.js';

class CramerRulePage extends BasePage3 {

    getTitle = () => {
        return "⋆˖˚ ༘𐙚  Cramer's Rule ⋆.°༘⋆"
    }

    calculate = () => {
        try {
            this.cal = new CramerRule(this.state.n);
            this.setState({ result: this.cal.calculate(this.state.A, this.state.B) });
            
        } catch (error) {
            alert(error.message);
        }
    }
}

export default CramerRulePage