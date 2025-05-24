# BJJtube Clone

# Getting Started with CLIENT Create React App
get to ./src/config.js and check BASE_FETCH_URL (the api route)

Para servirlo con pm2 el build hacer:

npm run build
pm2 serve build/ 8002 --name "bjjtube-client" --spa


# Getting Started with SERVER
complete .env_template and rename to .env
npm i
npm run start