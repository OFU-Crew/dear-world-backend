# scripts/install_dependencies
echo '============================'
echo 'Running install_dependencies'
echo '============================'

npx pm2 kill
source /home/ec2-user/.bash_profile
cd /home/ec2-user/app/dist/dear-world-production/
npm install

NODE_ENV=production npx cross-env npx node /home/ec2-user/app/dist/dear-world-production/src/scripts/init_countries_table.js
NODE_ENV=production npx cross-env npx node /home/ec2-user/app/dist/dear-world-production/src/scripts/init_emojies_table.js