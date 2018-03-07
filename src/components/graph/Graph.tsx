import * as React from 'react'
import * as d3 from 'd3'
import { D3Graph, D3Node } from '../../utils/types'
import Links from './Links'
import Nodes from './Nodes'

interface GraphProps {
    width: string
    height: string
    graph: D3Graph
}

class Graph extends React.Component<GraphProps> {
    ref: SVGSVGElement
    simulation: any

    constructor(props: GraphProps) {
        super(props)
        this.simulation = d3
            .forceSimulation()
            .force('link', d3.forceLink().id((d: D3Node) => d.id))
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(200, 200))
            .nodes(this.props.graph.nodes)

        this.simulation.force('link').links(this.props.graph.links)
    }

    componentDidMount() {
        const node = d3.selectAll('.node')
        const link = d3.selectAll('.link')

        this.simulation.nodes(this.props.graph.nodes).on('tick', () => {
            link
                .attr('x1', (d: any) => d.source.x)
                .attr('y1', (d: any) => d.source.y)
                .attr('x2', (d: any) => d.target.x)
                .attr('y2', (d: any) => d.target.y)

            node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y)
        })
    }

    render() {
        const { width, height, graph } = this.props
        return (
            <svg className="container" width={width} height={height}>
                <Links links={graph.links} />
                <Nodes nodes={graph.nodes} simulation={this.simulation} />
            </svg>
        )
    }
}

export default Graph
