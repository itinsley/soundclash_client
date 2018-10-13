# Soundclash Client

## Overview
 - Uses API branch of soundcla.sh which is deployed to http://soundcla5h-edge.herokuapp.com

## Setup
Set proxy in package.json to use edge http://soundcla5h-edge.herokuapp.com or localhost if running local copy of soundclash server.

## Unsecured routes
 - http://soundcla5h-edge.herokuapp.com/clashes.json

## Secured routes
Only Facebook login supported at this point
 - Add JWT token for secure request
 `/users/5.json?jwt=' + localStorage.token`
