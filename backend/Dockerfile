FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY index.js swagger.yaml ./

EXPOSE 3003

CMD ["npm", "start"]