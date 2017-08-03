FROM nginx:1.13.1-alpine

LABEL maintainer "jenkins@runoranj.com"

ADD ./dist /usr/share/nginx/html
