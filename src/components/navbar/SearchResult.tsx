import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import { getJson } from '../../utils/xhr'

const styles = StyleSheet.create({
    searchResultContainer: {
        width: '100%',
        height: 400,
        background: 'rgba( 255, 255, 255, .6 )',
        fontFamily: 'sans-serif',
        fontSize: '20',
        color: '#333',
        paddingTop: 20
    },
    resultRow: {
        height: 36,
        padding: '4px 20px'
    }
})

interface SearchResultProps {
    address: string
}

interface SearchResultState {
    result: any
}

class SearchResult extends React.Component<
    SearchResultProps,
    SearchResultState
> {
    constructor(props: SearchResultProps) {
        super(props)
        this.getInfo(props.address)
        this.state = {
            result: undefined
        }
    }

    getInfo(address: string) {
        getJson(
            `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=freekey`
        ).then((result: any) => {
            this.setState({
                result
            })
            console.log(result)
        })
    }

    render() {
        const { result } = this.state
        const type = ''
        return result ? (
            <div className={css(styles.searchResultContainer)}>
                <div className={css(styles.resultRow)}>
                    <b>Address type:</b> {type}
                </div>
                <div className={css(styles.resultRow)}>
                    <b>Balance:</b> {result.ETH.balance} ETH
                </div>
                <div className={css(styles.resultRow)}>
                    <b>Total In:</b> {result.ETH.totalIn} ETH
                </div>
                <div className={css(styles.resultRow)}>
                    <b>Total Out:</b> {result.ETH.totalOut} ETH
                </div>
            </div>
        ) : (
            <div className={css(styles.searchResultContainer)}>No results</div>
        )
    }
}

export default SearchResult
