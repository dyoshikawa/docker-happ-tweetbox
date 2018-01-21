FROM node:alpine

RUN apk --update add bash nginx

# install sudo and set dockeruser sudoer
RUN apk add sudo \
 && echo 'node ALL=(ALL:ALL) NOPASSWD:ALL' >> /etc/sudoers

RUN sed -i 's/user\ \ nginx\;/user\ \ node\;/g' /etc/nginx/nginx.conf \
 && mkdir /run/nginx
ADD server.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/happ-pre
WORKDIR /var/www/happ-pre

RUN mkdir -p src/js \
 && mkdir src/js/components \
 && mkdir src/scss \
 && mkdir dist

ADD package.json package.json
ADD .babelrc .babelrc
ADD webpack.config.js webpack.config.js
ADD index.html index.html
ADD main.js src/js/main.js
ADD style.scss src/scss/style.scss

RUN npm install --save-dev webpack babel-cli babel-preset-env babel-plugin-transform-react-jsx \
                           babel-loader node-sass jest babel-jest regenerator-runtime \
 && npm install --save hyperapp bootstrap popper.js jquery

# build js and sass
RUN npm run build

# set workdir
RUN mkdir /var/www/happ
WORKDIR /var/www/happ

# setup entrypoint
ADD happ-entrypoint.sh /bin/happ-entrypoint.sh
RUN chmod 777 /bin/happ-entrypoint.sh
USER node
ENTRYPOINT ["sh", "/bin/happ-entrypoint.sh"]