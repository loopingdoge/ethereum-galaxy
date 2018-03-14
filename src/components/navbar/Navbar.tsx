import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MdMenu, MdSearch } from 'react-icons/lib/md'

import Button from '../Button'
import SearchResult from './SearchResult'

const styles = StyleSheet.create({
    navbarContainer: {
        position: 'fixed',
        width: 475,
        height: 48,
        margin: '8px 0px 8px 8px',
        zIndex: 100
    },
    innerContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        background: 'rgba( 256, 256, 256, .3 )',
        ':hover': {
            background: 'rgba( 256, 256, 256, .8 )'
        },
        ':focus': {
            background: 'rgba( 256, 256, 256, .8 )'
        }
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

interface NavbarState {
    isSearching: boolean
}

class Navbar extends React.Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
        super(props)
        this.state = {
            isSearching: false
        }
    }

    search(address: string) {
        console.log('TODO search', address)
        this.setState({
            ...this.state,
            isSearching: true
        })
    }

    render() {
        const { openSidebar } = this.props
        return (
            <div className={css(styles.navbarContainer)}>
                <div className={css(styles.innerContainer)}>
                    <Button icon={<MdMenu />} onClick={openSidebar} />
                    <form className={css(styles.searchInputWrapper)}>
                        <input
                            className={css(styles.searchInput)}
                            type="text"
                            defaultValue="Search address..."
                        />
                    </form>
                    <Button
                        icon={<MdSearch />}
                        onClick={() => this.search('dajkh')}
                    />
                </div>
                {this.state.isSearching ? (
                    <SearchResult
                        address={'0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}
                    />
                ) : null}
            </div>
        )
    }
}

export default Navbar
