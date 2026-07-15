FROM node:22-alpine AS deps

#libc for downloading dependencies that aren't
#built for musl (alpine's lightweight system)
RUN apk add --no-cache libc6-compat

#Copy over package.josn and pacakge-lock.json
#to run npm ci
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# END

#Create the build image
FROM node:22-alpine AS build_image
WORKDIR /app

#Copy over the dependencies to the build image
COPY --from=deps /app/node_modules ./node_modules

#Copy this directory over to be built
COPY . .

#Build
RUN npm run build 

#END build image

#CREATE container
FROM nginx:1.31.2-alpine 
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build_image /app/dist /usr/share/nginx/html
EXPOSE 80
