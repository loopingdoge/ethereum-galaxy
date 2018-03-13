import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import loadGraph from '../../graph/loader'
import Renderer from '../../graph/renderer'
import { Graph, GraphNode } from '../../utils/types'

import config from '../../config'

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

interface GraphSceneState {
    graphId: string
}
class GraphScene extends React.Component<GraphSceneProps, GraphSceneState> {
    container: HTMLDivElement
    renderer: Renderer

    constructor(props: GraphSceneProps) {
        super(props)
        this.state = {
            graphId: props.graphId
        }
        this.renderGraph = this.renderGraph.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.renderer = new Renderer(this.container)
            this.renderGraph(this.props.graphId)
        }, 1)
    }

    componentWillReceiveProps(newProps: GraphSceneProps) {
        if (newProps.graphId !== this.props.graphId) {
            this.setState({
                graphId: newProps.graphId
            })
            this.renderGraph(newProps.graphId)
        }
    }

    renderGraph(graphId: string) {
        loadGraph(graphId).then((graph: Graph) => {
            this.renderer.reset()
            const { pos, lookAt } = config.camera
            this.renderer.configCamera({
                pos,
                lookAt
            })
            this.renderer.configHitTest({
                onOver: (e: any, node: GraphNode) => {},
                onClick: (e: any, node: GraphNode) => {}
            })
            this.renderer.render(graph)
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
