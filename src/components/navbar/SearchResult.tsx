import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    searchResultContainer: {
        width: '100%',
        height: 400,
        background: 'rgba( 255, 255, 255, .6 )'
    }
})

interface SearchResultProps {
    address: string
}

class SearchResult extends React.Component<SearchResultProps> {
    constructor(props: SearchResultProps) {
        super(props)
    }

    getInfo(address: string) {}

    render() {
        return <div className={css(styles.searchResultContainer)} />
    }
}

export default SearchResult
