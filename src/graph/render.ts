import * as unrender from 'unrender'

const render = (graph: any, container: HTMLDivElement) => {
    const renderer = unrender(container)

    // Renders points
    renderer.particles(graph.positions)
}

export default render
