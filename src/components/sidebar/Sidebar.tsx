import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MdMenu } from 'react-icons/lib/md'

import SidebarItem from './SidebarItem'

const styles = StyleSheet.create({
    sidebarContainer: {
        position: 'absolute',
        top: 0,
        left: -300,
        height: '100%',
        width: 300,
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, .4)',
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
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(210, 210, 210)',
        borderBottom: '1px solid rgb(150, 150, 150)'
    },
    sidebarTitle: {
        width: '100%',
        fontSize: 24,
        textAlign: 'center'
    },
    closeButton: {
        width: 56,
        height: 48,
        fontSize: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
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
            <div
                className={css(
                    styles.sidebarContainer,
                    isOpen && styles.opened
                )}
            >
                <div className={css(styles.sidebarHeader)}>
                    <div className={css(styles.sidebarTitle)}>
                        Choose a graph
                    </div>
                    <div
                        className={css(styles.closeButton)}
                        onClick={closeSidebar}
                    >
                        <MdMenu />
                    </div>
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
