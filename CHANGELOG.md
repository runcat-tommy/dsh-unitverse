# 更新日志

本项目遵循[语义化版本](https://semver.org/lang/zh-CN/)。英文版见 [CHANGELOG.en.md](CHANGELOG.en.md)。

## [1.1.1] - 2026-09-10

### 新增

- `package.json` 补上 `dsh.marketplace` 市场声明（`profiles: ["web"]`、`requiresBuildApproval: false`、`requiresRestart: true`、`manualSteps: false`）。此前该字段缺失，而其余同类插件均已声明：它供社区市场 Registry 判断插件可映射到哪些 Profile、安装是否需要构建授权 / 重启 / 手工步骤。字段取值与插件实际行为一致——运行产物已随仓库提交、无 `preinstall`/`install`/`postinstall`/`prepare` 生命周期脚本，故无需构建授权；插件带 Web client，按 Registry 规则只映射到 `web`；宿主侧工具需重启生效；安装无手工步骤。

### 发布

- npm：`dsh-unitverse@1.1.1`
- GitHub：https://github.com/runcat-tommy/dsh-unitverse

## [1.1.0] - 2026-09-10

Web 换算视图一直可用，但模型调用的 `convert` 工具自 0.1.0 起**每次调用都会被宿主校验拒绝**——本次修复该致命问题，并修正温度温差（Δ）的输出与报错。

### 修复

- **`convert` 工具完全无法调用**：输出 schema 只声明了 7 个字段，而引擎实际返回 10 个（另含 `categoryEn`、`fromInput`、`toInput`），在 `additionalProperties: false` 下每次调用都被宿主以 "returned invalid output" 拒绝。现已补齐这三个字段声明，保留调用方原始拼写的回显。
- **温差结果的 `summary` 丢掉了 Δ**：`10 Δ°C → Δ°F` 曾显示为 `10 °C = 18 °F`，读起来是一个绝对温标等式（绝对的 `10 °C` 应为 `50 °F`）。现在回显单位与 `summary` 均保留 Δ 标记：`10 Δ°C = 18 Δ°F (温度)`。
- **绝对/Δ 混用的报错会把 Δ 叠成 `ΔΔ`**：`Δ°C → K` 曾提示 `use ΔΔ°C and K consistently`（`ΔΔ°C` 不是合法单位），且只给出一种修法。现改为只给缺 Δ 的一侧补 Δ，并同时列出两种修法：`use both with the Δ marker (Δ°C, ΔK) or both absolute (°C, K)`。
- 未知单位报错文案末尾多余的尾随空格。
- 核心库 JSDoc 中过时的温差示例 `convert(1, 'Δ°C', '°F')` 已改为 `convert(1, 'Δ°C', 'Δ°F')`——原示例的调用实际会被 `mixed-delta` 拒绝，而该注释会随 `lib/*.d.ts` 一起发布，会把错误示例带给库使用者。

### 变更

- 温差换算回显的单位名现在带 `Δ` 前缀（`from` / `to` 字段与 `summary`），据此可区分温差与绝对温标读数。Web 界面不受影响（界面自行拼接显示串，不读 `summary`）。
- 测试由 88 条增至 92 条：新增"输出 schema 与返回值键集一致"的回归断言（防止"少声明字段导致工具不可调用"再次发生），以及温差回显、报错不叠 Δ 的专项断言。

### 文档

- `README.md` / `README.en.md`：补全 `convert` 返回结构（10 个字段），说明温差回显保留 Δ 标记及两种修法提示。

### 发布

- npm：`dsh-unitverse@1.1.0`
- GitHub：https://github.com/runcat-tommy/dsh-unitverse

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
