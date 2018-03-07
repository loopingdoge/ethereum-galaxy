export interface D3Node {
    id: string
    balance: number
}

export interface D3Link {
    source: string
    target: string
    amount: number
}

export interface D3Graph {
    nodes: D3Node[]
    links: D3Link[]
}
