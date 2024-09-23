import axios from "axios";

const axiosService = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
// 请求拦截器
axiosService.interceptors.request.use(config => {
    // 在发送请求之前做某事
    return config;
  },
);
// 响应拦截器
axiosService.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response;
}) 
export default axiosService;