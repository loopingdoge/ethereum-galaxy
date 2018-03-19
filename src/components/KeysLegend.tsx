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
        margin: 16,
        zIndex: 100,
        borderRadius: 2
    },
    button: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: 16,
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
    legend: {
        width: 400,
        background: 'rgba(255, 255, 255, .8)',
        zIndex: 100,
        padding: '10px 20px',
        fontFamily: 'sans-serif',
        display: 'grid',
        gridTemplateColumns: '50px auto 50px auto',
        gridTemplateRows: '40px',
        gridTemplateAreas: '" header header header header" '
    },
    legendHeader: {
        gridArea: 'header',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 600
    },
    key: {
        fontWeight: 600
    }
})

interface KeyLegendProps {
    isOpen: boolean
}

interface KeyLegendState {
    isOpen: boolean
}
class KeysLegend extends React.Component<KeyLegendProps, KeyLegendState> {
    constructor(props: any) {
        super(props)
        this.state = {
            isOpen: props.isOpen
        }
    }

    toggleKeyLegend = (e: any) => {
        const { isOpen } = this.state
        this.setState({
            isOpen: !isOpen
        })
    }

    componentWillReceiveProps(newProps: KeyLegendProps) {
        const { isOpen } = this.state
        if (newProps.isOpen !== isOpen) {
            this.setState({
                ...this.state,
                isOpen: newProps.isOpen
            })
        }
    }

    render() {
        const { isOpen } = this.state
        const { keysConfig } = config
        const icon = isOpen ? <MdKeyboardHide /> : <MdKeyboard />
        return (
            <div className={css(styles.keysLegendContainer)}>
                <div
                    className={css(styles.button, isOpen && styles.buttonDark)}
                >
                    <Button icon={icon} onClick={this.toggleKeyLegend} />
                </div>
                {isOpen ? (
                    <div className={css(styles.legend)}>
                        <div className={css(styles.legendHeader)}>Commands</div>
                        {Object.keys(keysConfig).map((key: any) => (
                            <>
                                <div key={key} className={css(styles.key)}>
                                    {key}
                                </div>
                                <div key={`${key}-val`}>{keysConfig[key]}</div>
                            </>
                        ))}
                    </div>
                ) : null}
            </div>
        )
    }
}

export default KeysLegend
