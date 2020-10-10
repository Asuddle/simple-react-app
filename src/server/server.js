import { createServer, Model } from 'miragejs';
import { remove, getOne, post, update } from './serverHelper';
import children from './JSON/children.json';
import classes from './JSON/class.json';
import family from './JSON/family.json';

let meta = {
	current_page: 1,
	from: 1,
	last_page: 1,
	path: 'path',
	per_page: 10,
	to: 10,
	total: 10
};

export default function() {
	createServer({
		models: {
			branch: Model
		},

		routes() {
			this.namespace = 'api';
			/**
			 * Login Route
			 */

			// this.post('/public/auth', () => {
			// 	return {
			// 		status: '200',
			// 		api_token: 'abc'
			// 	};
			// });

			/*
			Base Module
			*/

			//Phrases

			//Terms

			this.get('/Children', () => ({
				status: 200,
				data: children.data,
				meta: meta
			}));
			this.get('/Children/:id', (schema, request) => {
				return {
					data: getOne(children, request)
				};
			});
			this.post('/Children', (schema, request) => post(children, request));
			this.patch('/Children/:id', (schema, request) => update(children, request));
			this.delete('/Children/:id', (schema, request) => remove(children, request));

			this.get('/Class', () => ({
				status: 200,
				data: classes.data,
				meta: meta
			}));
			this.get('/Class/:id', (schema, request) => {
				return {
					data: getOne(classes, request)
				};
			});
			this.post('/Class', (schema, request) => post(classes, request));
			this.patch('/Class/:id', (schema, request) => update(classes, request));
			this.delete('/Class/:id', (schema, request) => remove(classes, request));

			this.get('/Family', () => ({
				status: 200,
				data: family.data,
				meta: meta
			}));
			this.get('/Family/:id', (schema, request) => {
				return {
					data: getOne(family, request)
				};
			});
			this.post('/Family', (schema, request) => post(family, request));
			this.patch('/Family/:id', (schema, request) => update(family, request));
			this.delete('/Family/:id', (schema, request) => remove(family, request));
		}
	});
}
