# build stage
FROM node:9.11.1-alpine as build-stage

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
ARG baseurl=/beta/
ENV DP_BASE_URL=$baseurl
RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
ARG baseurl=/beta/
COPY --from=build-stage /app/dist /usr/share/nginx/html$baseurl
COPY --from=build-stage /app/dist/index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]