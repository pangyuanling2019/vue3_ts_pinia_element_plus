// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import { IRet } from "../types/ScmTypes";
// import {
//     CLIENT_APP_CODE,
//     INTERNAL_SERVER_ERROR_CODE,
//     getToken,
//     getBaseRequestUrl, getBaseFmsRequestUrl, DEFAULT_REQUEST_TIMEOUT, getBaseAuthRequestUrl, getBaseAuth2RequestUrl
// } from "./constants";
// import { message } from "antd";


// class HttpRequest {

//     private inst: AxiosInstance;

//     constructor(config: AxiosRequestConfig = {}) {
//         let defaultConfig = {
//             baseURL: getBaseRequestUrl(),
//             timeout: DEFAULT_REQUEST_TIMEOUT,
//         }
//         this.inst = axios.create({ ...defaultConfig, ...config })
//         this.interceptRequest();
//         this.interceptResponse();
//     }

//     private interceptRequest() {
//         this.inst.interceptors.request.use(
//             config => {
//                 // debugger;
//                 // if (config.url) {
//                 //     // debugger;
//                 //     config.baseURL = config.url.indexOf("/fms/") !== -1 ? getBaseFmsRequestUrl() :
//                 //         config.url.indexOf("/portal/auth/") !== -1 ? getBaseAuth2RequestUrl() :
//                 //             config.url.indexOf("/auth/") !== -1 ? getBaseAuthRequestUrl() :
//                 //                 getBaseRequestUrl();
//                 // }
//                 config.headers.Authorization = getToken();
//                 return config;
//             },
//             error => Promise.reject(error)
//         )
//     }

//     private interceptResponse() {
//         this.inst.interceptors.response.use(
//             response => response,
//             error => {
//                 let res = error.response as AxiosResponse;
//                 // if (res && res.status && res.status === INTERNAL_SERVER_ERROR_CODE) {
//                 if (res && res.status && (res.status === 400 || res.status === INTERNAL_SERVER_ERROR_CODE)) {
//                     //处理自定义业务异常
//                     //....
//                     let retData = res.data as IRet<any>;
//                     message.error(`${retData.retMsg}[${retData?.retData ?? ""}]`)
//                 } else {
//                     message.error("请求超时")
//                 }
//                 return Promise.reject(error);
//             }
//         )
//     }

//     private responseTypeCheck(res: AxiosResponse) {
//         const resType = res.headers["content-type"];
//         if (resType !== "application/json") {
//             console.log("只支持json返回数据!");
//             //.....
//         }
//     }

//     async request<T>(config: AxiosRequestConfig) {
//         let ret = await this.inst.request<IRet<T>>(config);
//         this.responseTypeCheck(ret);
//         return ret.data;
//     }

//     async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
//         let ret = await this.inst.post<IRet<T>>(url, data, config);
//         this.responseTypeCheck(ret);
//         return ret.data;
//     }

//     async postFile<T>(url: string, data?: any, config?: AxiosRequestConfig) {
//         let ret = await this.inst.post<IRet<T>>(url, data, { ...config, responseType: "blob" });
//         return ret;
//     }

//     async get<T>(url: string, config?: AxiosRequestConfig) {
//         let ret = await this.inst.get<IRet<T>>(url, config);
//         this.responseTypeCheck(ret);
//         return ret.data;
//     }
//     async getFile<T>(url: string, config?: AxiosRequestConfig) {
//         let ret = await this.inst.get<T>(url, { ...config, responseType: "blob" });
//         return ret;
//     }

//     async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
//         let ret = await this.inst.put<IRet<T>>(url, data, config);
//         return ret.data;
//     }

//     async delete<T>(url: string, config?: AxiosRequestConfig) {
//         let ret = await this.inst.delete<IRet<T>>(url, config);
//         return ret.data;
//     }

//     async head<T>(url: string, config?: AxiosRequestConfig) {
//         let ret = await this.inst.head<IRet<T>>(url, config);
//         return ret.data;
//     }

//     async options<T>(url: string, config?: AxiosRequestConfig) {
//         let ret = await this.inst.options<IRet<T>>(url, config);
//         return ret.data;
//     }

//     async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
//         let ret = await this.inst.patch<IRet<T>>(url, data, config);
//         return ret.data;
//     }
// }

// export const httpRequest = new HttpRequest();