import * as React from 'react'
import './App.css'
import Graph from './graph/Graph'
import * as ethGraph from './test/input.json'
import { d3Types } from './utils/types'

const logo = require('./logo.svg')

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    <Graph
                        width={400}
                        height={400}
                        graph={(ethGraph as object) as d3Types.d3Graph}
                    />
                </p>
            </div>
        )
    }
}

export default App
