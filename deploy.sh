#!/bin/bash

sudo service nogiushi stop
sudo docker rm -f nogiushi.com
sudo docker tag -f eikeon/nogiushi.com:dev eikeon/nogiushi.com:prod
sudo docker rmi eikeon/nogiushi.com:dev
sudo docker create --name="nogiushi.com" -p 3000:3000 -t eikeon/nogiushi.com:prod
sudo service nogiushi start
