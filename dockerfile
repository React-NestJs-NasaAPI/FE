# Use an official lightweight Node.js image
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and possibly package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your application's source code
COPY . .

# Build the application if necessary
# RUN npm run build

# Start a new stage from scratch
FROM node:18-alpine

WORKDIR /app

# Copy only the dependencies installation from the first image
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# Expose the port your app runs on
EXPOSE 3000

# Start the application using the npm start script
CMD ["npm", "start"]
