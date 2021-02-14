FROM node:14
WORKDIR /usr/src/app
COPY ./ /usr/src/app
RUN npm install && npm run build
EXPOSE 4000
CMD [ "npm", "start" ]