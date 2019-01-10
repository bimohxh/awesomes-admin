FROM registry.docker-cn.com/library/node:8.11

RUN npm install -g cnpm  --registry=https://registry.npm.taobao.org

COPY package.json /app/
WORKDIR /app
RUN cnpm install

COPY . /app
RUN npm run build

FROM nginx
COPY --from=0 /app/dist /app
COPY --from=0 /app/nginx.conf /etc/nginx/nginx.conf
