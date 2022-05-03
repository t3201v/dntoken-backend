FROM node:14-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY . .

# check files list
RUN ls -a

RUN yarn install
RUN yarn run test
RUN yarn run build

EXPOSE 8080
CMD [ "node", "./index.js" ]