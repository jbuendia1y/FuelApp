FROM node

# SET WORKSPACE
WORKDIR /app

# COPY PACKAGES
COPY ./package*.json ./

# INSTALL DEPENDENCIES FROM package-lock.json
RUN npm ci

# COPY ALL FILES
COPY . .

CMD ["npm","run","build"]

FROM nginx:alpine

COPY /app/dist /usr/share/nginx/html