# NodeJS
<!-- @author DHJT 2019-01-23 -->
Node有两个版本线: LTS是长期维护的稳定版本Current是新特性版本

## 安装以及使用
安装版以及压缩包版
```sh
# node
.exit # 退出node命令行模式
.help
```
### centos7下安装
```sh
# 首先安装wget
yum install -y wget
# 下载nodejs最新的bin包,上传也可以
可以在下载页面https://nodejs.org/en/download/中找到下载地址。然后执行指令
wget https://nodejs.org/dist/v9.3.0/node-v9.3.0-linux-x64.tar.xz
# 解压包 依次执行
xz -d node-v9.3.0-linux-x64.tar.xz # 已经是tar包不需要这步
tar -xf node-v9.3.0-linux-x64.tar
# 部署bin文件
#  先确认你nodejs的路径，这里的路径为~/node-v9.3.0-linux-x64/bin。确认后依次执行
ln -s ~/node-v9.3.0-linux-x64/bin/node /usr/bin/node
ln -s ~/node-v9.3.0-linux-x64/bin/npm /usr/bin/npm
ln -s ~/node-v9.3.0-linux-x64/bin/npm /usr/bin/npx
# 测试
node -v
npm
npx
```

### 直接用淘宝的镜像安装成功
*安装node-sass遇到的各种各样的问题及解决*
```sh
# 国内使用淘宝的cnpm安装更为合适，下载速度也比较快
npm install -g cnpm --registry=https://registry.npm.taobao.org
# cnpm 使用，可以用一替代npm
cnpm install
cnpm install node-sass
```

[nodeJS环境搭建](https://blog.csdn.net/qq_45174759/article/details/100059802)