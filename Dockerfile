
FROM node:22.19.0-bookworm-slim AS frontend-builder

WORKDIR /app

COPY ./frontend/spotify/package*.json ./
RUN npm install

COPY ./frontend/spotify ./
COPY ./frontend/spotify/.env.example ./.env
RUN npm run build


FROM node:22.19.0-bookworm-slim

WORKDIR /app


COPY ./Backend/package*.json ./
RUN npm install

COPY ./Backend ./

COPY --from=frontend-builder /app/dist ./public

EXPOSE 3000

CMD ["node", "server.js"]