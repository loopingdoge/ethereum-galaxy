import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    sidebar: {
        flex: 1,
        flexDirection: 'column'
    }
})

interface SidebarProps {
    selectGraph: (graphId: string) => void
}
class Sidebar extends React.Component<SidebarProps> {
    render() {
        const selectGraph = this.props.selectGraph
        return (
            <div className={css(styles.sidebar)}>
                <button onClick={() => selectGraph('eth-1h')}>eth-1h</button>
                <button onClick={() => selectGraph('eth-6h')}>eth-6h</button>
            </div>
        )
    }
}

export default Sidebar
