# Sliver WebUI 前端设计方案

**日期**: 2026-04-01  
**项目**: Sliver Implant Framework  
**目标**: 为 Sliver 红队框架设计一套可视化 Web 前端界面

---

## 1. 技术架构

**技术栈选择**:
- **前端**: React 18 + Vite + TypeScript + TailwindCSS
- **后端**: Go 语言，嵌入 Sliver server 作为 gRPC-Web 代理
- **通信**: gRPC-Web (将浏览器 HTTP 请求转换为 gRPC 调用)
- **数据库**: 复用 Sliver 现有的 SQLite/MySQL/PostgreSQL

**通信流程**:
```
浏览器 → React UI → HTTP/gRPC-Web 代理 → gRPC Server (Sliver) → 数据库/操作
```

---

## 2. 界面设计

### 2.1 配色方案 (专业安全风)

| 用途 | 颜色 | Hex |
|------|------|-----|
| 主背景 | 深黑 | #1a1a1a |
| 次背景 | 深灰黑 | #252525 |
| 边框 | 灰色 | #3a3a3a |
| 主文字 | 浅灰 | #e0e0e0 |
| 强调色 | 橙色 | #ff6600 |
| 成功 | 绿色 | #00cc66 |
| 警告 | 红色 | #ff3333 |
| 信息 | 蓝色 | #3399ff |

### 2.2 整体布局

```
┌────────────────────────────────────────────────────────────────┐
│  [Logo] Sliver WebUI              [Operator] [Settings] [?]   │
├────────────┬───────────────────────────────────────────────────┤
│            │                                                    │
│  [Sessions]│          主工作区                                  │
│  [Beacons] │     (会话列表 / Beacon 详情 / 命令交互)            │
│  [Hosts]   │                                                    │
│  ─────────│                                                    │
│  [Jobs]    │                                                    │
│  [Listeners]                                                    │
│  ─────────│                                                    │
│  [Loot]    │                                                    │
│  [Creds]   │                                                    │
│  [Websites]│                                                    │
│            │                                                    │
├────────────┴───────────────────────────────────────────────────┤
│  [Status: Connected]  [Active Sessions: 3]  [Beacons: 5]       │
└────────────────────────────────────────────────────────────────┘
     侧边栏（60px 折叠 / 200px 展开）
```

### 2.3 核心页面

| 页面 | 功能 |
|------|------|
| Dashboard | 概览：活动会话、Beacon、任务统计 |
| Sessions | 会话列表、实时互动、命令执行 |
| Beacons | Beacon 列表、任务队列、交互终端 |
| Hosts | 主机列表、IOC 情报、标签管理 |
| Listeners | C2 监听器管理（mTLS/WG/DNS/HTTP） |
| Generate | 植入物生成配置 |

---

## 3. 数据模型

### 3.1 主机情报 (Host)

```typescript
interface Host {
  id: string
  hostname: string
  hostUUID: string
  ipAddress: string           // 主机 IP
  lastSeen: timestamp
  osVersion: string
  
  // 扩展信息
  architecture: string       // x64/x86/ARM
  locale: string
  domain: string             // 所属域
  username: string           // 当前登录用户
  userUID: string            // 用户 SID
  privileges: string[]       // 权限列表
  isElevated: boolean        // 是否提权
  processName: string
  processPID: number
  glideinMem: number
  glideinCPU: number
  
  // IOC 情报
  iocs: IOC[]
  tags: string[]
}
```

### 3.2 会话详情 (Session)

```typescript
interface Session {
  id: string
  beaconID: string
  name: string
  hostname: string
  uuid: string
  
  // 连接信息
  hostUUID: string
  ipAddress: string
  port: number
  transport: string         // mTLS/WireGuard/HTTP/DNS
  encrypted: boolean
  compressed: boolean
  
  // 用户上下文
  username: string
  uid: string
  domain: string
  privileges: string[]
  
  // 状态
  isActive: boolean
  isElevated: boolean
  lastSeen: timestamp
  activeC2: string
}
```

---

## 4. API 设计

### 4.1 gRPC 服务映射

