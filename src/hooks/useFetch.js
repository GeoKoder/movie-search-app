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
                    throw new Error("The movie service is unavailable right now. Please try again.")
                }

                const json = await res.json()
                if (controller.signal.aborted) return

                setData(json)
                setLoading(false)
            } catch (error) {
                if (error.name === "AbortError") return
                setError(error instanceof TypeError
                    ? "Could not reach the movie service. Check your internet connection and try again."
                    : error.message || "Something went wrong. Please try again.")
                setLoading(false)
            }
        }

        load()

        return () => controller.abort()
    }, [url, reloadKey])

    return { data, loading, error, refetch }
}

export default useFetch
