#
FROM iojs:latest
MAINTAINER Daniel Krech <eikeon@eikeon.com>
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -qq update && apt-get -qqy install git imagemagick graphicsmagick
RUN npm install -g bower gulp npm-check-updates && npm cache clear
#
RUN adduser --system --disabled-password --shell /bin/bash --group nogiushi
WORKDIR /opt/nogiushi
RUN chown -R nogiushi:nogiushi /opt/nogiushi
USER nogiushi
COPY bower.json /opt/nogiushi/
RUN bower install --config.interactive=false
COPY package.json /opt/nogiushi/
RUN npm install
COPY . /opt/nogiushi
RUN gulp
EXPOSE  3000
CMD npm start
