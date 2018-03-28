import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MdMenu, MdInfoOutline } from 'react-icons/lib/md'

import config from '../../config'
import SidebarItem from './SidebarItem'
import Button from '../Button'

const sidebarWidth = 300
const headerHeight = 64

const openBackdrop = {
    '0%': {
        backgroundColor: 'rgba(100, 100, 100, 0)'
    },
    '100%': {
        backgroundColor: 'rgba(100, 100, 100, .4)'
    }
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(100, 100, 100, .4)',
        zIndex: 200,
        animationName: [openBackdrop],
        animationDuration: '.5s'
    },
    nobackdrop: {
        width: 0,
        height: 0
    },
    sidebarContainer: {
        transition: 'transform .5s',
        position: 'absolute',
        top: 0,
        left: -sidebarWidth,
        height: '100%',
        width: 300,
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, .8)',
        zIndex: 200,
        fontFamily: 'sans-serif'
    },
    sidebarContent: {
        height: `calc(100% - ${headerHeight}px)`,
        overflowY: 'scroll'
    },
    closed: {
        transform: `translateX(0px)`
    },
    opened: {
        transform: `translateX(${sidebarWidth}px)`
    },
    sidebarHeader: {
        height: headerHeight,
        padding: '0px 8px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgb(60, 113, 187)',
        boxShadow:
            'inset 1px 1px 0 rgba(0,0,0, .1), inset 0 -1px 0 rgba(0,0,0, .07)',
        color: 'white'
    },
    sidebarTitle: {
        width: '100%',
        fontSize: 22,
        textAlign: 'center'
    }
})

interface SidebarProps {
    isOpen: boolean
    selectedGraph: string
    selectGraph: (graphId: string) => void
    closeSidebar: (e: any) => void
}

class Sidebar extends React.Component<SidebarProps> {
    openInfoURL(e: MouseEvent) {
        window.open('https://github.com/loopingdoge/ethereum-galaxy', '_blank')
    }

    render() {
        const { selectGraph, selectedGraph, closeSidebar, isOpen } = this.props

        const { graphs } = config

        return (
            <>
                <div
                    className={css(
                        isOpen ? styles.backdrop : styles.nobackdrop
                    )}
                    onClick={closeSidebar}
                />
                <div
                    className={css(
                        styles.sidebarContainer,
                        isOpen ? styles.opened : styles.closed
                    )}
                >
                    <div className={css(styles.sidebarHeader)}>
                        <Button icon={<MdMenu />} onClick={closeSidebar} />
                        <div className={css(styles.sidebarTitle)}>
                            Ethereum Galaxy
                        </div>
                        <Button
                            icon={<MdInfoOutline />}
                            onClick={this.openInfoURL}
                        />
                    </div>
                    <div className={css(styles.sidebarContent)}>
                        {Object.keys(graphs).map(type =>
                            graphs[type].map((hour: any) => {
                                const id = `${type}/${hour}`
                                return (
                                    <SidebarItem
                                        key={id}
                                        graphId={id}
                                        onClick={selectGraph}
                                        isSelected={id === selectedGraph}
                                    />
                                )
                            })
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default Sidebar
