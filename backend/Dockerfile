FROM node:18
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .
COPY .env .env
EXPOSE 3000
# Run the web service on container startup.
CMD [ "node", "src/server.js" ]