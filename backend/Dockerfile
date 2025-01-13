# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "start"]
