# scripts/restart_server
echo '======================'
echo 'Running restart_server'
echo '======================'

cd /home/ec2-user/app/dist/dear-world-production/
source /home/ec2-user/.bash_profile
npx pm2 reload ecosystem.config.js --env production