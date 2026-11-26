import { useCallback, useEffect, useState } from "react";

function useFetch(url) {
    const [result, setResult] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)

    const refetch = useCallback(() => setReloadKey((k) => k + 1), [])
    const requestKey = url ? `${url}::${reloadKey}` : null
    const isCurrentResult = result?.requestKey === requestKey
    const data = isCurrentResult ? result.data : null
    const error = isCurrentResult ? result.error : null
    const loading = Boolean(url) && !isCurrentResult

    useEffect(() => {
        if (!url) {
            return
        }

        const controller = new AbortController()

        async function load() {
            try {
                const res = await fetch(url, { signal: controller.signal })

                if (!res.ok) {
                    throw new Error("The movie service is unavailable right now. Please try again.")
                }

                const json = await res.json()
                if (controller.signal.aborted) return

                setResult({ requestKey, data: json, error: null })
            } catch (error) {
                if (error.name === "AbortError") return
                const message = error instanceof TypeError
                    ? "Could not reach the movie service. Check your internet connection and try again."
                    : error.message || "Something went wrong. Please try again."
                setResult({ requestKey, data: null, error: message })
            }
        }

        load()

        return () => controller.abort()
    }, [url, reloadKey, requestKey])

    return { data, loading, error, refetch }
}

export default useFetch
