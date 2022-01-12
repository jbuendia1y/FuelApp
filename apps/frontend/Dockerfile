FROM node

# SET WORKSPACE
WORKDIR /app

# COPY PACKAGES
COPY ./package*.json ./

# INSTALL DEPENDENCIES FROM package-lock.json
RUN npm ci

# COPY ALL FILES
COPY . .

# BUILD FRONTEND FILES
CMD ["npm","run","build"]

FROM nginx:alpine

# UPDATE
RUN apk update
# INSTALLING TOOLS
RUN apk add vim

COPY ./dist /usr/share/nginx/html

# COPY NGINX FILES
COPY ./etc/nginx /etc/nginx

# FILES LINKED
RUN mkdir /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-aviable/fuel.app.dev /etc/nginx/sites-enabled/fuel.app.dev

EXPOSE 8080