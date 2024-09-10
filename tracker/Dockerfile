# Use the official Node.js image as a base image
FROM node:20

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Install ts-node globally for TypeScript runtime support
RUN npm install -g ts-node

# Compile the TypeScript code
RUN npm run build


# Expose the API port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
