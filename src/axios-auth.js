import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://3z8miabr93.execute-api.cn-northwest-1.amazonaws.com.cn/prod'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance