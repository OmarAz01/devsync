FROM node:18-alpine
WORKDIR /app
COPY . /app
COPY src/ /app/src
RUN npm install
ENTRYPOINT [ "npm", "run", "dev" ]