import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import Renderer from '../../graph/renderer'
import { Graph, GraphNode } from '../../utils/types'

import config from '../../config'

const styles = StyleSheet.create({
    graphContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        overflow: 'hidden',
        background: 'black'
    }
})
interface GalaxyProps {
    graph?: Graph
    onNodeClik: (e: any, node: GraphNode) => any
    bindFocusOnNode: (focusOnNode: (nodeId: number) => void) => void
}

interface GalaxyState {
    graph?: Graph
}
class Galaxy extends React.Component<GalaxyProps, GalaxyState> {
    container: HTMLDivElement
    renderer: Renderer

    constructor(props: GalaxyProps) {
        super(props)
        this.state = {
            graph: props.graph
        }
        this.renderGraph = this.renderGraph.bind(this)
        this.stopRotation = this.stopRotation.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.renderer = new Renderer(this.container)
            // Used to pass the focusOnNode function to App.jsx
            this.props.bindFocusOnNode(this.renderer.focusOnNode)
            // this.focus()
        }, 1)
    }

    componentWillReceiveProps(newProps: GalaxyProps) {
        const { graph } = newProps
        if (graph !== this.props.graph) {
            this.setState({
                graph
            })
            if (graph) {
                this.renderGraph(graph)
            }
        }
    }

    renderGraph(graph: Graph) {
        this.renderer.reset()
        const { pos, lookAt } = config.camera
        this.renderer.configCamera({
            pos,
            lookAt
        })
        this.renderer.configHitTest({
            onOver: (e: any, node: GraphNode) => {},
            onClick: this._handleClick
        })
        this.renderer.render(graph)
    }

    _handleClick = (e: any, node: GraphNode) => {
        const { id, label } = node
        this.props.onNodeClik(e, node)
    }

    stopRotation() {
        this.renderer.setCameraRotate(false)
    }

    focus() {
        this.container.focus()
    }

    render() {
        return (
            <div
                className={css(styles.graphContainer)}
                ref={(ref: HTMLDivElement) => (this.container = ref)}
                onClick={this.stopRotation}
            />
        )
    }
}

export default Galaxy
