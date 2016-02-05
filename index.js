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

/* Get the refresh button */
let refreshButton = document.querySelector('.refresh');

/* Creates stream from refreshButton from the 'click' event */
let refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

let startupRequestStream = Rx.Observable.just('https://api.github.com/users');

/* Maps to each click a new index to search */
let requestOnRefreshStream = refreshClickStream.map(() => {
	let randomOffset = Math.floor(Math.random() * 500);
	return `https://api.github.com/users?since=${randomOffset}`;
});

let requestStream = Rx.Observable.merge(startupRequestStream, requestOnRefreshStream);

let responseStream = requestStream.flatMap((options) => {
	return Rx.Observable.fromPromise(rp(options))
});

responseStream.subscribe(response => {
	console.log(`response: ${response}`);
});
