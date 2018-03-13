import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MdMenu, MdSearch } from 'react-icons/lib/md'

const styles = StyleSheet.create({
    navbarContainer: {
        position: 'fixed',
        width: 475,
        height: 48,
        margin: '8px 0px 8px 8px',
        display: 'flex',
        flexDirection: 'row',
        background: 'rgba( 256, 256, 256, .3 )',
        zIndex: 100,
        ':hover': {
            background: 'rgba( 256, 256, 256, .8 )'
        },
        ':focus': {
            background: 'rgba( 256, 256, 256, .8 )'
        }
    },
    sidebarButton: {
        width: 56,
        height: 48,
        fontSize: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    searchInputWrapper: {
        width: '100%',
        padding: '0px 6px'
    },
    searchInput: {
        width: '100%',
        height: '100%',
        border: 0,
        fontSize: 15,
        background: 'transparent',
        ':focus': {
            outline: 'none'
        }
    }
})

interface NavbarProps {
    openSidebar: (e: any) => void
}

class Navbar extends React.Component<NavbarProps> {
    render() {
        const { openSidebar } = this.props
        return (
            <div className={css(styles.navbarContainer)}>
                <div className={css(styles.sidebarButton)}>
                    <MdMenu onClick={openSidebar} />
                </div>
                <form className={css(styles.searchInputWrapper)}>
                    <input
                        className={css(styles.searchInput)}
                        type="text"
                        defaultValue="Search address..."
                    />
                </form>
                <div className={css(styles.sidebarButton)}>
                    <MdSearch />
                </div>
            </div>
        )
    }
}

export default Navbar
