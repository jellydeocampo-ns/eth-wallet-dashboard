# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend code
COPY . .

# Build the React app
RUN npm run build

# Install `serve` to run the build
RUN npm install -g serve

# Expose frontend port
EXPOSE 3000

# Serve the build
CMD ["serve", "-s", "build", "-l", "3000"]
