import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

const styles = StyleSheet.create({
    expand: {
        flex: 1
    },
    logo: {
        width: '120px',
        height: '31px',
        background: 'rgba(255,255,255,.2)',
        margin: '16px 24px 16px 0',
        float: 'left'
    }
})

const Navbar = () => (
    <div>
        <div className={css(styles.logo)} />
    </div>
)

export default Navbar
