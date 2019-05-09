# Soundclash Client

## Overview
 - Uses API branch of soundcla.sh which is deployed to http://soundcla5h-edge.herokuapp.com
 - Totally dependent on create-react-app

## Setup
 - Setup env variables `$ cp .env.example .env`
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

       npm run e2e

## Fixtures
Uses fixtures defined and created *from the server* using the command

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