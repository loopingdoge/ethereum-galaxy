import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import { getJson } from '../../utils/xhr'

const styles = StyleSheet.create({
    searchResultContainer: {
        width: '100%',
        height: 400,
        background: 'rgba( 255, 255, 255, .6 )',
        fontFamily: 'sans-serif',
        color: '#333',
        paddingTop: 1
    },
    innerContainer: {
        margin: 12,
        background: 'rgba(256, 256, 256, 0.7)',
        padding: 20
    },
    resultHeader: {
        fontSize: '18px',
        marginBottom: 18,
        display: 'flex',
        flexDirection: 'column'
    },
    resultGroup: {
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column'
    },
    resultGroupHeader: {
        fontSize: 17,
        fontWeight: 600,
        marginBottom: 8
    },
    resultRow: {
        height: 24
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
        let countTxs = 0
        let type = 'Address'

        if (result && !result.error) {
            if (result.contractInfo) {
                type = 'Contract Address'
            }
            if (result) {
                countTxs = result.countTxs
            }
        }

        return result && !result.error ? (
            <div className={css(styles.searchResultContainer)}>
                <div className={css(styles.innerContainer)}>
                    <div className={css(styles.resultHeader)}>
                        <b>{type}</b>
                        <div>{result.address}</div>
                    </div>
                    <div className={css(styles.resultGroup)}>
                        <div className={css(styles.resultRow)}>
                            <b>Balance:</b> {result.ETH && result.ETH.balance}{' '}
                            ETH
                        </div>
                    </div>
                    <div className={css(styles.resultGroup)}>
                        <div className={css(styles.resultGroupHeader)}>
                            {countTxs} transactions
                        </div>
                        <div className={css(styles.resultRow)}>
                            <b>Total In:</b> {result.ETH && result.ETH.totalIn}{' '}
                            ETH
                        </div>
                        <div className={css(styles.resultRow)}>
                            <b>Total Out:</b>{' '}
                            {result.ETH && result.ETH.totalOut} ETH
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className={css(styles.searchResultContainer)}>No results</div>
        )
    }
}

export default SearchResult
