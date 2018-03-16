import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MdKeyboard, MdKeyboardHide } from 'react-icons/lib/md'

import Button from './Button'
import config from '../config'

const styles = StyleSheet.create({
    keysLegendContainer: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: 8,
        zIndex: 100
    },
    button: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: 8,
        color: 'white',
        opacity: 0.4,
        ':hover': {
            opacity: 0.8
        },
        zIndex: 200
    },
    buttonDark: {
        color: 'black'
    },
    keyLegend: {
        width: 400,
        // height: 100,
        background: 'rgba(255, 255, 255, .8)',
        zIndex: 100
    }
})

interface KeyLegendState {
    isOpened: boolean
}
class KeysLegend extends React.Component<{}, KeyLegendState> {
    constructor(props: any) {
        super(props)
        this.state = {
            isOpened: false
        }
    }

    toggleKeyLegend = (e: any) => {
        const { isOpened } = this.state
        this.setState({
            isOpened: !isOpened
        })
    }

    render() {
        const { isOpened } = this.state
        const { keysConfig } = config
        const icon = isOpened ? <MdKeyboardHide /> : <MdKeyboard />
        return (
            <div className={css(styles.keysLegendContainer)}>
                <div
                    className={css(
                        styles.button,
                        isOpened && styles.buttonDark
                    )}
                >
                    <Button icon={icon} onClick={this.toggleKeyLegend} />
                </div>
                {isOpened ? (
                    <div className={css(styles.keyLegend)}>
                        {Object.keys(keysConfig).map((key: any) => (
                            <div key={key}>
                                {key}: {keysConfig[key]}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        )
    }
}

export default KeysLegend
