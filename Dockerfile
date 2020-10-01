FROM node:10.21.0
LABEL maintainer="Jungeun Shin <jungeun9729@gmail.com>"

RUN mkdir -p /app
WORKDIR /app
ADD . /app
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install
RUN npm install react-scripts@3.0.1 -g
ENV NODE_ENV development
EXPOSE 3000 3000

CMD ["npm", "start"]
