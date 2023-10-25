FROM node:20.5.1-slim

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/user-service

CMD ["tail", "-f", "/dev/null"]

