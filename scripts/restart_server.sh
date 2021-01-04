# scripts/restart_server
echo '======================'
echo 'Running restart_server'
echo '======================'

cd /home/ec2-user/app/dist/dear-world-production/
npx pm2 reload ecosystem.config.js --env production &