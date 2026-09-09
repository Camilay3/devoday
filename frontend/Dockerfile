# FROM node:22-alpine AS build

# WORKDIR /app

# COPY package*.json ./
# RUN npm ci

# COPY . ./
# RUN npm run build

# FROM nginx:1.27-alpine

# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
