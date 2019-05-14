FROM node:10 as base

WORKDIR /app
COPY . /app

RUN cp .env.example .env
RUN npm install --no-optional

FROM node:10-alpine

WORKDIR /app
COPY --from=base /app /app

ENV PORT 8000
EXPOSE 8000

CMD ["npm", "start"]
