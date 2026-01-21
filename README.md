# Minecraft Bedrock 假人程序

这是一个基于ai开发，用于 Minecraft Bedrock Edition 的假人程序，通过模拟客户端来连接服务器，可以通过配置文件修改假人的名称，是否跟随某个玩家，以及连接到的服务器地址等。

## 功能特点

- 支持 Minecraft Bedrock 1.21.93 版本（也许更新，但是我没有测试）
- 通过配置文件自定义假人名称和服务器地址
- 支持跟随其他玩家（通过查询并复制其他玩家的数据包）
- 详细的连接日志和错误处理
- 支持在线模式连接（通过 Xbox Live 身份验证）

## 安装依赖

```bash
npm install
```

## 依赖项

| 依赖包 | 版本 | 用途 |
|-------|------|------|
| bedrock-protocol | latest | 处理 Minecraft Bedrock 协议 |
| fs-extra | ^11.2.0 | 文件系统操作 |
| prismarine-auth | ^2.7.0 | Xbox Live 身份验证 |

## 配置文件

修改 `config.json` 文件来自定义假人程序的配置：

```json
{
  "botName": "FollowerBot",      // 假人的名称
  "serverAddress": "play.simpfun.cn",  // 服务器地址
  "serverPort": 23473,            // 服务器端口
  "followPlayer": false,          // 是否跟随其他玩家
  "targetPlayer": ""              // 目标玩家的名称
}
```

## 使用方法

1. 修改 `config.json` 文件中的配置项
2. 运行假人程序：

```bash
npm start
```

3. 如果使用在线模式，程序会提示您在浏览器中登录 Xbox Live 账户以完成身份验证

## 跟随功能

要启用跟随功能，请将 `followPlayer` 设置为 `true`，并在 `targetPlayer` 中指定目标玩家的名称。假人会自动查询并复制目标玩家的移动数据包，从而实现跟随功能。

## 常见问题

### 连接超时
- 检查服务器地址和端口是否正确
- 确保服务器允许连接
- 尝试增加 `index.js` 文件中的超时时间

### 身份验证失败
- 确保您的 Xbox Live 账户有效
- 按照程序提示在浏览器中完成身份验证

### 服务器版本不兼容
- 确保您的假人程序版本与服务器版本匹配
- 可以在 `config.json` 文件中指定 `version` 字段来匹配服务器版本

## 技术细节

- 使用 Node.js 实现
- 基于 `bedrock-protocol` 库处理 Minecraft Bedrock 协议
- 支持 RakNet 协议和 Minecraft Bedrock 数据包
- 实现了完整的连接流程，包括握手、身份验证、加密等

## 许可证

MIT
