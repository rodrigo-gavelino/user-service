FROM node:20.5.1-slim

RUN apt-get update && \
    apt-get install build-essential librdkafka-dev -y

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/user-service

CMD ["tail", "-f", "/dev/null"]

