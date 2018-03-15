import * as React from 'react'
import Galaxy from './galaxy/Galaxy'
import { css, StyleSheet } from 'aphrodite'

import Navbar from './navbar/Navbar'
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
    galaxy: Galaxy

    constructor(props: any) {
        super(props)
        this.state = {
            graphId: 'eth-6h',
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
                <Galaxy
                    graphId={graphId}
                    ref={(ref: Galaxy) => (this.galaxy = ref)}
                />
            </div>
        )
    }
}

export default App
