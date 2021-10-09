import axios from 'axios'

export function request (config) {
    const instence = axios.create({
        // baseURL: 'http://123.207.32.32:8000',
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    })

    //拦截
    // instence.interceptors.request.use(config => {
    //     console.log(config);
    //     return config
    // }, err => {
    //     console.log(err);
    // })

    //响应拦截
    instence.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err);
    })
    return instence(config)

}