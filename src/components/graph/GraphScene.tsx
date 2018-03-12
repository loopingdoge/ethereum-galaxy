import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import loadGraph from '../../graph/loader'
import Renderer from '../../graph/renderer'
import { Graph } from '../../utils/types'

const styles = StyleSheet.create({
    graphContainer: {
        width: '100%',
        height: '100%',
        background: 'blue'
    }
})
interface GraphSceneProps {
    graphId: string
    width: string
    height: string
}

class GraphScene extends React.Component<GraphSceneProps> {
    container: HTMLDivElement

    componentDidMount() {
        loadGraph(this.props.graphId).then((graph: Graph) => {
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

export default GraphScene
