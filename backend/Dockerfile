# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# DEV: Install nodemon globally
RUN npm install -g nodemon

# PROD: Build the TypeScript code
# RUN npm run build

# Expose port 5000 to the outside world
EXPOSE 5000

# DEV: Use nodemon for development
CMD ["npm", "run", "dev"]

# Prod: Start the Express server
# CMD ["node", "dist/index.js"]
