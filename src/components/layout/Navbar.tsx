import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MdMenu } from 'react-icons/lib/md'

const styles = StyleSheet.create({
    container: {
        position: 'fixed',
        width: '392px',
        height: '48px',
        margin: '8px 0px 8px 8px',
        display: 'flex',
        flexDirection: 'row',
        background: 'rgba( 256, 256, 256, .5 )',
        zIndex: 100
    },
    sidebarButton: {
        width: 56,
        height: 48,
        fontSize: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

interface NavbarProps {
    openSidebar: (e: any) => void
}

class Navbar extends React.Component<NavbarProps> {
    render() {
        const { openSidebar } = this.props
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.sidebarButton)}>
                    <MdMenu onClick={openSidebar} />
                </div>
            </div>
        )
    }
}

export default Navbar
