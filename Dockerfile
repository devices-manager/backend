# This file is a template, and might need editing before it works on your project.
FROM node:12-alpine AS node


# Builder stage

FROM node AS builder

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY package*.json ./   

# Install all dependencies
RUN npm i               

# Copy the rest of the code
COPY . .                

# Invoke the build script to transpile code to js
RUN npm run build       


# Final stage


FROM node AS final

# Prepare a destination directory for js files              
ARG DATABASE=localhost
ARG USER=root
ARG PASS=cuen

# Use /app as CWD
WORKDIR /app

ENV DATABASE=${DATABASE}
ENV USER=${USER}
ENV PASS=${PASS}

# Copy package.json and package-lock.json
COPY package*.json ./                   

# Install only production dependencies
RUN npm i --only=production             

# Copy transpiled js from builder stage into the final image
COPY --from=builder ./app/config ./config
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/swagger.json ./swagger.json

# Open desired port
EXPOSE 3000

# Use js files to run the application
ENTRYPOINT ["node", "./dist/index.js"]