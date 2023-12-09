FROM node:lts AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD /bin/sh -c "envsubst '\${PORT:-8080}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"