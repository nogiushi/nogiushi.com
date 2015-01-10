#
FROM nodesource/node:trusty
MAINTAINER Daniel Krech <eikeon@eikeon.com>
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -qq update && apt-get -qqy install git
ADD . /opt/nogiushi
RUN adduser --system --disabled-password --shell /bin/bash --uid=1000 --group nogiushi
RUN chown -R nogiushi:nogiushi /opt/nogiushi
WORKDIR /opt/nogiushi
RUN npm install -g npm
RUN npm install -g bower gulp
USER nogiushi
RUN bower install --config.interactive=false && npm install
EXPOSE  3000
CMD gulp
