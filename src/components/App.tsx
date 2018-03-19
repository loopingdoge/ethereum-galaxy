import * as React from 'react'
import Galaxy from './galaxy/Galaxy'
import { css, StyleSheet } from 'aphrodite'

import { GraphNode } from '../utils/types'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import KeysLegend from './KeysLegend'
import config from '../config'

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
    isSidebarOpen: boolean
    searchInput?: string
    isLegendOpen: boolean
}

class App extends React.Component<{}, AppState> {
    galaxy: Galaxy

    constructor(props: any) {
        super(props)
        this.state = {
            graphId: config.defaultGraph,
            isSidebarOpen: false,
            searchInput: undefined,
            isLegendOpen: true
        }

        document.addEventListener('click', this.onClick)
    }

    selectGraph = (graphId: string) => {
        this.setState({
            ...this.state,
            graphId
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

    toggleSidebar = (e: any) => {
        const isSidebarOpen = !this.state.isSidebarOpen
        this.setState(
            {
                ...this.state,
                isSidebarOpen
            },
            () => {
                !isSidebarOpen && this.galaxy.focus()
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
        const { graphId, isSidebarOpen, searchInput, isLegendOpen } = this.state
        return (
            <div className={css(styles.expand)}>
                <Navbar
                    searchInput={searchInput}
                    openSidebar={this.toggleSidebar}
                />
                <Sidebar
                    isOpen={isSidebarOpen}
                    graphs={['eth-1h', 'eth-6h', 'eth-1h-new']}
                    selectedGraph={graphId}
                    selectGraph={this.selectGraph}
                    closeSidebar={this.toggleSidebar}
                />
                <KeysLegend isOpen={isLegendOpen} />
                <Galaxy
                    graphId={graphId}
                    onNodeClik={this.onNodeClick}
                    ref={(ref: Galaxy) => (this.galaxy = ref)}
                />
            </div>
        )
    }
}

export default App
