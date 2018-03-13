import * as unrender from 'unrender'

import { Graph } from '../utils/types'
import { distance, computePosisitionsAndColors } from '../utils/renderer'
import { colorNode, getNearestIndex } from '../utils/graphNode'

import config from '../config'
import { HexBase64BinaryEncoding } from 'crypto'

export interface HitTestHandlers {
    onOver?: (nodeId: number) => void
    onClick?: (e: any) => void
    onDblClick?: (e: any) => any
    onHitTestReady?: (e: any) => any
}

class Renderer {
    renderer: any
    hitTestHandlers: HitTestHandlers
    graph: Graph
    container: HTMLDivElement

    selecedNodeId: number // highlighted node id
    seletedNodeSize: number

    constructor(container: HTMLDivElement) {
        this.container = container
        this.renderer = unrender(container)
        this.hitTestHandlers = {}

        this.configHitTest = this.configHitTest.bind(this) // TODO
        this._onOver = this._onOver.bind(this)
        this._onClick = this._onClick.bind(this)
    }

    render(graph: Graph) {
        this.graph = graph

        const { positions, colors } = computePosisitionsAndColors(
            this.graph,
            config.maxVisibleDistance
        )

        this._renderNodes(this.graph.positions)
        this._renderLinks(positions, colors)

        this._initHitTest()

        console.log('RENDERED')
    }

    _initHitTest() {
        const hitTest = this.renderer.hitTest()
        hitTest.on('over', this._onOver)
        hitTest.on('click', this._onClick)
        // hitTest.on('dblclick', handleDblClick)
        // hitTest.on('hitTestReady', adjustMovementSpeed)
    }
    reset() {
        this.renderer.destroy()
        this.renderer = unrender(this.container)
    }

    configCamera(camConfigs?: any) {
        const camera = this.renderer.camera()
        const { pos, lookAt } = camConfigs
        if (pos) {
            camera.position.set(pos.x, pos.y, pos.z)
        }
        if (lookAt) {
            camera.quaternion.set(lookAt.x, lookAt.y, lookAt.z, lookAt.w)
        }
    }

    configHitTest(hitTestConfigs?: HitTestHandlers) {
        this.hitTestHandlers = {
            ...this.hitTestHandlers,
            ...hitTestConfigs
        }
    }

    _onOver(e: any) {
        // TODO type
        const { positions } = this.graph
        const { onOver } = this.hitTestHandlers

        const nearestIndex = getNearestIndex(positions, e.indexes, e.ray, 30)
        this._highlightNode(nearestIndex)

        if (onOver) onOver(nearestIndex)
    }

    _onClick(e: any) {
        const { positions } = this.graph
        const { onClick } = this.hitTestHandlers

        const nearestIndex = getNearestIndex(positions, e.indexes, e.ray, 30)

        if (onClick) onClick(nearestIndex)
    }

    _highlightNode(nodeIndex: number) {
        const { defaultNodeColor, selectedNodeColor } = config
        const view = this.renderer.getParticleView()
        const colors = view.colors()
        const sizes = view.sizes()

        if (this.selecedNodeId !== undefined) {
            colorNode(this.selecedNodeId, colors, defaultNodeColor)
            sizes[this.selecedNodeId / 3] = this.seletedNodeSize
        }

        this.selecedNodeId = nodeIndex

        if (this.selecedNodeId !== undefined) {
            colorNode(this.selecedNodeId, colors, selectedNodeColor)
            this.seletedNodeSize = sizes[this.selecedNodeId / 3]
            sizes[this.selecedNodeId / 3] *= 1.1
        }

        view.colors(colors)
        view.sizes(sizes)
    }

    _renderNodes(positions: Int32Array) {
        this.renderer.particles(positions)
    }

    _renderLinks(positions: Float32Array, colors: Float32Array) {
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
