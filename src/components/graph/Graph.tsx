import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import loadGraph from '../../graph/loader'

const styles = StyleSheet.create({
    graphContainer: {
        width: '100%',
        height: '100%',
        background: 'blue'
    }
})
interface GraphProps {
    width: string
    height: string
}

class Graph extends React.Component<GraphProps> {
    componentDidMount() {
        loadGraph('eth-h18').then(a => {
            console.log(a)
        })
    }

    render() {
        return <div className={css(styles.graphContainer)} />
    }
}

export default Graph
