FROM node:14.17-alpine

WORKDIR /opt/beabee-frontend

COPY . ./

RUN npm install

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

CMD [ "node", "./node_modules/.bin/nuxt", "start" ]
