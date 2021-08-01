# Heroku mono repo configuration

For reference see:
https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-multi-procfile

```sh
heroku buildpacks:add -a portnoy-backend https://github.com/lstoll/heroku-buildpack-monorepo.git
heroku buildpacks:add -a portnoy-frontend https://github.com/lstoll/heroku-buildpack-monorepo.git

heroku config:set -a portnoy-backend APP_ROOT=backend
heroku config:set -a portnoy-frontend APP_ROOT=frontend

heroku git:remote -a portnoy-backend -r backend
heroku git:remote -a portnoy-frontend -r frontend

git push backend master
git push frontend master
```

# Get remote heroku logs

```sh
heroku logs --tail --remote backend
heroku logs --tail --remote frontend
```
