# build stage
FROM node:latest as build-stage

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
ARG baseurl=/
ENV DP_BASE_URL=$baseurl
RUN npm run build

# production stage
FROM nginx:1.21.6-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
ARG baseurl=/
COPY --from=build-stage /app/dist /usr/share/nginx/html$baseurl
COPY --from=build-stage /app/src/assets/images/user-demo.png /usr/share/nginx/html${baseurl}img/
COPY --from=build-stage /app/dist/index.html /usr/share/nginx/html/index.html
RUN ln -s /config /usr/share/nginx/html${baseurl}/config
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
