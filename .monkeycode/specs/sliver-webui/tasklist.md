# Sliver WebUI 实现计划

## Phase 1: 基础设施

### Phase 1.1: 项目脚手架搭建
- [x] 初始化 Vite + React + TypeScript 项目
- [x] 配置 TailwindCSS
- [x] 配置项目目录结构
- [x] 配置路径别名 (@/)

### Phase 1.2: Go gRPC-Web 代理
- [x] 创建 website 目录结构
- [x] 实现 gRPC-Web 转换器
- [x] 嵌入 Sliver server HTTP 处理
- [x] 配置静态文件服务

### Phase 1.3: 主题配置
- [x] 定义专业安全风配色变量
- [x] 创建 TailwindCSS 主题配置
- [x] 创建全局样式文件

### Phase 1.4: 布局组件
- [x] 实现 Sidebar 侧边栏组件
- [x] 实现 Header 顶部导航组件
- [x] 实现 StatusBar 底部状态栏组件
- [x] 实现主布局容器

### Phase 1.5: gRPC 客户端封装
- [x] 安装 Protocol Buffer 编译器
- [x] 生成 TypeScript 类型定义
- [x] 创建 gRPC 服务调用封装
- [x] 创建 Zustand Store

---

## Phase 2: 核心功能

### Phase 2.1: 会话列表页面
- [ ] SessionList 组件
- [ ] SessionCard 组件
- [ ] 会话筛选和排序

### Phase 2.2: 会话交互终端
- [ ] SessionTerminal 组件
- [ ] 命令输入和处理
- [ ] 输出展示

### Phase 2.3: Beacon 列表页面
- [ ] BeaconList 组件
- [ ] TaskQueue 组件

### Phase 2.4: 主机列表页面
- [ ] HostList 组件
- [ ] HostCard 组件
- [ ] 主机详情侧边栏

### Phase 2.5: 主机详情页
- [ ] 扩展信息展示 (IP、用户、权限)
- [ ] IOC 列表
- [ ] 凭证列表

---

## Phase 3: 高级功能

### Phase 3.1: 监听器管理
- [ ] ListenerList 组件
- [ ] ListenerForm 组件
- [ ] 启动/停止监听器

### Phase 3.2: 植入物生成
- [ ] GenerateForm 组件
- [ ] 生成结果展示

### Phase 3.3: 命令任务面板
- [ ] 任务历史
- [ ] 结果展示
