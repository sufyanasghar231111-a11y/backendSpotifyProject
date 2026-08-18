
FROM node:22.19.0-bookworm-slim AS frontend-builder

WORKDIR /app

COPY ./frontend/spotify/package*.json ./
RUN npm install

COPY ./frontend/spotify ./
RUN npm run build


FROM node:22.19.0-bookworm-slim

WORKDIR /app


COPY ./Backend/package*.json ./
RUN npm install

COPY ./Backend ./

// Remove Old Public file 
RUN rm -rf /app/public 
COPY --from=frontend-builder /app/dist ./public

EXPOSE 8080

CMD ["node", "server.js"]