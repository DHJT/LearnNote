# Git使用
<!-- @DHJT 2018-01-24 -->
## `Git Flow`
- Production
- Develope
- Feauture
- Release
- Hotfix

## 基础知识
- Workspace：工作区
- Index / Stage：暂存区
- Repository：仓库区（或本地仓库）
- Remote：远程仓库
[liaoxuefeng.com](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

- [GitHub分支管理 - 多人协作](https://www.linuxidc.com/Linux/2018-10/154583.htm)

## 工具
- [TortoiseGit](https://tortoisegit.org/)

## 配置
Git的设置文件为`.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。
``` sh
#显示当前的Git配置
git config --list
#编辑Git配置文件
git config -e [--global]
#设置提交代码时的用户信息
git config [--global] user.name "[name]"
git config [--global] user.email "[email address]"

# git 查看远程仓库，以及与本地仓库的关系：
git remote show origin
```

git clone 指定分支,拉代码
1.git clone 不指定分支
`git clone  http://10.1.1.11/service/tmall-service.git`
2.git clone 指定分支
`git clone -b dev_jk http://10.1.1.11/service/tmall-service.git`
命令中：多了一个  -b dev-jk,这个dev_jk就是分支，http://10.1.1.11/service/tmall
-service.git为源码的仓库地址
--------------------- 
作者：lightClouds917 
来源：CSDN 
原文：https://blog.csdn.net/weixin_39800144/article/details/78205617 
版权声明：本文为博主原创文章，转载请附上博文链接！

## 同一代码库提交到不同remote库
``` sh
git remote set-url origin --push --add git@github.com:TopGuo/ShareT.git
//git remote set-url origin --push --add '你的远程库地址'
```

1. 新建版本库
mkdir Git_Repository
cd Git_Repository
git init
git init dir   新建一个目录，将其初始化为Git代码库
2. git add readme.txt
3. git commit -m "wrote a new file."
4. git status
   git diff readme.txt
   git log
   git log --pretty=oneline
5. 版本回退
git reset --hard HEAD^  (HEAD~100)
--
只要上面的命令行窗口还没有被关掉，你就可以顺着往上找啊找啊，找到那个append GPL的commit id是3628164...，于是就可以指定回到未来的某个版本：
$ git reset --hard 3628164
HEAD is now at 3628164 append GPL

版本号没必要写全，前几位就可以了，Git会自动去找
5.git reflog用来记录你的每一次命令
6.工作区与暂存区

7. 撤销修改
令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
总之，就是让这个文件回到最近一次git commit或git add时的状态。
8.删除文件
git rm删掉，并且git commit。

## 远程仓库
第1步：创建SSH Key。在用户主目录下，看看有没有.ssh目录，如果有，再看看这个目录下有没有id_rsa和id_rsa.pub这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开Shell（Windows下打开Git Bash），创建SSH Key：
$ ssh-keygen -t rsa -C "youremail@example.com"

你需要把邮件地址换成你自己的邮件地址，然后一路回车，使用默认值即可，由于这个Key也不是用于军事目的，所以也无需设置密码。
如果一切顺利的话，可以在用户主目录里找到.ssh目录，里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。
第2步：登陆GitHub，打开“Account settings”，“SSH Keys”页面：
然后，点“Add SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容：

点“Add Key”，你就应该看到已经添加的Key：

为什么GitHub需要SSH Key呢？因为GitHub需要识别出你推送的提交确实是你推送的，而不是别人冒充的，而Git支持SSH协议，所以，GitHub只要知道了你的公钥，就可以确认只有你自己才能推送。
当然，GitHub允许你添加多个Key。假定你有若干电脑，你一会儿在公司提交，一会儿在家里提交，只要把每台电脑的Key都添加到GitHub，就可以在每台电脑上往GitHub推送了。
*测试是否成功ssh -T git@github.com
1. 添加远程库
要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git；
关联后，使用命令git push -u origin master第一次推送master分支的所有内容；
此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；
下面的例子是下载再上传
``` sh
git config --global user.name "your name"
git config --global user.email "your_email@youremail.com"
git clone url
git add file 
git commit -m '~'
git push
```
2. 从远程库克隆
要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。
Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快
``` sh
# 下载远程仓库的所有变动
$ git fetch [remote]
# 显示所有远程仓库
$ git remote -v
# 显示某个远程仓库的信息
$ git remote show [remote]
# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]
# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]
# 上传本地指定分支到远程仓库
$ git push [remote] [branch]
# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force
# 推送所有分支到远程仓库
$ git push [remote] --all
```

## 分支管理
1.创建与合并分支
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>
创建+切换分支：git checkout -b <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>
显示分支：git branch -a
- 绿色的表示本地当前分支
- 红色的表示远程的分支。
- origin/HEAD -> origin/hydro 指：远程库的当前分支是hydro
2.解决冲突
用带参数的git log也可以看到分支的合并情况：
$ git log --graph --pretty=oneline --abbrev-commit
用git log --graph命令可以看到分支合并图。
3.分支管理策略
在实际开发中，我们应该按照几个基本原则进行分支管理：
首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。
所以，团队合作的分支看起来就像这样：


合并分支时，加上`--no-ff`参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。
`git merge --no-ff -m "merge with no-ff" dev`
4.BUG分支
5.Feature分支
开发一个新feature，最好新建一个分支；
如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。
- 多人协作
    + 查看远程库信息，使用`git remote -v`；
    + 本地新建的分支如果不推送到远程，对其他人就是不可见的；
    + 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
    + 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
    + 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
    + 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

## 四.自定义Git

- 忽略特殊文件
    + 忽略某些文件时，需要编写`.gitignore`；
    + `.gitignore`文件本身要放到版本库里，并且可以对`.gitignore`做版本管理！
- 配置别名：
    + 配置`Git`的时候，加上`--global`是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。
    + 配置文件放哪了？每个仓库的 Git 配置文件都放在`.git/config`文件中
    + 当前用户的`Git`配置文件放在用户主目录下的一个隐藏文件`.gitconfig`中
``` sh
git config --global alias.st status
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

## 搭建Git服务器

## 标签管理
- 创建标签
``` sh
# 找到历史提交的commit id：
git log --pretty=oneline --abbrev-commit
git tag <name>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
git tag -a <tagname> -m "blablabla..."可以指定标签信息；
git tag -s <tagname> -m "blablabla..."可以用PGP签名标签；
git tag 可以查看所有标签。
git show <tagname>可以看到PGP签名信息：
```
- 操作标签
``` sh
git push origin <tagname>可以推送一个本地标签；
git push origin --tags可以推送全部未推送过的本地标签；
git tag -d <tagname>可以删除一个本地标签；
git push origin :refs/tags/<tagname>可以删除一个远程标签。
```

## GitHub使用
```ini
请创建默认的 UNIX 用户帐户。该用户名不需要与 Windows 用户名匹配。
有关详细信息，请访问: https://aka.ms/wslusers
请输入新的 UNIX 用户名: 123
useradd: group '123' does not exist
adduser："/usr/sbin/useradd -d /home/123 -g 123 -s /bin/bash -u 1000 123"返回错误代码 6，退出。
创建 UNIX 用户失败，稍后可以通过运行 lxrun.exe /setdefaultuser 来完成此操作
安装成功!
环境将立即启动...
文档在以下网址提供:  https://aka.ms/wsldocs
```

```sh
# or create a new repository on the command line
echo "# sxy" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:DHJT/sxy.git
git push -u origin master

# or push an existing repository from the command line
git remote add origin git@github.com:DHJT/sxy.git
git push -u origin master
```
给现有的代码项目打上标签
git tag -a v1.4 -m 'my version 1.4' 
分享标签 ， 默认情况下，git push 并不会把标签传送到远端服务器上，只有通过显式命令才能分享标签到远端仓库。其命令格式如同推送分支，运行
`git push origin [tagname]` 即可


### 不要用git pull，用git fetch和git merge代替它。
git pull的问题是它把过程的细节都隐藏了起来，以至于你不用去了解git中各种类型分支的区别和使用方法。当然，多数时候这是没问题的，但一旦代码有问题，你很难找到出错的地方。看起来git pull的用法会使你吃惊，简单看一下git的使用文档应该就能说服你。
将下载（fetch）和合并（merge）放到一个命令里的另外一个弊端是，你的本地工作目录在未经确认的情况下就会被远程分支更新。当然，除非你关闭所有的安全选项，否则git pull在你本地工作目录还不至于造成不可挽回的损失，但很多时候我们宁愿做的慢一些，也不愿意返工重来。
