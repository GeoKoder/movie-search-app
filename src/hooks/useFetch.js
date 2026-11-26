import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(Boolean(url))
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)

    const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

    useEffect(() => {
        if (!url) {
            setData(null)
            setError(null)
            setLoading(false)
            return
        }

        const controller = new AbortController()

        async function load() {
            setLoading(true)
            setError(null)
            setData(null)

            try {
                const res = await fetch(url, { signal: controller.signal })

                if (!res.ok) {
                    throw new Error(`Request failed (status ${res.status})`)
                }

                const json = await res.json()
                if (controller.signal.aborted) return

                setData(json)
                setLoading(false)
            } catch (error) {
                if (error.name === "AbortError") return
                setError("Something went wrong. Check your connection and try again.")
                setLoading(false)
            }
        }

        load()

        return () => controller.abort()
    }, [url, reloadKey])

    return { data, loading, error, refetch }
}

export default useFetch