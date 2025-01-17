---
title: Dockerfile
permalink: /microservice/dockerfile.html
---

# Dockerfile

### 运行流程

- docker从基础镜像运行一个容器
- 执行一条指令并对容器做出修改
- 执行类似docker commit 的操作提交一个新的镜像层
- docker再基于提交的镜像运行一个容器
- 执行dockerfile中的下一条指令知道所有指令都执行完成

### 常用指令

#### FROM

基础镜像，当前新镜像基于那个镜像，指定一个已经存在的镜像作为模板，一般第一条指令为FROM

#### MAINTAINER

镜像维护者的姓名和邮箱地址，表明联系方式

#### RUN

容器构建时需要运行的命令，一般有两种格式：

- `shell`指令格式
- `exec`命令格式 ：RUN ['参数一' , '参数二' , ...]

RUN是在执行`docker bulid`命令时候运行的

#### EXPOSE

当前容器需要对外暴露的端口

#### WORKDIR

指定在容器创建后，终端默认登陆后进来的工作目录，即：文件路径落脚点

#### USER

指令该镜像需要什么样的用户角色去执行，如果没有指定，就默认root用户

#### ENV

用来在构建过程中，设置镜像的环境变量 方便后面使用；

#### ADD

将宿主机目录下的文件拷贝到镜像中，并且会自动处理URL和解压tar压缩包

#### COPY

类似ADD保留字功能，用来拷贝文件和目录到镜像中

将从构建上下文目录中<源路径>的文件/目录复制到新的一层的镜像内的<目标路径>位置,基本过程如下：

- COPY src dest
- COPY ["src" , "dest" ]
- <src源路径>： 源文件或者源目录
- <dest目标路径>：容器内的指定路径，该路径不用事先建好，如果没有会自动创建

#### VOLUME

容器卷，可以用来实现文件的映射

#### CMD

用来指定容器启动后需要做的事情/流程，

CMD指令和RUN指令格式相似，支持两种格式：

- shell格式： CMD <命令>
- exec 格式： CMD ["参数一" , "参数二" ,"...."]
- 参数列表格式： CMD ["参数一" , "参数二" , "..."]，在指定了ENTRYPOINT指令后，用CMD指定具体的参数

**注意：dockerfile中可以有多个CMD指令，但是只有最后一个会生效，CMD会被docker run之后的参数/bin/bash替换掉**

CMD指令和RUN指令的区别：

- CMD命令是在docker run时运行
- RUN命令是在docker build命令时运行

#### ENTRYPOINT

也是用来指定一个容器启动时要运行的命令，类似CMD指令，注意传参格式

### 构建镜像

用来构建node.js镜像，部署项目

```dockerfile

# 安装node
FROM node:22.13.0-alpine
# 标签
LABEL version="Beta1.0"
LABEL description="基于egg框架实现的Oauth2统一认证登录"
# 作者
LABEL author="微信公众号：储凡"
LABEL email="mmdapl@163.com"
# 创建项目空间
RUN mkdir -p /web-project/node/oauth2-service
# 将当前代码文件复制到工作区域
COPY .. /web-project/node/oauth2-service
# 进入 vendors
WORKDIR /web-project/node/oauth2-service
# 指定npm仓库
RUN npm install --registry https://registry.npm.taobao.org
# 暴露端口
EXPOSE 8848
# 项目启动
CMD ["npm","run","start"]

```
