FROM docker.io/node:lts-alpine

WORKDIR /app

# RUN addgroup --system entities && \
#           adduser --system -G entities entities

COPY dist/apps/entities entities/
# RUN chown -R entities:entities .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix entities --omit=dev -f install

CMD [ "node", "entities" ]