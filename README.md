# Dear World API
This repository is about the [Dear World](https://dear-world.live) api server.  
This api endpoint : https://api.dear-world.live

## How to build
The prerequesites are following.
* node.js 12.19.0
* express
* mysql 8.0
* redis
* .env.develop, .env.production, .env.test

The .env contents are following.
```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=dear_world
MYSQL_USERNAME=root
MYSQL_DIALECT=mysql
MYSQL_CONNECT_TIMEOUT=1000

REDIS_DEFAULT=127.0.0.1
REDIS_DEFAULT_PORT=6379

REDIS_READONLY=127.0.0.1
REDIS_READONLY_PORT=6379
```

The build script is following.
```
npm ci
npm run start
```