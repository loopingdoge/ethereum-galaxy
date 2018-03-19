import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MdClose, MdMenu, MdSearch } from 'react-icons/lib/md'

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
        borderRadius: 2,
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
    focused: {
        background: 'rgba( 256, 256, 256, .8 )'
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
        },
        '::placeholder': {
            color: 'rgba(0,0,0,.6)'
        }
    }
})

interface NavbarProps {
    openSidebar: (e: any) => void
    searchInput?: string
}

interface NavbarState {
    searchInput: string
    isSearching: boolean
    isFocused: boolean
}

class Navbar extends React.Component<NavbarProps, NavbarState> {
    navbar: any

    constructor(props: NavbarProps) {
        super(props)
        this.state = {
            isSearching: false,
            isFocused: false,
            searchInput: props.searchInput || ''
        }

        this.onSearchInputChange = this.onSearchInputChange.bind(this)
        this.onSearchStart = this.onSearchStart.bind(this)
        this.onSearchEnd = this.onSearchEnd.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
    }

    componentWillReceiveProps(newProps: NavbarProps) {
        const { searchInput } = this.state
        if (newProps.searchInput !== searchInput) {
            this.setState({
                ...this.state,
                searchInput: newProps.searchInput || '',
                isSearching: newProps.searchInput !== undefined
            })
        }
    }

    onSearchInputChange(e: any) {
        this.setState({
            ...this.state,
            searchInput: e.target.value
        })
    }

    onFocus(e: any) {
        this.setState({
            ...this.state,
            isFocused: true
        })
    }

    onBlur(e: any) {
        this.setState({
            ...this.state,
            isFocused: false
        })
    }

    onSearchStart(e: any) {
        this.setState({
            ...this.state,
            isSearching: this.state.searchInput !== ''
        })
    }

    onSearchEnd(e: any) {
        this.setState({
            ...this.state,
            isSearching: false,
            searchInput: ''
        })
    }

    render() {
        const { openSidebar } = this.props
        const { searchInput, isSearching, isFocused } = this.state
        return (
            <div className={css(styles.navbarContainer)}>
                <div
                    className={css(
                        styles.innerContainer,
                        (isFocused || isSearching) && styles.focused
                    )}
                    ref={(ref: any) => (this.navbar = ref)}
                >
                    <Button icon={<MdMenu />} onClick={openSidebar} />
                    <form className={css(styles.searchInputWrapper)}>
                        <input
                            className={css(styles.searchInput)}
                            type="text"
                            value={searchInput}
                            placeholder={'Search an address..'}
                            onChange={this.onSearchInputChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                        />
                    </form>
                    {isSearching ? (
                        <Button icon={<MdClose />} onClick={this.onSearchEnd} />
                    ) : (
                        <Button
                            icon={<MdSearch />}
                            onClick={this.onSearchStart}
                        />
                    )}
                </div>
                {isSearching ? <SearchResult address={searchInput} /> : null}
            </div>
        )
    }
}

export default Navbar
