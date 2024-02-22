import type { QueryItem } from '~/types'

export const QUERY_LIST = {
    movie: <QueryItem[]>([
        { type: 'last', title: 'Populer Tiyatrolar', query: '3' },

    ]),
    tv: <QueryItem[]>([
        { type: 'last', title: 'Populer Pop Muzik', query: '3' },
    ]),
}