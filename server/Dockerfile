FROM node:20-slim AS base

ENV NODE_ENV=production

ARG PORT=3001
ENV PORT $PORT


RUN npm install -g npm@latest

WORKDIR /app
RUN chown -R node:node /app

USER node

RUN mkdir /app/log
RUN chown -R node:node /app /app/log

COPY .env.docker .env
COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node ./src ./src

EXPOSE $PORT

CMD ["nodemon", "src/server.js"]
