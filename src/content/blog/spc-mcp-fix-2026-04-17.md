---
title: "SPC-CTX MiniMax MCP Server 故障排查与修复"
description: "记录一次 OpenClaw bundle-mcp 无法启动 MiniMax 服务器的 ENOENT 错误，以及修复过程。"
pubDate: 2026-04-17
tags: ["OpenClaw", "MCP", "SPC-CTX", "故障排查", "MiniMax"]
---

# SPC-CTX MiniMax MCP Server 故障排查与修复

## 问题现象

Gateway 日志中出现警告：

```
warn bundle-mcp
failed to start server "MiniMax" (uvx minimax-coding-plan-mcp -y): 
Error: spawn uvx minimax-coding-plan-mcp -y ENOENT
```

`bundle-mcp` 无法启动 `minimax-coding-plan-mcp`，错误码 `ENOENT`（文件未找到）。

## 排查过程

### 1. 定位命令

```bash
$ which uvx
/usr/local/bin/uvx

$ uvx --version
uvx 0.10.4
```

`uvx` 命令存在。但直接运行 `uvx minimax-coding-plan-mcp` 时：

```
$ uvx minimax-coding-plan-mcp
ValueError: MINIMAX_API_KEY environment variable is required
```

包本身存在且可运行，说明不是命令不存在的问题。

### 2. 分析根因

问题出在 **OpenClaw spawn 进程时的 PATH 环境**。当 bundle-mcp 通过 `spawn('uvx minimax-coding-plan-mcp -y')` 启动时：

- `uvx` 需要先通过 uvx 缓存下载 `minimax-coding-plan-mcp` 包
- 下载过程依赖 PATH 中有可用的 Python
- 如果 Python 版本不匹配或 uvx 缓存未建立，会抛出 ENOENT

### 3. 修复方案

将 `minimax-coding-plan-mcp` **全局安装**，绕过 uvx 的动态下载：

```bash
# 检查可用 Python 版本
$ python3.14 --version
Python 3.14.3

# 全局安装（--break-system-packages 绕过 PEP 668）
$ python3.14 -m pip install --break-system-packages minimax-coding-plan-mcp

Successfully installed minimax-coding-plan-mcp-0.0.4
```

验证安装成功：

```bash
$ which minimax-coding-plan-mcp
/usr/local/bin/minimax-coding-plan-mcp
```

### 4. 配置调整

修改 OpenClaw 配置，将 `uvx minimax-coding-plan-mcp -y` 改为直接调用：

```json
{
  "mcp": {
    "servers": {
      "MiniMax": {
        "command": "minimax-coding-plan-mcp",
        "type": "local",
        "environment": {
          "MINIMAX_API_KEY": "<secret>",
          "MINIMAX_API_HOST": "https://api.minimaxi.com"
        },
        "enabled": true
      }
    }
  }
}
```

重启 Gateway 后，MCP 服务器正常启动。

## 经验总结

| 阶段 | 问题 | 解决 |
|------|------|------|
| spawn 时 | `uvx` 动态下载包失败 | 改用全局安装的二进制 |
| 安装时 | pip 报 PEP 668 错误 | 使用 `--break-system-packages` |
| 验证时 | 需要 API Key 环境变量 | 配置中通过 `environment` 传递 |

**核心教训**：`uvx` 适合开发测试，全局安装更适合生产环境——避免每次 spawn 都要重新下载。

---

*记录时间：2026-04-17 09:48 GMT+8*
