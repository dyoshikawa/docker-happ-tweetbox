#!/usr/bin/sh
if [ -f /var/www/happ/package.json ]; then
    sudo rm -rf /var/www/happ-pre
    sudo npm install
    sudo npm run build
else
    sudo mv /var/www/happ-pre/* /var/www/happ/
    sudo mv /var/www/happ-pre/.??* /var/www/happ/
    sudo rmdir /var/www/happ-pre
fi
sudo chown -R 1000:1000 /var/www/happ
sudo nginx -g 'daemon off;'