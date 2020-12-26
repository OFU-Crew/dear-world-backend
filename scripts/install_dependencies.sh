# scripts/install_dependencies
echo '============================'
echo 'Running install_dependencies'
echo '============================'

/usr/local/bin/pm2 kill
source /home/ec2-user/.bash_profile
cd /home/ec2-user/app/dist/dear-world-production/
npm install