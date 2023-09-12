# 使用规范

在项目中，redis属于高频使用，遇到了各种各样的redis问题，针对自身情况梳理了一个redis使用规范。

### Key的设计

- 禁止包含特殊字符(比如空格、换行、单双引号以及其他转义字符)

- 建议风格一致 建议同时大驼峰、同时小驼峰或者下划线；是项目级别的统一

- key不能太长也不能太短,**键名越长越占资源，太短可读性太差**

- key 单词与单词之间以冒号` ：`分开。市面上的redis可视化工具，`:`比较容易进行下级选择

- redis使用的时候注意命名空间，**一个项目一个命名空间，项目内业务不同命名空间也不同**。

一般情况下：
- 第一段放置项目名或缩写 如 project
- 第二段把表名转换为key前缀 如, user:
- 第三段放置用于区分区key的字段,对应mysql中的主键的列名,如userid
- 第四段放置主键值,如18,16

结合起来  PRO:USER:UID:18  就很清晰

### value设计

- 拒绝大key操作，禁用超过10K的string大key(虽然redis支持512MB大小的string)，如果1mb的key每秒重复写入10次，就会导致写入网络IO达10MB。


- 设计key时使用合适的数据类型(在资源利用和性能之间作平衡)。例如：将一个普通字符串弄成hash类型进行存储这是不合理的
- 控制key的生命周期，例如：key设置为永不过期是不合理的，也不建议过期时间全部一样，避免key大面积失效，mysql被打满


- 控制value长度。例如string类型，如果value为'8个字节的长整型'则内部使用int类型，如果value为'小于等于39个字节的字符串'则内部使用embstr类型，如果value为'大于39个字节的字符串'则内部使用raw类型。这样能很好的利用redis的性能。

#### 数据按需存储

不需要的数据千万不要存储在redis，只会浪费内存空间


### 命令使用

- 禁止使用keys、flushall、hmgetall等命令
> 为防止业务研发的误操作，通常可以在交付redis实例之前将默认命令rename掉；而真正需要删除或者遍历key时可以使用scan家族命令
- 慎用hgetall、lrange、smembers、zrange等命令
> 除非业务场景需要，尽量不要使用这些命令。如果没有控制好会导致操作量过大，形成阻塞。

### 项目实战
- 项目redis使用问题

>当前的使用方式是，每个接入的应用要配置核心项目的redis配置。这样是不合理的，核心项目的redis应该只能在核心项目中使用，对外应该是提供api接口或者rpc进行访问。


- 注意key的过期时间设置

> 在报名等高峰期的时候，key值设置过短容易造成**缓存穿透**，导致大量请求直接打到mysql数据库。

- 提防缓存穿透

> 空值也应该被缓存，经常使用会只给有数据的结果进行缓存，结果导致空数据无法缓存，相同查询直接每次都到达数据库，所以

- 不建议将redis做为消息队列

> 如没有非常特殊的需求，严禁将 Redis 当作消息队列使用。redis 当作消息队列使用，会有容量、网络、效率、功能方面的多种问题。
如需要消息队列，可使用高吞吐的 Kafka 或者高可靠的 RocketMQ，nsq,(花园同步有时间前后要求，且量不大才使用的)。

#### 查询使用

##### 线上Redis禁止使用Keys正则匹配操作

>redis是单线程处理，在线上Key数量较多时，操作效率极低【时间复杂度为O(N)】，该命令一旦执行会严重阻塞线上其它命令的正常请求，而且在高QPS情况下会直接造成redis服务崩溃！如果有类似需求，可以使用scan命令代替。

