import * as React from 'react'
import { css, StyleSheet } from 'aphrodite'

import { Graph } from 'utils/types'

const styles = StyleSheet.create({
    infoContainer: {
        position: 'fixed',
        right: 0,
        height: 100,
        zIndex: 99,
        padding: 16,
        textAlign: 'right',
        fontFamily: 'sans-serif',
        fontSize: 13,
        color: 'rgba(255, 255, 255, .5)'
    }
})

interface GalaxyInfoProps {
    graph?: Graph
}

interface GalaxyInfoState {
    graph?: Graph
}

class GalaxyInfo extends React.Component<GalaxyInfoProps, GalaxyInfoState> {
    constructor(props: GalaxyInfoProps) {
        super(props)
        this.state = {
            graph: props.graph
        }
    }

    componentWillReceiveProps(newProps: GalaxyInfoProps) {
        if (newProps.graph !== this.state.graph) {
            this.setState({
                graph: newProps.graph
            })
        }
    }

    render() {
        const { graph } = this.state

        if (!graph) {
            return null
        }

        const { nodes_number, links_number, range } = graph.info

        return (
            <div className={css(styles.infoContainer)}>
                <div>{`BLOCKS ${range.start} TO ${range.end}`}</div>
                <div>{`${nodes_number} NODES  -  ${links_number} LINKS`}</div>
            </div>
        )
    }
}
// {
//     "range": {
//       "start": 5356035,
//       "end": 5356045
//     },
//     "nodes_number": 547,
//     "links_number": 390
//   }

export default GalaxyInfo
