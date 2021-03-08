
# avo

Avô est une store de pagnes que l'on peut commander et faire coudre en meme 
temps en ligne.

Ce referentiel contient juste la partie backend du blog du site Avô que j'ai concu
avec principalement NodeJs, ExpressJs et MongoDB.

## Project setup
```
yarn install
```

### Launch mongo db (depending on your OS architecture) 
```
mongod --dbpath ~/data/db/
```

### Compiles and hot-reloads for development
```
nodemon server.js
```

### Or only Compiles and hot-reloads for development in a docker
```
docker-compose build
docker-compose up
```
