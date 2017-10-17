FROM node:8.7.0-alpine

MAINTAINER RemyNguyen96 <buttercut8@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /src

COPY package.json .

RUN npm i

EXPOSE 3000

CMD ["npm", "dev"]

