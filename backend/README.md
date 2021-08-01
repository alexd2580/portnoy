# Export requirements.txt for heroku [superceeded by poetry buildpack]

```sh
poetry export -f requirements.txt > requirements.txt
```

Instead of the above use buildpacks:

```sh
heroku buildpacks:add https://github.com/moneymeets/python-poetry-buildpack.git --remote backend
heroku buildpacks:add heroku/python --remote backend
```
