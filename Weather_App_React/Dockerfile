# Use an existing image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

EXPOSE 3000
# Run the React app
CMD [ "npm", "start" ]
