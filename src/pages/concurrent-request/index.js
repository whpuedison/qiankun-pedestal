import React, { useEffect } from 'react';
import axios from 'axios';

const getRequestPath = id => `/api/userinfo/${id}`
const concurrentRequestArr = []
for (let i = 0; i < 10; i++) {
    concurrentRequestArr.push(getRequestPath(i))
}
const maxConcurrent = 5

const ConcurrentRequest = () => {

    const start = () => {
        const requestQueue = concurrentRequestArr.slice(0, maxConcurrent)
        
    }

    useEffect(() => {
        start()
    }, [])

    // const concurrentRequest = 

    return (
        <div>ConcurrentRequest</div>
    )
}

export default ConcurrentRequest