FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
EXPOSE 3333
CMD ["node", "src/index.js"]
