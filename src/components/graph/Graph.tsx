import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import loadGraph from '../../graph/loader'
import Renderer from '../../graph/renderer'

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
    container: HTMLDivElement

    componentDidMount() {
        loadGraph('eth-h18').then(graph => {
            const renderer = new Renderer(this.container)
            renderer.render(graph)
        })
    }

    render() {
        return (
            <div
                className={css(styles.graphContainer)}
                ref={(ref: HTMLDivElement) => (this.container = ref)}
            />
        )
    }
}

export default Graph
