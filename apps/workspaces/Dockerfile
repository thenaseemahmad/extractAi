FROM docker.io/node:lts-alpine

WORKDIR /app

# RUN addgroup --system workspaces && \
#           adduser --system -G workspaces workspaces

COPY dist/apps/workspaces workspaces/
# RUN chown -R workspaces:workspaces .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix workspaces --omit=dev -f install

CMD [ "node", "workspaces" ]