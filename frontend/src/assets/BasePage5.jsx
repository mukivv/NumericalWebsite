import BasePage from './BasePage.jsx'
import Plotly from 'react-plotly.js'
import { evaluate } from 'mathjs'
import { CompositeSimpson } from '../numer/Integration/CompositeSimpson.js'

class BasePage5 extends BasePage{
    constructor(props){
        super(props)
        this.state = {
            a: "",
            b: "",
            fx: "",
            n: "",
            /*error : 0.000001,*/
            table: []
        }

        this.cal = null
    }

    getTitle = () => {
        return "...Method"
    }

    setA = (e) => { this.setState({a: e})}
    setB = (e) => { this.setState({b: e})}
    setFx = (e) => { this.setState({fx: e})}
    setN = (e) => { this.setState({n: e})}
    /*setError = (e) => { this.setState({error: e})}*/

    createGraph = () => {
        const tableX = this.state.table.map((t) => t.x)
        const tableY = this.state.table.map((t) => t.fx)
        const traces = []
            
        for (let i = 0; i < tableX.length - 1; i += 2) {

            const xSegment = tableX.slice(i, i + 3)
            const ySegment = tableY.slice(i, i + 3)
                

            const xFill = [...xSegment, ...xSegment.slice().reverse()]
            const yFill = [...ySegment, ...ySegment.slice().reverse().map(() => 0)]
                
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

            if (this.cal instanceof CompositeSimpson) {
                const xMid = tableX[i + 1];
                const yMid = tableY[i + 1];

                traces.push({
                    x: [xMid, xMid], // จุดเริ่มต้น: (x_{i+1}, 0), จุดสิ้นสุด: (x_{i+1}, y_{i+1})
                    y: [0, yMid],
                    type: 'scatter',
                    mode: 'lines',
                    line: { color: 'rgba(70, 61, 144, 1)', width: 1, dash: 'dash' }, // เส้นสีเข้ม บางๆ
                    showlegend: false,
                    hoverinfo: 'skip',
                });
            }
        }
            
        traces.push({
            x: tableX,
            y: tableY,
            type: 'scatter',
            mode: 'lines+markers',
            fill: 'none',
            line: { color: 'rgba(24, 66, 108, 1)', width: 2 , dash: 'dash'},
            marker: { size: 7, color: 'rgb(0, 100, 200)'},
            name: 'l'
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
                hoverinfo: 'skip',
                name: 'f(x)',
                })
            
        return(
        <Plotly
            data = {traces}
            layout = {{
                dragmode: 'pan',
                xaxis: { title: { text: "x", font: { family: "Arial, sans-serif", size: 16,  weight: "bold", color: "#081970de" } }},
                yaxis: { title: { text: "f(x)", font: { family: "Arial, sans-serif", size: 16, weight: "bold", color: "#081970de" } }},
                legend: {
                    orientation: "h", // วางแนวนอน Horizontal
                    yanchor: "bottom", //จุดยึด
                    y: 1.02,          // วาง Legend เหนือพื้นที่พล็อต 0: ขอบล่างสุดของพื้นที่พล็อต (แกน X). 1: ขอบบนสุดของพื้นที่พล็อต. 1.02 (ค่าเดิม): อยู่เหนือขอบบนของพล็อตเล็กน้อย (เพื่อไม่ให้บังกราฟ).
                    xanchor: "center", // จัดให้อยู่ตรงกลางแนวนอน
                    x: 0.5 // จัดให้อยู่ตรงกลางกราฟ 0: ขอบซ้ายสุดของพื้นที่กราฟ. 0.5: กลางกราฟ. 1: ขอบขวาสุดของพื้นที่กราฟ.
                }
            }}
            config = {{
                responsive: true,
                scrollZoom: true,
                displaylogo: false,
                displayModeBar: false
            }}
            style={{
                width: '100%' , height: '500px'
            }}
                
        />)
    }

    createTable = () => {

    }

    renderForm() {
        return(
            <>
            <h2> {this.getTitle()} </h2>
            <form>
                <span className='ip'>
                    <label> Enter a: </label>
                    <input
                        type = 'number'
                        value = {this.state.a}
                        placeholder = '0'
                        onChange = {(e) => this.setA(parseFloat(e.target.value))}
                    />
                </span>

                <span className='ip'>
                    <label> Enter b: </label>
                    <input
                        type = 'number'
                        value = {this.state.b}
                        placeholder = '0'
                        onChange = {(e) => this.setB(parseFloat(e.target.value))}
                    />
                </span >

                <span className='ip'>
                    <label> Enter f(x): </label>
                    <input
                        type = 'text'
                        value = {this.state.fx}
                        placeholder = '0'
                        onChange = {(e) => this.setFx(e.target.value)}
                    />
                </span>

                <span className='ip'>
                    <label> Enter n: </label>
                    <input
                        type = 'number'
                        value = {this.state.n}
                        placeholder = '0'
                        onChange = {(e) => this.setN(parseFloat(e.target.value))}
                    />
                </span>

                {/*<span className='ip'>
                    <label> Error: </label>
                    <input
                        type = 'number'
                        value = {this.state.a}
                        placeholder = '0'
                        onChange = {(e) => this.setError(parseFloat(e.target.value))}
                    />
                </span>*/}
                
                <div>
                    <button type='button'  className='content-btn' onClick={this.calculate}> Calculate </button>
                    <button type='submit' className='content-btn'> Clear </button>
                </div>
            </form>
            </>
        )
    }

}

export default BasePage5