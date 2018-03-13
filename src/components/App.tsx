import * as React from 'react'
import GraphScene from './graph/GraphScene'
import { css, StyleSheet } from 'aphrodite'

import Navbar from './Navbar'
import Sidebar from './Sidebar'

import { cyan500 } from 'material-ui/styles/colors'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import { AppBar, Drawer, MenuItem } from 'material-ui'

const appBarHeight = 48 // TODO trovare una soluzione migliore

const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan500
    },
    appBar: {
        height: appBarHeight
    }
})

const styles = StyleSheet.create({
    expand: {
        flex: 1
    },
    appbar: {
        backgroundColor: 'rgba(63,81,181, 0.6)'
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
    isDrawerOpen: boolean
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props)
        this.state = {
            graphId: 'eth-1h',
            isDrawerOpen: false
        }
    }

    selectGraph = (graphId: string) => {
        this.setState({
            ...this.state,
            graphId
        })
    }

    onBurgerClick = (e: any) => {
        this.setState({
            ...this.state,
            isDrawerOpen: !this.state.isDrawerOpen
        })
    }

    render() {
        const { graphId, isDrawerOpen } = this.state
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div
                    className={css(styles.expand)}
                    onClick={(e: any) => console.log('click', e)}
                >
                    <AppBar
                        title={graphId}
                        onLeftIconButtonClick={this.onBurgerClick}
                        className={css(styles.appbar)}
                    />
                    <Drawer
                        containerClassName={css(styles.drawer)}
                        open={isDrawerOpen}
                    >
                        <MenuItem>Menu Item</MenuItem>
                        <MenuItem>Menu Item 2</MenuItem>
                    </Drawer>
                    <GraphScene graphId={graphId} />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App
