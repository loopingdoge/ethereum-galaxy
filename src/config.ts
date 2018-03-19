export const defaultConfig = {
    graphsBaseUrl: '.',
    defaultGraph: 'eth-1h-new',
    camera: {
        // pos: { x: 0, y: 0, z: 0 },
        pos: { x: 2910, y: 2910, z: 2910 },
        lookAt: { x: -0.34, y: 0.34, z: -0.03, w: 0.87 }
    },
    maxVisibleDistance: 39375,
    defaultNodeColor: 0xffffffdd,
    selectedNodeColor: 0xff0000dd, // TODO non si vede
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
