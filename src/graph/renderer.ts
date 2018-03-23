import * as unrender from 'unrender'

import { Graph, GraphNode } from '../utils/types'
import { distance, computePosisitionsAndColors } from '../utils/renderer'
import { colorNode, getNearestId } from '../utils/graphNode'

import config from '../config'
import { isMobile } from '../utils'

export interface HitTestHandlers {
    onOver?: (e: any, node: GraphNode) => void
    onClick?: (e: any, node: GraphNode) => void
    // onDblClick?: (e: any) => any
    // onHitTestReady?: (e: any) => any
}

enum CameraState {
    Idle,
    Rotating
}

class Renderer {
    renderer: any
    hitTestHandlers: HitTestHandlers
    graph: Graph
    container: HTMLDivElement

    pulseTime: number = 0
    cameraState: CameraState
    rotationSpeed: number = 0.001

    selectedNodeId: number // highlighted node id
    selectedNodeSize: number

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
        this.cameraState = CameraState.Rotating
        this.renderer.onFrame(this.onFrame)
        document.addEventListener('keydown', this.onKeyDown)
        if (isMobile()) {
            this.renderer.input().toggleDragToLook()
        }
    }

    onKeyDown = (e: KeyboardEvent) => {
        switch (e.key.toLowerCase()) {
            case 'w':
            case 'a':
            case 's':
            case 'd':
            case 'q':
            case 'e':
                this.cameraState = CameraState.Idle
                break
            case 't':
                this.cameraState =
                    this.cameraState === CameraState.Rotating
                        ? CameraState.Idle
                        : CameraState.Rotating
                break
            case ' ':
                this.renderer.input().toggleDragToLook()
                break
            default:
                break
        }
    }

    setCameraRotate = (rotate: boolean) => {
        if (rotate) {
            this.cameraState = CameraState.Rotating
        } else {
            this.cameraState = CameraState.Idle
        }
    }

    onFrame = () => {
        this.pulseLinks()
        if (this.cameraState === CameraState.Rotating) {
            this.autoRotate()
        }
    }

    pulseLinks = () => {
        this.pulseTime += 0.015
        const scene = this.renderer.scene()
        const sinval = (Math.sin(this.pulseTime) + 1) * 0.4
        scene.children[2].material.color.r = 1 - sinval
        scene.children[2].material.color.g = 1 - sinval
        scene.children[2].material.color.b = 1 - sinval
    }

    autoRotate = () => {
        const camera = this.renderer.camera()
        const x = camera.position.x
        const z = camera.position.z
        camera.position.x =
            x * Math.cos(this.rotationSpeed) + z * Math.sin(this.rotationSpeed)
        camera.position.z =
            z * Math.cos(this.rotationSpeed) - x * Math.sin(this.rotationSpeed)
        camera.lookAt({ x: 0, y: 0, z: 0 })
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

    focusOnNode = (nodeId: number) => {
        // nodeid, callback, distanceFromtarget
        this.renderer.lookAt(nodeId * 3, null, 10)
        this.setCameraRotate(false)
    }

    _onOver(e: any) {
        // TODO type
        const { positions, labels } = this.graph
        const { onOver } = this.hitTestHandlers

        const nearestId: number =
            getNearestId(positions, e.indexes || [], e.ray, 30) / 3
        this._highlightNode(nearestId)

        if (onOver) {
            onOver(e, {
                id: nearestId,
                label: labels[nearestId]
            })
        }
    }

    _onClick(e: any) {
        const { positions, labels } = this.graph
        const { onClick } = this.hitTestHandlers

        const nearestId = getNearestId(positions, e.indexes, e.ray, 30) / 3

        if (onClick) {
            onClick(e, {
                id: nearestId,
                label: labels[nearestId]
            })
        }
    }

    _highlightNode(nodeIndex: number) {
        const { defaultNodeColor, selectedNodeColor } = config
        const view = this.renderer.getParticleView()
        const colors = view.colors()
        const sizes = view.sizes()

        if (this.selectedNodeId !== undefined) {
            colorNode(this.selectedNodeId, colors, defaultNodeColor)
            sizes[this.selectedNodeId] = this.selectedNodeSize
        }

        this.selectedNodeId = nodeIndex

        if (this.selectedNodeId !== undefined) {
            colorNode(this.selectedNodeId, colors, selectedNodeColor)
            this.selectedNodeSize = sizes[this.selectedNodeId]
            sizes[this.selectedNodeId] *= 1.1
        }

        view.colors(colors)
        view.sizes(sizes)
    }

    _renderNodes(positions: Int32Array) {
        this.renderer.particles(positions)
    }

    _renderLinks(
        positions: Float32Array,
        colors: Float32Array,
        time: number = 1
    ) {
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
