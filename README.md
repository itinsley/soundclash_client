# Soundclash Client

## Overview

- Totally dependent on create-react-app

## Setup

- Setup env variables `$ cp .env.example .env`
- Configure REACT_APP_SOUNDCLASH_API_BASE_URI - i.e. http://soundclash.test:3000
- **NOTE** the prestart call to checkenv.js does not seem to work when deploying to Heroku!!
- Set proxy in package.json to use edge http://soundcla5h-edge.herokuapp.com or localhost if
  running local copy of soundclash server.
- To get FB integration working you neet to setup a hostname alias to soundclash.test and run from port 3000 over SSL. Can't use Soundclash.dev as this is a reserved domain by google. soundclash.test:3000 is an approved callback URI for Facebook app.

### SSL
  - Generally you can run on SSL on localhost but if you need to use a valid domain for testing
   - Setup domain in /etc/hosts
   - Create certificate https://devcenter.heroku.com/articles/ssl-certificate-self
   - Specify cert/host/https in environment variables https://dev.to/wozzo/using-https-with-create-react-app-5337

    HOST=soundclash.test
    HTTPS=true
    SSL_CRT_FILE=./certs/server.crt
    SSL_KEY_FILE=./certs/server.key

   - Add cert to system - i.e for OSX https://support.securly.com/hc/en-us/articles/206058318-How-to-install-the-Securly-SSL-certificate-on-Mac-OSX-
  
## Start

    npm start

# Tests
## Unit tests
  `npm test` 

## e2e Tests

This project depends on e2e tests. Unit tests are used for discrete logic when appropriate but most plumbing, rendering and integration are done through integration tests against a live API. As a result, continuous deployment gets stuck behind a failing CI.

CI e2e's run against the 'edge' server

## Fixing/debugging e2e tests

1. Ensure server is up-to-date `git push edge`
2. Ensure server fixtures are up-to-data `heroku run rake api_fixtures:generate --remote edge'
3. Run tests against CI environment `BASE_URL=https://soundcla5h-client.herokuapp.com/ npm run e2e` to identify issues with tests
4. Run tests against local react environment `npm run e2e` to debug

## Fixtures

Uses fixtures defined and created _from the server_ using the command

        rake api_fixtures:generate

- Assume fixtures are always loaded at https://soundcla5h-edge.herokuapp.com

## Run against other environment

Set env variable BASE_URL - i.e

      BASE_URL=https://soundcla.sh/client npm run e2e

## Element identification

Use classes with a prefix of t- for identifying elements for testing purposes. i.e.

       t-owner-track-container


## Open (unsecured) routes

(The following routes don't require a JWT)

- http://soundcla5h-edge.herokuapp.com/clashes.json
- http://soundcla5h-edge.herokuapp.com/clashes/:id.json

# Code Structure

We are using Redux and Thunks to manage global state reads and writes.
The pattern is to avoid using connected redux components or containers unless necessary. Most components just rely on the props that are passed into them.

# TODO
## Bug
- Memory leak in Avatar

## Features
- Accept youtube link from share link
- Playlist music player!
- Nudge player..
- Twitter login


## Tech Debt
* Change API GET to find

Questions for code review
* Naming conventions - upper case for constructors and modules? lower case for functions generally. Lower case when default export == a single function?
* Inconsistency between approaches - createClash calls API directly and currentUser updates via action/redux
* Properly understanding reducers - should I have one or many? Is it ok for the action to manipulate the state and use a more general purpose reducer to actually update the state? i..e refreshUserAction

