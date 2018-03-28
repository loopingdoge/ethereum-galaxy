const GRAPH_BASE_URL = 'http://raspein.portazero.it:8888/graphs'

export const defaultConfig = {
    graphBaseUrl: GRAPH_BASE_URL,
    graphsUrl: (graphName: string) => `${GRAPH_BASE_URL}/${graphName}`,
    ngraphUrl: (graphName: string) => `${GRAPH_BASE_URL}/${graphName}/ngraph`,
    graphs: {
        'eth-1': [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20
        ],
        'eth-4': [0, 4, 8, 12, 16, 20]
    },
    defaultGraph: 'eth-1/0',
    camera: {
        // pos: { x: 0, y: 0, z: 0 },
        pos: { x: 2910, y: 2910, z: 2910 },
        lookAt: { x: -0.34, y: 0.34, z: -0.03, w: 0.87 }
    },
    maxVisibleDistance: 39375,
    defaultNodeColor: 0xffffffdd,
    selectedNodeColor: 0xff3333dd,
    keysConfig: {
        w: 'Move forward',
        s: 'Move backward',
        a: 'Move left',
        d: 'Move right',
        q: 'Roll right',
        e: 'Roll left',
        up: 'Rotate up',
        down: 'Rotate down',
        left: 'Rotate left',
        right: 'Rotate right',
        r: 'Fly up',
        f: 'Fly down',
        t: 'Toggle rotation'
    }
}

export default defaultConfig
