import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { MdKeyboard } from 'react-icons/lib/md'

import Button from './Button'

const styles = StyleSheet.create({
    keysLegendContainer: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: '8px 0px 8px 8px',
        zIndex: 100
    },
    keysLegendButton: {
        color: 'white',
        opacity: 0.4,
        ':hover': {
            opacity: 0.8
        }
    }
})

class KeysLegend extends React.Component {
    render() {
        return (
            <div className={css(styles.keysLegendContainer)}>
                <div className={css(styles.keysLegendButton)}>
                    <Button icon={<MdKeyboard />} onClick={() => {}} />
                </div>
            </div>
        )
    }
}

export default KeysLegend
