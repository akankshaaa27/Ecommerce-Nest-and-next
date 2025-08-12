# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

COPY .env .env

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Start the app
CMD ["node", "dist/main"]
