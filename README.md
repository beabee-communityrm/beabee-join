# beabee frontend

This is the new beabee frontend, it will slowly replace the old user interface
and [beabee/beabee](https://github.com/beabee-communityrm/beabee) will become a pure API.

To set up:

```sh
cp .env.example .env
docker-compose up -d
npm install
```

You can use the default settings in `.env.example` which point to the dev API and old frontend

To start development:

```sh
npm start
```

## Frontend router

At the moment we are using nginx to only route selected paths to the Nuxt.js server
and the rest are proxied to the old frontend. This means for now when you add a new
route you also need to add it to `nginx.conf` and rebuild the router

```sh
docker-compose build router
docker-compose up -d router
```
