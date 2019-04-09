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

    HTTPS=true npm start

# API

## Open (unsecured) routes
 - http://soundcla5h-edge.herokuapp.com/clashes.json
 - http://soundcla5h-edge.herokuapp.com/clashes/:id.json
