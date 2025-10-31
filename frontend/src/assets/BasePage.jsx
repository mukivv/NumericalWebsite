import React from 'react'
import Plot from 'react-plotly.js'
import '../index.css'
import NavBar from './NavBar';

class BasePage extends NavBar {
  constructor(props) {
    super(props);

    this.state = {
      xL: 0,
      xR: 0,
      error: 0.000001,
      fx: "",
      table: [],
    };
  }

  setError = (error) => this.setState({ error: error });

  setFx = (fx) => this.setState({ fx: fx });

  setxL = (xL) => this.setState({ xL: xL });

  setxR = (xR) => this.setState({ xR: xR });

  calculate = () => {};

  getMethod() {
    return "root1";
  }

  getExample = async () => {
    try {
      const methodName = this.getMethod();
      const example = await fetch(`http://127.0.0.1:8000/example/${methodName}`).then(res => res.json());

      this.setState({
        xL: example.xL,
        xR: example.xR,
        error: example.error,
        fx: example.fx
      });
    } catch (error) {
      console.error('Error fetching example:', error);
      alert('Failed to load example');
    }
  };

  createGraph = () => {
    const tableX = this.state.table.map((t) => t.Iteration);
    const tableY = this.state.table.map((t) => t.Error);

    return (
      <Plot
        data={[
          {
            x: tableX,
            y: tableY,
            type: "scatter",
            mode: "lines+markers",
            name: "",
            line: {
              color: "#4f5dff",
              width: 2,
            },
            marker: {
              color: "#6b7cffff",
              size: 10,
              line: { color: "white", width: 2 },
            },
          },
        ]}
        layout={{
          dragmode: "pan",
          xaxis: { title: { text: "Iteration", font: { family: "Arial, sans-serif", size: 16,  weight: "bold", color: "#081970de" } }},
          yaxis: { title: { text: "Error", font: { family: "Arial, sans-serif", size: 16, weight: "bold", color: "#081970de" } }},
          hoverlabel: {
            bgcolor: "white", 
            font: { color: "rgba(49, 40, 217, 1)", size: 14 }, // สีอักษร + ขนาด
            bordercolor: "white", // เส้นขอบ tooltip
          },
        }}
        config={{
          responsive: true,
          displayModeBar: false,
          displaylogo: false,
          scrollZoom: true,
        }}
        style={{ width: "100%", height: "500px" }}
      />
    );
  }

  createTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Iteration</th>
            <th>x</th>
            <th>f(x)</th>
            <th>% Error</th>
          </tr>
        </thead>

        <tbody>
          {this.state.table.map((t, index) => {
            return (
              <tr key={index}>
                <td>{t.Iteration}</td>
                <td>{t.x.toFixed(6)}</td>
                <td>{t.Fx.toFixed(6)}</td>
                <td>{t.Error + "%"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  getTitle = () => {
    return "... Method";
  };

  renderForm() {
    return (
      <>
        <h2>{this.getTitle()}</h2>
        <form>
          <span className="ip">
            <label>X left : </label>
            <input
              type="number"
              placeholder="0.00"
              value={this.state.xL}
              onChange={(xl) => this.setxL(parseFloat(xl.target.value))}
            />
          </span>

          <span className="ip">
            <label>X right : </label>
            <input
              type="number"
              placeholder="2.00"
              value={this.state.xR}
              onChange={(xr) => this.setxR(parseFloat(xr.target.value))}
            />
          </span>

          <span className="ip">
            <label>Error : </label>
            <input
              type="number"
              placeholder="0.000001"
              value={this.state.error}
              onChange={(e) => this.setError(parseFloat(e.target.value))}
            />
          </span>

          <span className="ip">
            <label>Enter f(x) : </label>
            <input
              type="text"
              placeholder="x^4-13"
              value={this.state.fx}
              onChange={(f) => this.setFx(f.target.value)}
            />
          </span>

          <div>
            <div>
              <button className="content-btn" type="button" onClick={this.getExample}>
                Example
              </button>
              <button className="content-btn" type="button" onClick={this.calculate}>
                Calculate
              </button>
              <button className="content-btn" type="submit">Clear</button>
            </div>
          </div>
        </form>
      </>
    );
  }

  render() {
    return (
      <>
        {this.renderHead()}
        <main>
          {this.renderForm()}
          <div className="graph"> {this.createGraph()} </div>
          <div id="table"> {this.createTable()} </div>
        </main>
      </>
    );
  }
}

export default BasePage
