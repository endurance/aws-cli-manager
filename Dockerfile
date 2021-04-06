FROM bitnami/node:12-prod

RUN mkdir -p /workspace

WORKDIR /workspace

#RUN npm install -g electron --unsafe-perm=true --allow-root
COPY package.json .

RUN npm i --unsafe-perm=true --allow-root

COPY . .


