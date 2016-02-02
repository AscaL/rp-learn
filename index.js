'use strict';

let Rx = require('rx');
let rp = require('request-promise');

const requestUrl = 'https://api.github.com/users/AscaL';
const options = {
	uri: requestUrl,
	headers: {
		'User-Agent': 'AscaL'
	},
	json: true // Automatically parses the JSON string in the response
};

let requestStream = Rx.Observable.just(requestUrl);

requestStream.subscribe(function (requestUrl) {
	let responseStream = Rx.Observable.create(function (observer) {
		rp(options)
			.then(resp => {
				observer.onNext(resp);
				observer.onCompleted();
			})
			.catch(error => {
				console.log('error: ', error);
				observer.onError(error);
			})
	});

	responseStream.subscribe(response => {
		console.log('response:', response);
	})
});

let responseStream = requestStream.flatMap((options) => {
	return Rx.Observable.fromPromise(rp(options))
});

responseStream.subscribe(response => {
	console.log('response:', response);
});

let refreshButton = document.querySelector('.refresh');
let refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

let requestStream = refreshClickStream.map(() => {
	let randomOffset = Math.floor(Math.random() * 500);
	return 'https://api.github.com/users?since=' + randomOffset;
});
