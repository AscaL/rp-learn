'use strict';

let Rx = require('rx');

const requestUrl = 'https://api.github.com/users';
const options = {
  uri: requestUrl,
  headers: {
    'User-Agent': 'AscaL'
  },
  json: true // Automatically parses the JSON string in the response
};

/* Get the refresh button */
let refreshButton = document.querySelector('.refresh');

let close1Button = document.querySelector('.close1');
let close2Button = document.querySelector('.close2');
let close3Button = document.querySelector('.close3');

/* Creates stream from refreshButton from the 'click' event */
let refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

var close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');
var close2ClickStream = Rx.Observable.fromEvent(close2Button, 'click');
var close3ClickStream = Rx.Observable.fromEvent(close3Button, 'click');

let requestStream = refreshClickStream.startWith('startup click')
  .map(() => {
    let randomOffset = Math.floor(Math.random() * 500);
    return `https://api.github.com/users?since=${randomOffset}`;
  })

let responseStream = requestStream.flatMap((requestUrl) => {
  return Rx.Observable.fromPromise($.ajax({url: requestUrl}))
});

responseStream.subscribe(response => {
  console.log(`response: ${response[1]}`);
});

let suggestion1Stream = close1ClickStream.startWith('startup click')
  .combineLatest(responseStream, function (click, listUsers) {
    return listUsers[Math.floor(Math.random() * listUsers.length)];
  }).merge(refreshClickStream.map(() => {
    return null;
  })).startWith(null);

let suggestion2Stream = close2ClickStream.startWith('startup click')
  .combineLatest(responseStream, function (click, listUsers) {
    return listUsers[Math.floor(Math.random() * listUsers.length)];
  }).merge(refreshClickStream.map(() => {
    return null;
  })).startWith(null);

let suggestion3Stream = close3ClickStream.startWith('startup click')
  .combineLatest(responseStream, function (click, listUsers) {
    return listUsers[Math.floor(Math.random() * listUsers.length)];
  }).merge(refreshClickStream.map(() => {
    return null;
  })).startWith(null);




/* -------------------- Rendering -------------------- */
function renderSuggestion(suggestedUser, selector) {
  let suggestionEl = document.querySelector(selector);
  if (suggestedUser === null) {
    suggestionEl.style.visibility = 'hidden';
  } else {
    suggestionEl.style.visibility = 'visible';
    let usernameEl = suggestionEl.querySelector('.username');
    usernameEl.href = suggestedUser.html_url;
    usernameEl.textContent = suggestedUser.login;
    let imgEl = suggestionEl.querySelector('img');
    imgEl.src = "";
    imgEl.src = suggestedUser.avatar_url;
  }
}

suggestion1Stream.subscribe((suggestedUser) => {
  renderSuggestion(suggestedUser, '.suggestion1');
});

suggestion2Stream.subscribe((suggestedUser) => {
  renderSuggestion(suggestedUser, '.suggestion2');
});

suggestion3Stream.subscribe((suggestedUser) => {
  renderSuggestion(suggestedUser, '.suggestion3');
});
