import * as asyncFor from 'rafor'
import config from '../config'
import { getBinary, getJson } from '../utils/xhr'

const loadGraph = (name: string) => {
    // TODO Progress

    let positions: any
    let labels: string[]
    let outLinks: any[]
    let inLinks: any[]

    let lastArray: any[]
    let srcIndex: number

    lastArray = []
    outLinks = [lastArray]
    inLinks = []

    const loadPositions = () => {
        return getBinary(`${config.graphsBaseUrl}/${name}/positions.bin`).then(
            (buffer: Int32Array) => {
                positions = buffer
            }
        )
    }

    const parseLinks = (index: number) => {
        if (index < 0) {
            srcIndex = -index - 1
            lastArray = outLinks[srcIndex] = []
        } else {
            var toNode = index - 1
            lastArray.push(toNode)
            if (inLinks[toNode] === undefined) {
                inLinks[toNode] = [srcIndex]
            } else {
                inLinks[toNode].push(srcIndex)
            }
        }
    }

    const loadLinks = () => {
        return getBinary(`${config.graphsBaseUrl}/${name}/links.bin`).then(
            (buffer: Int32Array) =>
                new Promise((resolve, reject) => {
                    asyncFor(buffer, parseLinks, () => resolve('finiti i link'))
                })
        )
    }

    const loadLabels = () => {
        return getJson(`${config.graphsBaseUrl}/${name}/labels.json`).then(
            (buffer: string[]) => (labels = buffer)
        )
    }

    const convertToGraph = () =>
        new Promise((resolve, reject) =>
            resolve({
                positions,
                labels,
                outLinks,
                inLinks
            })
        )

    return loadPositions()
        .then(loadLinks)
        .then(loadLabels)
        .then(convertToGraph)
}

export default loadGraph
