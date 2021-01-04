# scripts/restart_server
echo '======================'
echo 'Running restart_server'
echo '======================'

cd /home/ec2-user/app/dist/dear-world-production/
source /home/ec2-user/.bash_profile
NODE_ENV=production npx pm2 start ecosystem.config.js -i 0 --name "admin" &