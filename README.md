# Floating Thoughts - 思考者的诗意空间

一个极简的思考空间，让思想如梦境般漂浮。

## 功能特点

- 🌟 优雅的浮动动画效果
- 🎨 极简的黑色主题设计
- 📱 响应式设计，支持各种设备
- 🔄 自动刷新和随机生成thoughts
- 📝 本地JSON数据管理

## 技术栈

- **框架**: Next.js 15
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **数据**: 本地JSON文件

## 快速开始

### 安装依赖

```bash
npm install
# 或者
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或者
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## Thoughts 数据管理

### 文件位置
- 数据文件：`public/data/thoughts.json`

### 添加新的thoughts

直接编辑JSON文件：
1. 打开 `public/data/thoughts.json`
2. 在数组开头添加新的thought对象：
```json
{
  "时间": "2024-01-01 12:00:00",
  "内容": "你的新thought内容",
  "标签": "#句子"
}
```

### 数据格式说明
- **时间**：格式为 "YYYY-MM-DD HH:MM:SS"
- **内容**：thought的具体内容
- **标签**：分类标签，如 "#句子"、"#句子/工作" 等

### 注意事项
- 修改JSON文件后，需要刷新网页才能看到新内容
- 确保JSON格式正确，可以使用在线JSON验证工具检查
- 建议按时间倒序排列（最新的在前面）

## 项目结构

```
floating-thoughts/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React组件
│   ├── floating-thought.tsx  # 浮动thought组件
│   ├── theme-provider.tsx    # 主题提供者
│   └── ui/               # UI组件
├── public/               # 静态资源
│   ├── data/            # 数据文件
│   │   └── thoughts.json # thoughts数据
│   └── thinker.webp     # 思考者图片
└── public/               # 静态资源
    ├── data/            # 数据文件
    │   └── thoughts.json # thoughts数据
    └── thinker.webp     # 思考者图片
```

## 部署

### Vercel（推荐）
1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 自动部署完成

### 其他平台
项目可以部署到任何支持Next.js的平台。

## 开发

### 添加新功能
1. 在 `components/` 目录下创建新组件
2. 在 `app/page.tsx` 中集成
3. 测试功能正常后提交代码

### 修改样式
- 全局样式：`app/globals.css`
- 组件样式：使用Tailwind CSS类名

## 许可证

MIT License
