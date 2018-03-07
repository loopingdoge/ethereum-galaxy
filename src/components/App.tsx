import * as React from 'react'
import Graph from './graph/Graph'
import * as ethGraph from '../data/input.json'
import { D3Graph } from '../utils/types'
import { Layout } from 'antd'
import { css, StyleSheet } from 'aphrodite'

import Navbar from './Navbar'
import Sidebar from './Sidebar'

const { Header, Content, Sider } = Layout

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
    },
    sider: {
        background: '#fff'
    }
})

class App extends React.Component {
    render() {
        return (
            <Layout className={css(styles.expand)}>
                <Header>
                    <Navbar />
                </Header>
                <Layout>
                    <Sider className={css(styles.sider)} width={350}>
                        <Sidebar />
                    </Sider>
                    <Content className={css(styles.expand)}>
                        <Graph
                            width={'100%'}
                            height={'90%'}
                            graph={(ethGraph as object) as D3Graph}
                        />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default App
