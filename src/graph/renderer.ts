import * as unrender from 'unrender'

import { Graph } from '../utils/types'
import { distance, computePosisitionsAndColors } from '../utils/renderer'

import config from '../config'

export interface HitTestHandlers {
    handleOver: (e: any) => any
    handleClick: (e: any) => any
    handleDblClick: (e: any) => any
    hitTestReady: (e: any) => any
}

class Renderer {
    renderer: any
    graph: Graph
    container: HTMLDivElement

    constructor(container: HTMLDivElement) {
        this.container = container
        this.renderer = unrender(container)
    }

    render(graph: Graph) {
        this.graph = graph

        const { positions, colors } = computePosisitionsAndColors(
            this.graph,
            config.maxVisibleDistance
        )

        this._renderNodes(this.graph.positions)
        this._renderLinks(positions, colors)

        console.log('RENDERED')
    }

    reset() {
        this.renderer.destroy()
        this.renderer = unrender(this.container)
    }

    cameraConfig(camConfig?: any) {
        const camera = this.renderer.camera()
        const { pos, lookAt } = camConfig
        if (pos) {
            camera.position.set(pos.x, pos.y, pos.z)
        }
        if (lookAt) {
            camera.quaternion.set(lookAt.x, lookAt.y, lookAt.z, lookAt.w)
        }
        return camera
    }

    configHitTest(hitTestConfig: HitTestHandlers) {
        // hitTest = renderer.hitTest();
        // hitTest.on('over', handleOver);
        // hitTest.on('click', handleClick);
        // hitTest.on('dblclick', handleDblClick);
        // hitTest.on('hitTestReady', adjustMovementSpeed);
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
