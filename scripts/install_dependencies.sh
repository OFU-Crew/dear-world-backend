# scripts/install_dependencies
echo '============================'
echo 'Running install_dependencies'
echo '============================'

cd /home/ec2-user/app/dist/dear-world-production/
source /home/ec2-user/.bash_profile
npx pm2 kill
npm install