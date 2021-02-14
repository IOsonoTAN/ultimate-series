FROM node:14
WORKDIR /usr/src/app
COPY ./ /usr/src/app
RUN npm install && npm run build && npm install -g serve
EXPOSE 3000
CMD ["serve", "-p", "3000", "-s", "build"]