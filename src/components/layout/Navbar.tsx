import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    container: {
        position: 'fixed',
        width: '392px',
        height: '48px',
        background: 'rgba( 255, 255, 255, .9 )',
        margin: '8px 0px 8px 8px',
        float: 'left',
        zIndex: 100
    }
})

const Navbar = () => <div className={css(styles.container)}>Ciao</div>

export default Navbar
