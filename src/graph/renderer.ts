import * as unrender from 'unrender'
import { Graph } from '../utils/types'

const distance = (
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number
) => (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2)

const computePosisitionsAndColors = (graph: Graph) => {
    let jsPos = []
    let jsColors = []

    const r = 16000
    const maxDistance = 39375
    const links = graph.outLinks

    for (let i = 0; i < links.length; ++i) {
        let to = links[i]
        if (to !== undefined) {
            // no links for this node
            var fromX = graph.positions[i * 3]
            var fromY = graph.positions[i * 3 + 1]
            var fromZ = graph.positions[i * 3 + 2]

            for (var j = 0; j < to.length; j++) {
                var toIdx = to[j]

                var toX = graph.positions[toIdx * 3]
                var toY = graph.positions[toIdx * 3 + 1]
                var toZ = graph.positions[toIdx * 3 + 2]

                var dist = distance(fromX, fromY, fromZ, toX, toY, toZ)
                if (dist <= maxDistance) {
                    jsPos.push(fromX, fromY, fromZ, toX, toY, toZ)
                    jsColors.push(
                        fromX / r + 0.5,
                        fromY / r + 0.5,
                        fromZ / r + 0.5,
                        toX / r + 0.5,
                        toY / r + 0.5,
                        toZ / r + 0.5
                    )
                }
            }
        }
    }
    return {
        positions: new Float32Array(jsPos),
        colors: new Float32Array(jsColors)
    }
}

class Renderer {
    renderer: any
    graph: Graph

    constructor(container: HTMLDivElement) {
        this.renderer = unrender(container)
    }

    render(graph: Graph) {
        this.graph = graph

        const { positions, colors } = computePosisitionsAndColors(this.graph)

        this.renderNodes(this.graph.positions)
        this.renderLinks(positions, colors)

        console.log('RENDERED')
    }

    renderNodes(positions: Int32Array) {
        this.renderer.particles(positions)
    }

    renderLinks(positions: Float32Array, colors: Float32Array) {
        const scene = this.renderer.scene()
        const geometry = new unrender.THREE.BufferGeometry()
        const material = new unrender.THREE.LineBasicMaterial({
            vertexColors: unrender.THREE.VertexColors,
            blending: unrender.THREE.AdditiveBlending,
            opacity: 0.5,
            transparent: true
        })

        geometry.addAttribute(
            'position',
            new unrender.THREE.BufferAttribute(positions, 3)
        )
        geometry.addAttribute(
            'color',
            new unrender.THREE.BufferAttribute(colors, 3)
        )

        geometry.computeBoundingSphere()
        const linkMesh = new unrender.THREE.Line(
            geometry,
            material,
            unrender.THREE.LinePieces
        )
        scene.add(linkMesh)
    }
}

export default Renderer
