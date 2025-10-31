import React from 'react'
import '../index.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  renderHead() {
    return (
      <>
        <nav>
          <div>
            <h2 className='logo'> Numer ۶ৎ </h2>
          </div>

          <div className="dropdown">
            <div className="drop-group">
              <button className="drop-button"> Root of Equation </button>
              <div className="drop-select">
                <a href="/graphical"> Graphical  </a>
                <a href="/bisection"> Bisection </a>
                <a href="/false-position"> False Position </a>
                <a href="/one-point"> One Point </a>
                <a href="/newton-raphson"> Newton Raphson </a>
                <a href="/secant"> Secant </a>
              </div>
            </div>
            <div className="drop-group">
              <button className="drop-button"> Linear Algebra </button>
              <div className="drop-select">
                <a href="/cramer-rule"> Cramer's rule </a>
                <a href="/gauss-elimination"> Gauss Elimination </a>
                <a href="/gauss-jordan"> Gauss-Jordan </a>
                <a href="/matrix-inversion"> Matrix Inversion </a>
                <a href="/lu-decomposition"> LU Decomposition </a>
                <a href="/cholesky"> Cholesky </a>
                <a href="/jacobi"> Jacobi Iteration </a>
                <a href="/gauss-seidel"> Gauss-Seidel </a>
                <a href="/conjugate-gradient"> Conjugate Gradient </a>
              </div>
            </div>
            <div className="drop-group">
              <button className="drop-button"> Interpolation </button>
              <div className="drop-select">
                <a href="/newton-divided"> Newton Divided </a>
                <a href="/lagrange"> Lagrange </a>
                <a href="/spline"> Spline </a>
              </div>
            </div>
            <div className="drop-group">
              <button className="drop-button"> Extrapolation </button>
              <div className="drop-select">
                <a href="/simple-regression"> Simple Regression </a>
                <a href="/multiple-regression"> Multiple Regression </a>
              </div>
            </div>
            <div className="drop-group">
              <button className="drop-button"> Integration </button>
              <div className="drop-select">
                <a href="/trapezoidal"> Trapezoidal </a>
                <a href="/composite-trapezoidal"> Composite Trapezoidal </a>
                <a href="/simpson"> Simpson </a>
                <a href="/composite-simpson"> Composite Simpson </a>
              </div>
            </div>
            <div className="drop-group">
              <button className="drop-button"> Differentiation </button>
              <div className="drop-select">
                <a href="/differentiation"> Differentiation </a>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default NavBar;