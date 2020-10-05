import React, { Component } from 'react';
import axios from 'axios';
export default function getData(method = 'get', url, callback, errorcallback, data = {}) {
	if (method === 'get') {
		axios({
			method: 'get',
			url: `http://kndlgs.com/api/${url}`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem('authenticated')}`
			}
		})
			.then((res) => {
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
		console.log('dasdassd');
		axios({
			method: 'post',
			url: `http://kndlgs.com/api/${url}`,
			data: data,
			headers: {
				'Content-Type': 'application/json-patch+json',
				Authorization: `Bearer ${localStorage.getItem('authenticated')}`
			}
		})
			.then((res) => {
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
