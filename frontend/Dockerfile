FROM node:22

WORKDIR /frontend

COPY package*.json ./
# copy file package.json and package-lock.json to container docker

RUN npm install
# install all package

COPY . ./
# copy all file to cantainer docker ( include node_module ซึ่ง install ไปแล้ว )

EXPOSE 5173

CMD ["npm", "run", "dev"]



