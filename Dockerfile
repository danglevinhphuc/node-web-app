FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install 
RUN npm install -g pm2 
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

COPY . /usr/src/app

ENV CLOUD_NAME=phuc-company \
    API_KEY=838986499921257 \
    API_SECRET=24nudYVIDiv2F03axjKBbYP_eHY \

CMD  pm2 start --no-daemon  processes.json