ARG NODE_VERSION=18.19.1
FROM node:${NODE_VERSION}-alpine
COPY . /app
WORKDIR /app
RUN npm i -g @nestjs/cli && npm install
CMD ["npm", "run", "start:dev"]
EXPOSE 3000
