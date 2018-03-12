import * as React from 'react'
import GraphScene from './graph/GraphScene'
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

interface AppState {
    graphId: string
}

class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props)
        this.state = {
            graphId: 'eth-1h'
        }
    }

    selectGraph = (graphId: string) => {
        this.setState({
            ...this.state,
            graphId
        })
        console.log(this.state.graphId)
    }

    render() {
        return (
            <Layout className={css(styles.expand)}>
                <Header>
                    <Navbar />
                </Header>
                <Layout>
                    <Sider className={css(styles.sider)} width={350}>
                        <Sidebar selectGraph={this.selectGraph} />
                    </Sider>
                    <Content className={css(styles.expand)}>
                        <GraphScene
                            width={'100%'}
                            height={'100%'}
                            graphId={this.state.graphId}
                        />
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default App
