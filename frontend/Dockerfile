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

# PROD: Build the Next.js app
# RUN npm run build

# Expose port 3000 to the outside world
EXPOSE 3000

# PROD: Start the Next.js app
# CMD ["npm", "start"]

# DEV: Start the Next.js app in development mode
CMD ["npm", "run", "dev"]