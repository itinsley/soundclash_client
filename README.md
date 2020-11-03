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
- App runs in /client i.e. - http://soundclash.test:3000/client

## Start

    npm start

# Tests

## Element identification

Use classes with a prefix of t- for identifying elements for testing purposes. i.e.

       t-owner-track-container

# e2e Tests

This project depends on e2e tests. Unit tests are used for discrete logic when appropriate but most plumbing, rendering and integration are done through integration tests against a live API. As a result, continuous deployment gets stuck behind a failing CI.

CI e2e's run against the 'edge' server

## Fixing/debugging e2e tests

1. Ensure server is up-to-date `git push edge`
2. Ensure server fixtures are up-to-data `heroku run rake api_fixtures:generate --remote edge'
3. Run tests against CI environment `BASE_URL=https://frifti.com/client npm run e2e` to identify issues with tests
4. Run tests against local react environment `npm run e2e` to debug

## Fixtures

Uses fixtures defined and created _from the server_ using the command

       rake api_fixtures:generate

- Assume fixtures are always loaded at http://soundcla5h-edge.herokuapp.com

## Run against other environment

Set env variable BASE_URL - i.e

      BASE_URL=https://frifti.com/client npm run e2e

## Open (unsecured) routes

(The following routes don't require a JWT)

- http://soundcla5h-edge.herokuapp.com/clashes.json
- http://soundcla5h-edge.herokuapp.com/clashes/:id.json

# Code Structure

We are using Redux and Thunks to manage global state reads and writes.
The pattern is to avoid using connected redux components or containers unless necessary. Most components just rely on the props that are passed into them.

## Components

All components depend only upon the properties passed in, this makes them pure Components and easily testable.

# TODO
## Features
- AcceptChallenge ✅
 - POST /clash_challenge/:unique_ref ✅
 - Redirect to clash ✅
 - Redirect back to challenge after Login 
 - Pick up default user picture after social login - but allow it to be changed

## Tech Debt
- Have multiple reducers
- Review file locations - lib/component
