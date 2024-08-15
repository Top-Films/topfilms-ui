# Build app
FROM --platform=linux/arm64 node:22-alpine as build

USER root

WORKDIR /app

ENV NODE_ENV production

COPY dist/ dist/
COPY package.json .

RUN npm install --omit=dev
RUN chown -R node:node /app

USER node

# Use Nginx as the production server
FROM --platform=linux/arm64 nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]