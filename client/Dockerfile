# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install the app dependencies
RUN npm i

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Command to run your app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
