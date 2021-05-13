FROM node:12.16-alpine

WORKDIR /opt/beabee-frontend

COPY . ./

RUN npm install

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

RUN npm run build

CMD [ "npm", "start" ]
