import { LRUCache } from 'lru-cache'
import { hash as ohash } from 'ohash'

const apiBaseUrl = "http://164.68.103.54:8091"


const promiseCache = new LRUCache<string, any>({
    max: 500,
    ttl: 2000 * 60 * 60, // 2 hour
})


async function _fetchTMDB(url: string, params: Record<string, string | number | boolean | undefined> = {}) {

    return await $fetch(url, {
        baseURL: `${apiBaseUrl}/attractions`,
        params,
    })
}


export function fetchTMDB(url: string, params: Record<string, string | number | boolean | undefined> = {}): Promise<any> {
    const hash = ohash([url, params])
    const state = useState<any>(hash, () => null)
    if (state.value)
        return state.value
    if (!promiseCache.has(hash)) {
        promiseCache.set(
            hash,
            _fetchTMDB(url, params)
                .then((res) => {
                    state.value = res
                    return res
                })
                .catch((e) => {
                    promiseCache.delete(hash)
                    throw e
                }),
        )
    }
    return promiseCache.get(hash)!
}

export function listMedia(type: MediaType, query: string, page: number): Promise<PageResult<Media>> {
    return fetchTMDB(`${type}/${query}`)
}

export function getMedia(type: MediaType, id: string): Promise<Media> {
    return fetchTMDB(`${type}/${id}`, {
        append_to_response: 'videos,credits,images,external_ids,release_dates,combined_credits',
        include_image_language: 'en',
    })
}