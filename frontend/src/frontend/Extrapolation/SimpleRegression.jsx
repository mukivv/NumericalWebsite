import Basepage4 from '../../assets/BasePage4.jsx'
import { SimpleRegression } from '../../numer/Extrapolation/SimpleRegression.js'
import Plot from 'react-plotly.js'

class SimpleRegressionPage extends Basepage4 {

    getTitle = () => {
        return "Simple Regression"
    }

    calculate = () => {
        const { n,X,Y,m,findX} = this.state

        this.cal = new SimpleRegression(X,Y,n,m,findX)
        this.setState({ result: this.cal.calculate()})
    }

    renderForm = () => {
        return (
            <>
            <h2> {this.getTitle()} </h2>
            <form>
                <span className='ip'>
                    <label> Number of point: </label>
                    <input type='number' value={this.state.n} onChange={(e) => this.handle_n(e)}/>
                </span>

                <span className='ip'>
                    <label> m order: </label>
                    <input type='number' value={this.state.m} onChange={(e) => this.setM(parseInt(e.target.value))}/>
                </span>

                <span className='ip'>
                    <label> X: </label>
                    <input type='number' value={this.state.findX} onChange={(e) => this.setFindX(parseFloat(e.target.value))}/>
                </span>
            </form>
            </>
        )
    }

    createGraph = () =>{
        const { result , m , X , Y , findX} = this.state

        if (result === null) return

        const data = []

        data.push({
            x: X,
            y: Y,
            type: 'scatter',
            mode: 'markers',
            name: 'Data',
            marker: { color: 'blue' , width: 5}
        })

        const minX = Math.min(...X)
        const maxX = Math.max(...X)
        const step = (maxX-minX) / 100

        const xx = []
        const yy = []

        for ( let i=minX ; i<= maxX ; i+=step){
            let sumy = 0
            for (let j=0;j<m+1;j++){
                sumy += result[j] * Math.pow(i,j)
            }
            xx.push(i)
            yy.push(sumy)
        }

        data.push({
            x: xx,
            y: yy,
            type: 'scatter',
            mode: 'lines',
            name: 'g(x)',
            line: { color: 'red'},
            hoverinfo: 'skip'
        })

        let sum = 0
        for (let j=0;j<m+1;j++){
            sum += result[j] * Math.pow(findX,j)
        }

        data.push({
            x: [findX],
            y: [sum],
            type: 'scatter',
            mode: 'markers',
            name: 'g(X)',
            marker: { color: 'green' , width: 5}
        })

        return(
            <Plot 
            data = {data}
            style = {{width: '100%' , height: '500px'}}
            layout = {{dragmode: 'pan'}}
            config={{ 
                displayModeBar: false,
                responsive: true,
                scrollZoom: true
            }}
            />
        )

    }

    
}

export default SimpleRegressionPage
