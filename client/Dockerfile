FROM node:10 as base

WORKDIR /app

COPY package.json /app/package.json
RUN npm install --silent

COPY . /app
RUN npm run build

FROM nginx

EXPOSE 3000

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=base /app/build /usr/share/nginx/html
