import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import SidebarItem from './SidebarItem'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: -300,
        height: '100%',
        width: 300,
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, .5)',
        zIndex: 100,
        fontFamily: 'sans-serif'
    },
    opened: {
        left: 0
    },
    sidebarHeader: {
        height: 64,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(210, 210, 210)',
        borderBottom: '1px solid rgb(150, 150, 150)'
    },
    sidebarTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30
    },
    closeButton: {
        float: 'right',
        width: 48,
        height: 48,
        background: 'blue'
    }
})

interface SidebarProps {
    isOpen: boolean
    graphs: string[]
    selectedGraph: string
    selectGraph: (graphId: string) => void
    closeSidebar: (e: any) => void
}

class Sidebar extends React.Component<SidebarProps> {
    render() {
        const {
            selectGraph,
            graphs,
            selectedGraph,
            closeSidebar,
            isOpen
        } = this.props
        return (
            <div className={css(styles.container, isOpen && styles.opened)}>
                <div className={css(styles.sidebarHeader)}>
                    <div className={css(styles.sidebarTitle)}>
                        Choose a graph
                    </div>
                    <div
                        className={css(styles.closeButton)}
                        onClick={closeSidebar}
                    />
                </div>
                {graphs.map((g: string) => (
                    <SidebarItem
                        key={g}
                        graphId={g}
                        onClick={selectGraph}
                        isSelected={g === selectedGraph}
                    />
                ))}
            </div>
        )
    }
}

export default Sidebar
