FROM node:16 AS base

WORKDIR /usr/src

FROM base AS dependencies
COPY package*.json ./
RUN npm install --no-audit --prefer-offline

FROM dependencies AS dev
COPY . .

CMD ["npm", "start"]
