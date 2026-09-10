# 更新日志

本项目遵循[语义化版本](https://semver.org/lang/zh-CN/)。英文版见 [CHANGELOG.en.md](CHANGELOG.en.md)。

## [0.1.0] - 2026-09-10

首次发布。

### 新增

- **`convert` 工具**：在十大类单位之间换算 —— 长度、面积、体积、时间、角度、速度、温度、压力、热量/能量、功率，共 80+ 个常用单位（公制、英制/美制、常用中国市制）。
- **单位写法宽容**：`km` / `KM` / `kilometer` / `千米` / `公里` 均可识别，大小写不敏感，同时接受符号、英文全称与中文名称。
- **温度双模式**：绝对温标换算（°C / °F / K / °R）与温差换算（`Δ°C` ↔ `Δ°F`），两者不可混用并给出明确报错。
- **Web 换算视图**「单位换算 / Unit Converter」：与「对话」「轨迹」并列显示在会话视图标签栏中，纯前端运行（换算核心打包进 `lib/client.js`，不经过模型或服务器）。
  - 按类别分模块：10 个类别标签，每个模块**只显示本类别的单位**，不会把不同类别的单位混在一起。
  - 单位用下拉选择（`符号 · 单位名称`），无需手打；支持一键 ⇄ 交换、结果一键复制。
  - 温度模块提供**温差 Δ 开关**；最近换算按类别分别保存在浏览器 localStorage。
  - 界面文案与**单位名称**完整跟随 DSH 中/英文界面语言，切换语言即时刷新。
- 结果默认保留约 10 位有效数字，避免浮点噪声；非法单位与跨类换算返回结构化错误（`unknown-unit` / `category-mismatch` / `bad-value` / `mixed-delta`）。

### 变更

- 插件更名为 **`dsh-unitverse`**（原名 `dsh-unit-conversion`，unit + universe）。工具名仍为 `convert`，视图标签仍为「单位换算 / Unit Converter」。

### 发布

- npm：`dsh-unitverse@0.1.0`（首次发布，此前仅提供 GitHub 源码）
- GitHub：https://github.com/runcat-tommy/dsh-unitverse
- 浏览器端（client）部分由 `dsh.client` 声明 + `exports["./client"]` 提供，卸载/未启用时不影响工具功能。
