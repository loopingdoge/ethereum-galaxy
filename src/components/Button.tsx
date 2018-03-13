import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    button: {
        width: 56,
        height: 48,
        fontSize: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    }
})

interface ButtonProps {
    icon: any
    onClick: (e: any) => any
}

class Button extends React.Component<ButtonProps> {
    render() {
        return (
            <div className={css(styles.button)} onClick={this.props.onClick}>
                {this.props.icon}
            </div>
        )
    }
}

export default Button
