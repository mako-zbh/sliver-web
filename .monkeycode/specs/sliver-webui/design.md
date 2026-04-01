# Sliver WebUI 技术设计

## 1. 概述

本文档描述 Sliver WebUI 的技术设计方案，旨在为 Sliver 红队框架提供一套可视化 Web 前端界面。

## 2. 技术栈

- **前端框架**: React 18 + Vite + TypeScript
- **样式方案**: TailwindCSS
- **状态管理**: Zustand
- **gRPC 通信**: gRPC-Web + @improbable-eng/grpc-web
- **后端**: Go 嵌入 Sliver server，gRPC-Web 代理

## 3. 配色方案 (专业安全风)

```css
:root {
  --color-bg-primary: #1a1a1a;
  --color-bg-secondary: #252525;
  --color-border: #3a3a3a;
  --color-text-primary: #e0e0e0;
  --color-text-secondary: #a0a0a0;
  --color-accent: #ff6600;
  --color-success: #00cc66;
  --color-warning: #ff3333;
  --color-info: #3399ff;
}
```

## 4. 目录结构

```
website/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── styles/
│   └── package.json
├── server/
│   ├── web/
│   ├── grpcweb/
│   └── website.go
└── Makefile
```

## 5. gRPC 服务映射

| 前端操作 | gRPC 调用 |
|----------|-----------|
| 获取会话列表 | GetSessions() |
| 与会话交互 | Rpc() |
| 获取 Beacon 列表 | GetBeacons() |
| 发送 Beacon 命令 | BeaconTask() |
| 获取任务结果 | BeaconTaskResult() |
| 创建监听器 | StartMTLSListener() 等 |
| 生成植入物 | Generate() |

## 6. 数据模型

### Session
- id, beaconID, name, hostname, uuid
- hostUUID, ipAddress, port, transport
- encrypted, compressed
- username, uid, domain, privileges
- isActive, isElevated, lastSeen, activeC2

### Host
- id, hostname, hostUUID, ipAddress
- username, userUID, privileges, isElevated
- architecture, locale, domain, osVersion
- processName, processPID, glideinMem, glideinCPU
- iocs, tags

## 7. 组件列表

### 布局组件
- Sidebar - 侧边导航
- Header - 顶部导航
- StatusBar - 底部状态栏
- MainLayout - 主布局容器

### 功能组件
- SessionList, SessionCard, SessionTerminal
- BeaconList, BeaconTerminal, TaskQueue
- HostList, HostCard, HostDetail
- ListenerList, ListenerCard, ListenerForm
- GenerateForm

## 8. 状态管理

使用 Zustand 进行状态管理：
- sessionStore - 会话状态
- beaconStore - Beacon 状态
- hostStore - 主机状态
- listenerStore - 监听器状态
