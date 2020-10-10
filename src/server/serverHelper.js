const getOne = (dataObj, request) => {
	return dataObj.data.find((b) => b.id == request.params.id);
};

const update = (Obj, request) => {
	let id = request.params.id;
	const updatedObj = { ...Obj };
	const objToUpdateIndex = updatedObj.data.findIndex((p) => p.id == id);
	updatedObj.data[objToUpdateIndex] = {
		...JSON.parse(request.requestBody),
		id
	};
};

const post = (Obj, request) => {
	let { requestBody } = request;
	let PostObj = JSON.parse(requestBody);
	let id = parseInt(Obj.data[Obj.data.length - 1].id) + 1;
	PostObj.id = id;
	const updatedObj = { ...Obj };
	updatedObj.data.push(PostObj);
};

const remove = (Obj, request) => {
	Obj.data.pop();
	let attrs = JSON.parse(request.requestBody);
	return attrs;
};

export { getOne, update, post, remove };
