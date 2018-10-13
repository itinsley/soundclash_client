# Soundclash Client

## Overview
 - Uses API branch of soundcla.sh which is deployed to http://soundcla5h-edge.herokuapp.com
 - Totally dependent on create-react-app

## Setup
 - Set proxy in package.json to use edge http://soundcla5h-edge.herokuapp.com or localhost if running local copy of soundclash server.
 - To get FB integration working you neet to setup a hostname alias to soundclash.test and run from port 3000. Can't use Soundclash.dev as this is a reserved domain by google.
 - App runs in /client i.e. - http://soundclash.test:3000/client

## Unsecured routes
 - http://soundcla5h-edge.herokuapp.com/clashes.json

## Secured routes
Only Facebook login supported at this point
 - Add JWT token for secure request
 `/users/5.json?jwt=' + localStorage.token`
