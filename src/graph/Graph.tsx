import * as React from 'react'
import * as d3 from 'd3'
import { d3Types } from '../utils/types'
import Links from './Links'
import Nodes from './Nodes'

interface GraphProps {
    width: number
    height: number
    graph: d3Types.d3Graph
}

class Graph extends React.Component<GraphProps> {
    ref: SVGSVGElement
    simulation: any

    constructor(props: GraphProps) {
        super(props)
        this.simulation = d3
            .forceSimulation()
            .force(
                'link',
                d3.forceLink().id(function(d: d3Types.d3Node) {
                    return d.id
                })
            )
            .force('charge', d3.forceManyBody().strength(-100))
            .force(
                'center',
                d3.forceCenter(this.props.width / 2, this.props.height / 2)
            )
            .nodes(this.props.graph.nodes)

        this.simulation.force('link').links(this.props.graph.links)
    }

    // componentDidMount() {
    // }
    componentDidMount() {
        const node = d3.selectAll('.node')
        const link = d3.selectAll('.link')

        this.simulation.nodes(this.props.graph.nodes).on('tick', ticked)

        function ticked() {
            link
                .attr('x1', function(d: any) {
                    return d.source.x
                })
                .attr('y1', function(d: any) {
                    return d.source.y
                })
                .attr('x2', function(d: any) {
                    return d.target.x
                })
                .attr('y2', function(d: any) {
                    return d.target.y
                })

            node
                .attr('cx', function(d: any) {
                    return d.x
                })
                .attr('cy', function(d: any) {
                    return d.y
                })
        }
    }

    render() {
        const { width, height, graph } = this.props
        return (
            <svg className="container" width={width} height={height}>
                <Links links={graph.links} />
                <Nodes nodes={graph.nodes} simulation={this.simulation} />
            </svg>
        )
        // const { width, height } = this.props
        // return (
        //     <svg width={width} height={height} />
        // )
        // <svg
        //     className="container"
        //     ref={(ref: SVGSVGElement) => this.ref = ref}
        //     width={this.props.width}
        //     height={this.props.height}
        // />
    }
}

export default Graph
