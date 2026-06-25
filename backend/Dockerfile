FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install -g ts-node

COPY . .

EXPOSE 4000

CMD ["npx", "ts-node", "src/index.ts"]