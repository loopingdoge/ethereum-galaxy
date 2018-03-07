import * as React from 'react'
import Graph from './graph/Graph'
import * as ethGraph from './test/input.json'
import { d3Types } from './utils/types'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    app: {
        width: '100%',
        height: '100%'
    }
})

class App extends React.Component {
    render() {
        return (
            <div className={css(styles.app)}>
                <Graph
                    width={'100%'}
                    height={'90%'}
                    graph={(ethGraph as object) as d3Types.d3Graph}
                />
            </div>
        )
    }
}

export default App
