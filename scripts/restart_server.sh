# scripts/restart_server
echo '======================'
echo 'Running restart_server'
echo '======================'

NODE_ENV=production npx pm2 start /home/ec2-user/app/dist/dear-world-production/src/app.js -i 0 --name "admin" &
NODE_ENV=production npx nodemon /home/ec2-user/app/dist/dear-world-production/src/scripts/init_countries_table.js
NODE_ENV=production npx nodemon /home/ec2-user/app/dist/dear-world-production/src/scripts/init_emojies_table.js