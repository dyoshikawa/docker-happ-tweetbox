#!/usr/bin/sh
sudo mv /var/www/happ-pre/* /var/www/happ/
sudo mv /var/www/happ-pre/.??* /var/www/happ/
sudo rmdir /var/www/happ-pre
sudo chown -R 1000:1000 /var/www/happ
sudo nginx -g 'daemon off;'