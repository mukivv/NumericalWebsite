import BasePage from './BasePage';
import '../index.css'

class BasePage2 extends BasePage {
  constructor(props) {
    super(props);

    this.state = {
      xInitial: 0,
      x: 0,
      error: 0.000001,
      fx: "",
      table: [],
    };
  }

  setxInitial = (xInitial) => this.setState({ xInitial: xInitial });

  setx = (x) => this.setState({ x: x });

  renderForm() {
    return (
      <>
        <h2>{this.getTitle()}</h2>
        <form>
          <span className="ip">
            <label>X initial : </label>
            <input
              type="number"
              placeholder="0.00"
              value={this.state.xInitial}
              onChange={(xInitial) => this.setxInitial(parseFloat(xInitial.target.value))}
            />
          </span>

          {/*<span className="ip">
            <label>X : </label>
            <input
              type="number"
              placeholder="2.00"
              value={this.state.xR}
              onChange={(xr) => this.setxR(parseFloat(xr.target.value))}
            />
          </span>*/}

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
            <label>Enter function : </label>
            <input
              type="text"
              placeholder="(x+7)/(x+1)"
              value={this.state.fx}
              onChange={(f) => this.setFx(f.target.value)}
            />
          </span>

          <div>
            <div className="">
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

export default BasePage2
