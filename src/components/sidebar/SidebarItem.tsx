import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MdChevronRight } from 'react-icons/lib/md'

import Button from '../Button'

const styles = StyleSheet.create({
    sidebarItemContainer: {
        height: 44,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
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
    },
    content: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        paddingRight: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30
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
                <div className={css(styles.content)}>{graphId}</div>
                <div className={css(styles.icon)}>
                    <MdChevronRight />
                </div>
            </div>
        )
    }
}

export default SidebarItem
