FROM node:22-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN npm install -g @ionic/cli
EXPOSE 9002
CMD ["npm", "start"]
