export type MediaType = 'Tiyatro' | 'Pop'

export interface MainAttraction {
    name: string
    title: string
    description: string
    source: string
    category: string
}
export interface QueryItem {
    type: MediaType
    title: string
    query: string
}