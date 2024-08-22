import React, { useEffect } from 'react';
import axios from 'axios';

const ConcurrentRequest = () => {
    const fetchUserInfo = () => {
        axios.get('/api/userinfo')
        .then(resp => {
            console.log(resp);
        })
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    return (
        <div>ConcurrentRequest</div>
    )
}

export default ConcurrentRequest