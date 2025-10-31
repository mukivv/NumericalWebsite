import BasePage5 from '../../assets/BasePage5.jsx'
import { CompositeTrapezoidal } from '../../numer/Integration/CompositeTrapezoidal.js'
import Plotly from 'react-plotly.js'
import { evaluate } from 'mathjs'

class CompositeTrapezoidalPage extends BasePage5 {

    getTitle = () => {
        return "Composite Trapezoidal's Rule"
    }

    calculate = () => {
        try{
            const {a,b,fx,n} = this.state

            this.cal = new CompositeTrapezoidal(a,b,fx,n)
            this.setState({ table: this.cal.calculate() })

        } catch(error){
            alert(error.message)
        }
    }

    createGraph = () => {
        const tableX = this.state.table.map((t) => t.x)
        const tableY = this.state.table.map((t) => t.fx)
        const traces = []
                
        for (let i = 0; i < tableX.length - 1; i ++) {
    
            const xRange = tableX.slice(i, i+2)
            const yRange = tableY.slice(i, i+2)
                    
            const xFill = [...xRange, ...xRange.slice().reverse()]
            const yFill = [...yRange, ...yRange.slice().reverse().map(() => 0)]
                    
            traces.push({
                    x: xFill,
                    y: yFill,
                    type: 'scatter',
                    fill: 'toself',
                    mode: 'lines',
                    line: { width: 0 },
                    showlegend: false,
                    hoverinfo: 'skip'
            })
        }
                
        traces.push({
            x: tableX,
            y: tableY,
            type: 'scatter',
            mode: 'lines+markers',
            line: { color: 'rgb(0, 100, 200)', width: 2 },
            marker: { size: 5, color: 'rgb(0, 100, 200)'}
        })
    
        const minX = Math.min(...tableX);
        const maxX = Math.max(...tableX);
        const step = (maxX - minX) / 200;
                
        const smoothX = [];
        const smoothY = [];
                
        for (let x = minX; x <= maxX; x += step) {
            const y = evaluate(this.state.fx, {x:x});
            smoothX.push(x);
            smoothY.push(y);
        }
            
        traces.push({
            x: smoothX,
            y: smoothY,
            type: 'scatter',
            mode: 'lines',
            line: { color: 'rgb(255, 0, 0)', width: 2 },
            name: 'f(x)',
            hoverinfo: 'skip',
            showlegend: false
        })
                
        return(
            <Plotly
                data = {traces}
                layout = {{
                    dragmode: 'pan',
                    xaxis: { title: 'x' },
                    yaxis: { title: 'f(x)' },
                    showlegend: false,
                }}
                config = {{
                    responsive: true,
                    scrollZoom: true,
                    displayModeBar: false,
                    displaylogo: false
                }}
                style={{
                    width: '100%' , height: '500px'
                }}
                    
            />)
        }

}
export default CompositeTrapezoidalPage