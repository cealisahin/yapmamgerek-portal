import type { QueryItem } from '~/types'
export const QUERY_LIST = {
    movie: <QueryItem[]>([
        { type: 'theatre', title: 'Popular theatre', query: 'popular' },
        { type: 'theatre', title: 'Top Rated theatre', query: 'top_rated' },
        { type: 'theatre', title: 'Upcoming theatre', query: 'upcoming' },
        { type: 'theatre', title: 'Now Playing theatre', query: 'now_playing' },
    ]),
    tv: <QueryItem[]>([
        { type: 'pop', title: 'Popular pop', query: 'popular' },
        { type: 'pop', title: 'Top Rated pop', query: 'top_rated' },
        { type: 'pop', title: 'pop Airing Today', query: 'airing_today' },
    ]),
}