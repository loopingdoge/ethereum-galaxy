import * as React from 'react'
import * as d3 from 'd3'
import { D3Link } from '../../utils/types'

interface LinkProps {
    link: D3Link
}

class Link extends React.Component<LinkProps> {
    ref: SVGLineElement

    componentDidMount() {
        d3.select(this.ref).data([this.props.link])
    }

    render() {
        const { link } = this.props
        return (
            <line
                className="link"
                ref={(ref: SVGLineElement) => (this.ref = ref)}
                strokeWidth={link.amount / 5}
                stroke={'#bcd465'}
            />
        )
    }
}

interface LinksProps {
    links: D3Link[]
}

export default class Links extends React.Component<LinksProps> {
    render() {
        const links = this.props.links.map((link: D3Link, index: number) => {
            return <Link key={index} link={link} />
        })

        return <g className="links">{links}</g>
    }
}
