import axios from 'axios';
import { toast } from 'react-toastify';
export default function getData(method = 'get', url, callback, errorcallback, data = {}) {
	toast.configure();
	if (method === 'get' || method === 'delete') {
		axios({
			method: method,
			// url: `api/${url}`,
			url: `http://kndlgs.com/api/${url}`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('authenticated')}`,
				'Content-Type': 'text/plain',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Origin': '*'
			}
		})
			.then((res) => {
				console.log('checking here', res);
				if (callback !== null) {
					callback(res);
				}
			})
			.catch((error) => {
				if (errorcallback !== null) {
					errorcallback(error);
				}
			});
	} else if (method === 'post') {
		axios({
			method: 'post',
			// url: `api/${url}`,
			url: `http://kndlgs.com/api/${url}`,
			data: data,
			headers: {
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json-patch+json',
				Authorization: `Bearer ${localStorage.getItem('authenticated')}`
			}
		})
			.then((res) => {
				toast.success('Added Successfully');
				if (callback !== null) {
					callback(res);
				}
			})
			.catch((error) => {
				if (errorcallback !== null) {
					errorcallback(error);
				}
			});
	} else if (method === 'patch') {
		axios({
			method: method,
			url: `http://kndlgs.com/api/${url}`,
			// http://kndlgs.com/api/Children
			// url: `http://kndlgs.com/api/${url}`,
			data: data,
			headers: {
				'Content-Type': 'application/json-patch+json',
				Authorization: `Bearer ${localStorage.getItem('authenticated')}`,
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Origin': '*'
			}
		})
			.then((res) => {
				toast.success('Edited Successfully');
				if (callback !== null) {
					callback(res);
				}
			})
			.catch((error) => {
				if (errorcallback !== null) {
					errorcallback(error);
				}
			});
	}
}
