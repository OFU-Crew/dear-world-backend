# scripts/restart_server
echo '======================'
echo 'Running restart_server'
echo '======================'

NODE_ENV=production npx cross-env pm2 start /home/ec2-user/app/dist/dear-world-production/src/app.js -i 0 --name "admin" &