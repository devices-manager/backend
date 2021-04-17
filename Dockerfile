# This file is a template, and might need editing before it works on your project.
FROM node:erbium

WORKDIR /var/www

COPY package.json /var/www
RUN npm install --silent --progress=false
COPY . /var/www
EXPOSE 3000
CMD [ "npm","run","dev"]
