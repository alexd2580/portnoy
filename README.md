# Heroku mono repo configuration

For reference see:
https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile

```zsh
heroku buildpacks:add -a portnoy-backend heroku-community/multi-procfile
heroku buildpacks:add -a portnoy-frontend heroku-community/multi-procfile
heroku config:set -a portnoy-backend PROCFILE=backend/Procfile
heroku config:set -a portnoy-frontend PROCFILE=frontend/Procfile
git push https://git.heroku.com/portnoy-backend.git HEAD:master
git push https://git.heroku.com/portnoy-frontend.git HEAD:master
```
