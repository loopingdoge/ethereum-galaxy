import * as React from 'react'
import GraphScene from './graph/GraphScene'
import { css, StyleSheet } from 'aphrodite'

import Navbar from './layout/Navbar'
import Sidebar from './sidebar/Sidebar'

const appBarHeight = 48 // TODO trovare una soluzione migliore

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
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props)
        this.state = {
            graphId: 'eth-1h',
            isSidebarOpen: false
        }
    }

    selectGraph = (graphId: string) => {
        this.setState({
            ...this.state,
            graphId
        })
    }

    toggleSidebar = (e: any) => {
        this.setState({
            ...this.state,
            isSidebarOpen: !this.state.isSidebarOpen
        })
    }

    render() {
        const { graphId, isSidebarOpen } = this.state
        return (
            <div className={css(styles.expand)}>
                <Navbar openSidebar={this.toggleSidebar} />
                <Sidebar
                    isOpen={isSidebarOpen}
                    graphs={['eth-1h', 'eth-6h']}
                    selectedGraph={graphId}
                    selectGraph={this.selectGraph}
                    closeSidebar={this.toggleSidebar}
                />
                <GraphScene graphId={graphId} />
            </div>
        )
    }
}

export default App
