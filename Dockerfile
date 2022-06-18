FROM node:14.17.3-alpine3.14

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN npm install

CMD ["npm", "run", "start"]