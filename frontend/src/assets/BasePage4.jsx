import React from 'react';
import { matrix } from 'mathjs';
import NavBar from './NavBar';
import { MathJaxContext } from 'better-react-mathjax';
import { MathJax } from 'better-react-mathjax'; 

class BasePage4 extends NavBar {
  constructor(props) {
    super(props);
    this.state = {
      n: 3,
      error: 0.000001,
      X: ["", "", ""],
      Y: ["", "", ""],
      findX: null,
      result: null,
      table : [],
      m : null,
    };
    this.cal = null
  }

  getTitle = () => {}

  getMethod() {
    return "regression";
  }

  getExample = async () => {
    try {
      const methodName = this.getMethod();
      const example = await fetch(`http://127.0.0.1:8000/example/${methodName}`).then(res => res.json());

      this.setState({
        n: example.n,
        X: example.X,
        Y: example.Y,
        findX: example.findX,
        m: example.m
      });
    } catch (error) {
      console.error('Error fetching example:', error);
      alert('Failed to load example');
    }
  };

  setFindX = (e) => this.setState({ findX: e });

  setM = (e) => { this.setState({m:e}) }

  clear = () => {
    window.location.reload();
  }

  handle_n = (event) => {
    const value = event.target.value;
    
    if (value === "") {
        this.setState({ n: "" });
        return;
    }

    const N = parseInt(value, 10);

    if (isNaN(N) || value < 2 || value > 10) { 
        return;
    }

    const X = Array(N).fill("");
    const Y = Array(N).fill("");

    this.setState({
      n: N,
      X: X,
      Y: Y,
    });
  };

  handleXChange = (index, value) => {
    const newX = [...this.state.X];
    newX[index] = value;
    this.setState({ X: newX , result: null});
  };

  handleYChange = (index, value) => {
    const newY = [...this.state.Y];
    newY[index] = value;
    this.setState({ Y: newY , result: null});
  };

  renderVector = () => {
    const { X , Y } = this.state;

    return (
      <div className="div-matrix">
        <div>
          <label>x</label>
          <div>
            <div className='div-col-matrix'>
                {X.map((val, i) => (
                <input
                    key={i}
                    type="text"
                    value={val}
                    onChange={(e) => this.handleXChange(i,e.target.value)}
                    placeholder="0"
                    className='ip-point'
                />
                ))}
            </div>
          </div>
        </div>

        <div>
          <label>f(x)</label>
          <div>
            <div className='div-col-matrix'>
              {Y.map((val, i) => (
                <input
                  key={i}
                  type="text"
                  value={val}
                  onChange={(e) => this.handleYChange(i,e.target.value)}
                  placeholder="0"
                  className='ip-point'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderForm = () => {
    return(
      <>
        <h2>{this.getTitle()}</h2>
        <form>
          <span className='ip'>
            <label> Number of point : </label>
            <input type='number' min='0' max='10' placeholder='0' value={this.state.n} onChange={this.handle_n} />
            <label> (2-10) </label>
          </span>

          <span className='ip'>
            <label> X : </label>
            <input type='number' placeholder='0' value={this.state.findX} onChange={(e) => this.setFindX(parseFloat(e.target.value))} />
          </span>
        </form>
      </>
    )
  }

  renderSolution = () => {
    if (!this.state.result) return null;
    const latexString = this.cal.getSolution(this.state.result);
    return (
      <>
        <MathJax>{`$$ ${latexString} $$`}</MathJax>
      </>
    );
  }

  calculate = () => {};

  createGraph = () => {}

  render() {
    return (
      <>
        {this.renderHead()}
        <main>
          {this.renderForm()}
          <div> {this.renderVector()} </div>
          <div>
              <button className="content-btn" type="button" onClick={this.getExample}>Example</button>
              <button className="content-btn" type="button" onClick={this.calculate}> Calculate </button>
              <button className="content-btn" type="submit" onClick={this.clear}>Clear</button>
          </div>
          <div className='graph'> 
            <div> {this.createGraph()} </div>
          </div>
        </main>
      </>
    );
  }
}

export default BasePage4;