# Make this a node app on heroku

```sh
heroku buildpacks:add -a portnoy-frontend https://github.com/heroku/heroku-buildpack-nodejs.git
```

# Typed style modules

We use `typed-scss-modules` to be able to import the scss classes in typescript.
In the build and watch steps we use the `tsm` executable to generate the style module declarations.
