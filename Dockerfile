FROM caddy:2-alpine AS build
RUN apk update && apk add --no-cache nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM caddy:2-alpine AS runtime
COPY --from=build /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
ENV PUBLIC_BASE_URL=event-loop-blog-be.railway.internal
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]