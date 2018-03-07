import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Menu, Icon } from 'antd'

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
        <Menu
            onClick={e => 'app'}
            selectedKeys={['graph']}
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            theme="dark"
        >
            <Menu.Item key="graph">
                <Icon type="home" />Graph
            </Menu.Item>
            <Menu.Item key="about">
                <Icon type="info" />About
            </Menu.Item>
        </Menu>
    </div>
)

export default Navbar
