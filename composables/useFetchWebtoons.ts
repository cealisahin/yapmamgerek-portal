import {useFetch} from "#app"
type useFetchType = typeof useFetch


// wrap useFetch with configuration needed to talk to our API
export const useFetchWebtoons: useFetchType = (path, options = {}) => {
    const config = useRuntimeConfig()
   console.log('work:',path);
    // modify options as needed
    options.baseURL = "http://164.68.103.54:8091"
    options.headers = {}

    options.onResponseError = ({request, response, options}) => {
        if (response.status === 401) {

        }
    }
    return useFetch(path, options)
}
