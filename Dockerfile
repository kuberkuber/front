FROM node:10.21.0
LABEL maintainer="Jungeun Shin <jungeun9729@gmail.com>"

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install
COPY . .
ENV PATH /app/node_modules/.bin:$PATH

ENV NODE_ENV development
ENV NODE_PATH /app/src
EXPOSE 3000

CMD ["npm", "start"]
