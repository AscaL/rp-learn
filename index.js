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

let requestStream = refreshClickStream
	.map(() => {
		let randomOffset = Math.floor(Math.random() * 500);
		return `https://api.github.com/users?since=${randomOffset}`;
	})
	.startWith(`https://api.github.com/users`); // note: change to refreshClickStream.startWith('startup click').map()...

let responseStream = requestStream.flatMap((options) => {
	return Rx.Observable.fromPromise(rp(options))
});

responseStream.subscribe(response => {
	console.log(`response: ${response}`);
});

let suggestion1Stream = responseStream.map((listUsers) => {
	// Get a random user from the list
	return listUsers[Math.floor(Math.random() * listUsers.length)];
});

let suggestion2Stream = responseStream.map((listUsers) => {
	// Get a random user from the list
	return listUsers[Math.floor(Math.random() * listUsers.length)];
});

let suggestion3Stream = responseStream.map((listUsers) => {
	// Get a random user from the list
	return listUsers[Math.floor(Math.random() * listUsers.length)];
});

