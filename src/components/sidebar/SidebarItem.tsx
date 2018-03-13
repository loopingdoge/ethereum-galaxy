import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    sidebarItemContainer: {
        display: 'flex',
        height: 44,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        color: '#fff',
        userSelect: 'none',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(200, 200, 200, .6)'
        },
        ':active': {
            backgroundColor: 'rgba(200, 200, 0, .6)'
        }
    },
    selected: {
        backgroundColor: 'rgba(200, 200, 0, .6)'
    }
})

interface SidebarItemProps {
    graphId: string
    onClick: (graphId: string) => void
    isSelected: boolean
}

class SidebarItem extends React.Component<SidebarItemProps> {
    render() {
        const { graphId, onClick, isSelected } = this.props
        return (
            <div
                className={css(
                    styles.sidebarItemContainer,
                    isSelected && styles.selected
                )}
                onClick={() => onClick(graphId)}
            >
                <b>{graphId}</b>
            </div>
        )
    }
}

export default SidebarItem
