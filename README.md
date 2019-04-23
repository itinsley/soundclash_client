# Soundclash Client

## Overview
 - Uses API branch of soundcla.sh which is deployed to http://soundcla5h-edge.herokuapp.com
 - Totally dependent on create-react-app

## Setup
 - Setup env variables `$ cp .env.example .env`
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

 - Uses fixtures defined and created *from the server* using the command

       rake api_fixtures:generate

- Assume fixtures are always loaded at http://soundcla5h-edge.herokuapp.com

## Open (unsecured) routes
(The following routes don't require a JWT)
 - http://soundcla5h-edge.herokuapp.com/clashes.json
 - http://soundcla5h-edge.herokuapp.com/clashes/:id.json
