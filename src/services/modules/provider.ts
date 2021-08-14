import axios, { AxiosRequestConfig } from 'axios';
import { handleResponse, handleError } from './response';

// my sample BASE URL
const BASE_URL = 'api/v1';

// const BASE_URL_ADV = 'https://reqres.in/api';

const requestHeader = {
	headers: { 'X-Custom-Header': 'value' },
};

const getTabledata = (offset: number, limit: number, subURL: string) => {
	return axios
		.get(`${subURL}`, {
			params: {
				offset,
				limit,
			},
		})
		.then(handleResponse)
		.catch(handleError);
};

const getListData = (params: any, subURL: string) => {
	return axios
		.get(`${subURL}`, {
			params,
		})
		.then(handleResponse)
		.catch(handleError);
};

const getAll = (resource: string) => {
	// console.log('getAll:', `${BASE_URL}/${resource}`);
	return axios
		.get(`${BASE_URL}/${resource}`)
		.then(handleResponse)
		.catch(handleError);
};

const get = (subURL: string, params?: any, config?: AxiosRequestConfig) => {
	return axios
		.get(`${BASE_URL}/${subURL}`, {
			params,
			...config,
		})
		.then(handleResponse)
		.catch(handleError);
};

const getSingle = (resource: string, id: number) => {
	return axios
		.get(`${BASE_URL}/${resource}/${id}`)
		.then(handleResponse)
		.catch(handleError);
};

const post = (resource: string, model: any, config?: AxiosRequestConfig) => {
	return axios
		.post(`${BASE_URL}/${resource}`, model, config)
		.then(handleResponse)
		.catch(handleError);
};

const postConfirm = (subURL: string, params?: any, config?: AxiosRequestConfig) => {
	return axios
		.post(`${subURL}`, params)
		.then(handleResponse)
		.catch(handleError);
};

const put = (subURL: string, params?: any, config?: AxiosRequestConfig) => {
	return axios
		.put(`${BASE_URL}/${subURL}`,
			params
		)
		.then(handleResponse)
		.catch(handleError);
};

const patch = (resource: string, model: any) => {
	return axios
		.patch(`${BASE_URL}/${resource}`, model)
		.then(handleResponse)
		.catch(handleError);
};

const remove = (resource: string, id: number) => {
	return axios
		.delete(`${BASE_URL}/${resource}/${id}`)
		.then(handleResponse)
		.catch(handleError);
};


export const apiProvider = {
	getAll,
	getSingle,
	get,
	post,
	put,
	patch,
	remove,
	getTabledata,
	getListData,
	postConfirm,
};
