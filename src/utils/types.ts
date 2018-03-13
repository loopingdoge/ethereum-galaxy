export interface Graph {
    positions: Int32Array
    labels: string[]
    inLinks: Int32Array[]
    outLinks: Int32Array[]
}

export interface GraphNode {
    id: number
    label: string
}
