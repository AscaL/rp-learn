'use strict';

let Rx = require('rx');
let rp = require('request-promise');

const requestUrl = 'https://api.github.com/users';
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
				observer.onNext(resp)
				observer.onCompleted()
			})
			.catch(error => {
				console.log('error: ', error);
				observer.onError(error)
			})
	});

	responseStream.subscribe(response => {
		console.log('response:', response);
	})

});



//rp(options)
//    .then(function (repos) {
//        console.log(`User has ${repos} repos`);
//    })
//    .catch(function (err) {
//        console.log('err:', err);
//    });
