# FROM node:22-alpine AS build

# RUN npm install -g @angular/cli

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN ng build --configuration=production

# FROM nginx:alpine

# COPY --from=build /app/dist/* /usr/share/nginx/html/

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]





# FROM node:22-alpine

# RUN npm install -g @angular/cli

# WORKDIR /app

# COPY package*.json ./

# RUN npm install
# COPY . .

# EXPOSE 4200

# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Stage 1: Build Angular App
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production --project RazorPay

# Stage 2: Serve App with NGINX
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app from builder stage
COPY --from=builder /app/dist/RazorPay/browser /usr/share/nginx/html

# Optional: Copy custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
