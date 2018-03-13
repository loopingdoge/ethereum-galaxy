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
    drawer: {
        // TODO trovare una soluzione migliore
        top: appBarHeight - 8,
        paddingTop: 8,
        height: `calc( '100%' - ${appBarHeight - 8}px )`,
        zIndex: 1000
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
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div
                    className={css(styles.expand)}
                    onClick={(e: any) => console.log('click', e)}
                >
                    <AppBar
                        title="My AppBar"
                        onLeftIconButtonClick={this.onBurgerClick}
                    />
                    <Drawer
                        containerClassName={css(styles.drawer)}
                        open={this.state.isDrawerOpen}
                    >
                        <MenuItem>Menu Item</MenuItem>
                        <MenuItem>Menu Item 2</MenuItem>
                    </Drawer>
                    <GraphScene graphId={this.state.graphId} />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App
