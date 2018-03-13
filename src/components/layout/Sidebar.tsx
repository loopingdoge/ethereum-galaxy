import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import SidebarItem from './SidebarItem'

const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: 300,
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, .5)',
        zIndex: 100
    }
})

interface SidebarProps {
    isOpen: boolean
    graphs: string[]
    selectedGraph: string
    selectGraph: (graphId: string) => void
}

class Sidebar extends React.Component<SidebarProps> {
    render() {
        const { selectGraph, graphs, selectedGraph } = this.props
        return (
            <div className={css(styles.sidebar)}>
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
