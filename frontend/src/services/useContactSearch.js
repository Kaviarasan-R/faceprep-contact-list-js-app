/* React Libraries */ 
import { useEffect, useState } from 'react'
import axios from 'axios'

function useContactSearch(pageNumber) {
    /* States */
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [contacts, setContacts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    /* Use Effect For Fetching Random Users Of 30 Per Page & Re-runs When Page Number Changes. */
    useEffect(() => {
        console.log(pageNumber)
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'https://randomuser.me/api?results=30',
            params: {page: pageNumber},
            cancelToken: new axios.CancelToken(token => {
                cancel = token
            })
        }).then(res => {
            setContacts(prevContacts => {
                return [...new Set([...prevContacts, ...res.data.results])]
            })
            setHasMore(res.data.results.length > 0)
            setLoading(false)
        }).catch(err => {
            if(axios.isCancel(err)) return
            setError(true)
        })
        return () => cancel()
    }, [pageNumber])

  return { loading, error, contacts, hasMore }
}

export default useContactSearch