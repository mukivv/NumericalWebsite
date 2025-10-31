import React from 'react';
import Jacobi from "../../frontend/Linear Algebra/Jacobi.jsx";
import { GaussSeidel } from '../../numer/Linear Algebra/GaussSeidel.js';

class GaussSeidelPage extends Jacobi {

    getTitle = () => {
        return "⋆˖˚ ༘𐙚  Gauss-Seidel Method ⋆.°༘⋆"
    }

    calculate = () => {
        try {
            this.cal = new GaussSeidel(this.state.n, this.state.error);
            this.setState({ table: this.cal.calculate(this.state.A, this.state.B,this.state.X0) });  
        } catch (error) {
            alert(error.message);
        }
    }
}

export default GaussSeidelPage