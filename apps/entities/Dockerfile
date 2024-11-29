FROM docker.io/node:lts-alpine

WORKDIR /app
COPY dist/apps/entities entities/
RUN npm --prefix entities --omit=dev -f install

CMD [ "node", "entities" ]