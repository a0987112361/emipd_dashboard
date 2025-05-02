#!/usr/bin/env bash
node_version=16.14
app_path='/home/winhome/project/emipd/dashboard'
app_name='emipd.dashboard.iiv.tw'
app_version='1.0.0'
app_port=80
internal_port=8031

source ~/.nvm/nvm.sh
nvm install ${node_version}
nvm use ${node_version}
rm -rf ${app_path}/.env
cat <<EOT >> ${app_path}/.env
NODE_PATH=./

REACT_APP_API_SERVER=https://emipd.backend.iiv.tw

REACT_APP_NOTIFICATION_REFRESH_TIMEOUT=300000
REACT_APP_MESSAGE_REFRESH_TIMEOUT=60000
REACT_APP_SYSTEM_TIME_REFRESH_TIMEOUT=60000

REACT_FRONT_END_URL=https://emipd.iiv.tw
EOT

cd ${app_path}
npm install --force
npm run build

docker stop ${app_name} || true && docker rm ${app_name} || true
docker run -d --name ${app_name} --restart=always -p ${internal_port}:${app_port} nginx
docker cp ${app_path}/build/. ${app_name}:/usr/share/nginx/html/.
docker cp ${app_path}/docker/nginx/conf.d/default.conf ${app_name}:/etc/nginx/conf.d/.
docker restart ${app_name}