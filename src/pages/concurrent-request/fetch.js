import axios from "axios";

const $fetch = async url => {
    const res = await axios.get(url)
    console.log('res', res)
    return res.data;
}

export default $fetch;