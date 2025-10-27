FROM node:23

RUN corepack enable && corepack prepare yarn@3.2.3 --activate

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --frozen-lockfile

COPY . .

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

EXPOSE 8000

CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = 'production' ]; then yarn build && yarn preview; else yarn dev; fi" ]
