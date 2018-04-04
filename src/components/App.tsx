import * as React from 'react'
import Galaxy from './galaxy/Galaxy'
import { css, StyleSheet } from 'aphrodite'

import loadGraph from '../graph/loader'
import { Graph, GraphNode } from '../utils/types'
import config from '../config'

import Sidebar from './sidebar/Sidebar'
import Navbar from './navbar/Navbar'
import GalaxyInfo from './GalaxyInfo'
import KeysLegend from './KeysLegend'

const appBarHeight = 48

const styles = StyleSheet.create({
    expand: {
        flex: 1
    },
    toolbar: {
        backgroundColor: 'rgba(63,81,181, 0.6)',
        padding: 5
    },
    drawer: {
        height: '100%',
        paddingTop: appBarHeight,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
})

interface AppState {
    graphId: string
    graph?: Graph
    isSidebarOpen: boolean
    searchInput?: string
    isLegendOpen: boolean
}

class App extends React.Component<{}, AppState> {
    galaxyRef: Galaxy
    focusOnGraphNode: (nodeId: number) => void

    constructor(props: any) {
        super(props)

        // Selects the 4h graph closest to the current time
        const latestIndex = Math.trunc(new Date().getHours() / 4)
        const selectedLabel = config.graphs[4][latestIndex]
        const graphId = `eth-4/${selectedLabel}`

        this.state = {
            graphId,
            graph: undefined,
            isSidebarOpen: false,
            searchInput: undefined,
            isLegendOpen: true
        }

        document.addEventListener('click', this.onClick)
        this.selectGraph(this.state.graphId)
    }

    selectGraph = (graphId: string) => {
        loadGraph(graphId).then((graph: Graph) => {
            this.setState({
                ...this.state,
                graphId,
                graph
            })
        })
    }

    onClick = (e: any) => {
        this.openLegend(false)
    }

    onNodeClick = (e: any, node: GraphNode) => {
        const { id, label } = node
        this.setState({
            ...this.state,
            searchInput: label
        })
    }

    getNodeInfo = (address: string) => {
        const { graph } = this.state
        let nodeInfo = undefined
        if (graph) {
            const id = graph.labels.indexOf(address)
            if (id >= 0) {
                nodeInfo = {
                    id,
                    inLinks: graph.inLinks[id] || [],
                    outLinks: graph.outLinks[id] || []
                }
            }
        }

        return nodeInfo
    }

    focusOnNode = (nodeId: number) => {
        this.focusOnGraphNode(nodeId)
    }

    bindFocusOnNode = (focusOnGraphNode: any) => {
        this.focusOnGraphNode = focusOnGraphNode
    }

    toggleSidebar = (e: any) => {
        const isSidebarOpen = !this.state.isSidebarOpen
        this.setState(
            {
                ...this.state,
                isSidebarOpen
            },
            () => {
                !isSidebarOpen && this.galaxyRef.focus()
            }
        )
    }

    openLegend = (open: boolean) => {
        const { isLegendOpen } = this.state
        if (isLegendOpen !== open) {
            this.setState({
                ...this.state,
                isLegendOpen: open
            })
        }
    }

    render() {
        const {
            graphId,
            graph,
            isSidebarOpen,
            searchInput,
            isLegendOpen
        } = this.state
        return (
            <div className={css(styles.expand)}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    selectedGraph={graphId}
                    selectGraph={this.selectGraph}
                    closeSidebar={this.toggleSidebar}
                />
                <Navbar
                    searchInput={searchInput}
                    openSidebar={this.toggleSidebar}
                    focusOnNode={this.focusOnNode}
                    getNodeInfo={this.getNodeInfo}
                />
                <GalaxyInfo graph={graph} />
                <KeysLegend isOpen={isLegendOpen} />
                <Galaxy
                    graph={graph}
                    onNodeClik={this.onNodeClick}
                    bindFocusOnNode={this.bindFocusOnNode}
                    ref={(ref: Galaxy) => (this.galaxyRef = ref)}
                />
            </div>
        )
    }
}

export default App
