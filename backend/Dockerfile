FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY index.js swagger.yaml prisma7.config.ts ./
COPY prisma ./prisma

EXPOSE 3003

CMD ["npm", "start"]