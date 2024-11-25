FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

ENV REACT_APP_OCRENGINEHOST=http://localhost:3000

COPY dist/apps/client /usr/share/nginx/html

CMD [ "nginx","-g","daemon off;" ]