| 前端操作 | gRPC 调用 | 说明 |
|----------|-----------|------|
| 获取会话列表 | `GetSessions()` | 返回所有活动/断开的会话 |
| 与会话交互 | `Rpc()` | 发送命令到会话 |
| 获取 Beacon 列表 | `GetBeacons()` | 返回所有 Beacon |
| 发送 Beacon 命令 | `BeaconTask()` | 向 Beacon 队列添加任务 |
| 获取任务结果 | `BeaconTaskResult()` | 30s 轮询获取任务输出 |
| 创建监听器 | `StartMTLSListener()` | 启动 C2 监听器 |
| 生成植入物 | `Generate()` | 生成新的植入物二进制 |
| 获取主机列表 | `GetHosts()` | 返回所有主机 |
| 获取主机详情 | `GetHost()` | 返回单个主机详情 |

### 4.2 REST 辅助端点

| 功能 | 端点 | 方法 |
|------|------|------|
| 获取主机列表 | `/api/hosts` | GET |
| 获取主机详情 | `/api/hosts/:id` | GET |
| 获取主机凭证 | `/api/hosts/:id/credentials` | GET |
| 更新主机标签 | `/api/hosts/:id/tags` | PUT |

### 4.3 数据刷新策略

- **会话列表**: WebSocket 推送或 5s 轮询
- **Beacon 结果**: 30s 轮询 `BeaconTaskResult`
- **任务队列**: 实时展示 pending tasks
- **主机情报**: 按需加载

---

## 5. 项目文件结构

```
website/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Button, Input, Card, Modal
│   │   │   ├── layout/         # Sidebar, Header, StatusBar
│   │   │   ├── session/         # SessionList, SessionTerminal
│   │   │   ├── beacon/         # BeaconList, BeaconTerminal, TaskQueue
│   │   │   ├── host/           # HostCard, HostDetail, IOCList
│   │   │   ├── listener/       # ListenerCard, ListenerForm
│   │   │   └── generate/       # GenerateForm, GenerateResult
│   │   ├── pages/              # Dashboard, Sessions, Beacons, Hosts, Listeners, Generate
│   │   ├── services/           # gRPC 客户端封装
│   │   ├── stores/             # Zustand 状态管理
│   │   ├── hooks/              # 自定义 Hooks
│   │   ├── types/              # TypeScript 类型定义
│   │   ├── styles/             # 全局样式和主题
│   │   └── utils/              # 工具函数
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── index.html
│
├── server/                      # Go 后端
│   ├── web/                     # HTTP 处理和静态文件
│   ├── grpcweb/                 # gRPC-Web 转换
│   └── website.go              # Web 服务入口
│
├── Makefile
└── README.md
```

---

## 6. 实施计划

### Phase 1：基础设施 (1-2周)

| 任务 | 优先级 | 说明 |
|------|--------|------|
| 项目脚手架搭建 | P0 | Vite + React + TypeScript + TailwindCSS |
| Go gRPC-Web 代理 | P0 | 嵌入 Sliver server |
| 主题配置 | P0 | 专业安全风配色 |
| 布局组件 | P0 | Sidebar, Header, StatusBar |
| gRPC 客户端封装 | P0 | TypeScript 类型生成和服务调用 |

### Phase 2：核心功能 (2-3周)

| 任务 | 优先级 | 说明 |
|------|--------|------|
| 会话列表页面 | P0 | 展示所有会话，支持筛选排序 |
| 会话交互终端 | P0 | 轮询命令执行 |
| Beacon 列表页面 | P1 | 展示 Beacon 及任务队列 |
| 主机列表页面 | P1 | 展示主机及扩展信息 |
| 主机详情页 | P1 | IP、用户、权限、IOC 等 |

### Phase 3：高级功能 (3-4周)

| 任务 | 优先级 | 说明 |
|------|--------|------|
| 监听器管理 | P1 | 启动/停止 C2 监听器 |
| 植入物生成 | P2 | 配置和生成植入物 |
| 命令任务面板 | P2 | 任务队列、结果展示 |

---

## 7. 错误处理

| 错误类型 | 处理方式 |
|----------|----------|
| gRPC 连接失败 | 顶部 Banner "Connection Lost"，自动重连 |
| 会话断开 | 会话卡片变灰，显示 "Disconnected" |
| 命令执行失败 | 终端显示红色错误信息 |
| 认证失败 | 跳转登录页面 |

---

## 8. 确认记录

- [x] 技术栈：React + Go 后端
- [x] 界面风格：专业安全风 (#1a1a1a + #ff6600)
- [x] 功能范围：基础版
- [x] 部署方式：嵌入式部署
- [x] 主机情报：包含 IP、用户、权限等扩展字段
- [x] 数据刷新：Beacon 结果 30s 轮询，任务队列实时展示
