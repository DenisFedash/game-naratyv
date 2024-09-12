FROM node:alpine

WORKDIR /app

EXPOSE 5003

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["npm", "run", "start"]


