# Google One 响应正文替换（多平台代理规则参考合集）

[中文教程](./README.md) | [English Guide](./README_EN.md)

本项目参考了开源社区及 GitHub 上公开的 `one.google.com/ai?` 响应正文替换方案，将其整理并适配至主流 iOS / macOS 代理客户端，提供 **一键导入** 与 **Raw 链接导入** 方式，方便在不同客户端环境下自托管使用。

---

## 一、方案说明

本仓库仅对他人公开的通用规则思路进行多平台语法整理与教程补充，核心逻辑与原方案一致：

| 维度 | 说明 |
| :--- | :--- |
| **适配客户端** | **Shadowrocket（小火箭）、Stash、Surge、Loon、Quantumult X、Egern** |
| **导入方式** | 提供 **GitHub Raw 链接** 与 **iOS URL Scheme 一键拉起导入** |
| **规则透明性** | 各平台独立配置文件，纯静态正则替换（QX 仅 8 行零依赖本地 JS），无任何外部网络请求 |
| **文档支持** | 提供中英双语配置步骤、CA 证书信任指引及常见问题排查 |

---

## 二、核心原理说明

本仓库所有平台的规则只做同一件事：
- **MitM 解密域名**：`one.google.com`
- **匹配 URL**：`^https://one\.google\.com/ai\?.*$`（仅匹配带 `?` 参数的 `/ai?` 页面，不匹配不带问号的 `/ai`）
- **响应正文正则替换**：
  1. `30tb.ai.pro.m` → `30tb.m`
  2. `20tb.m.v2` → `20tb.m`
- **新增 Shadowrocket AI Ultra 模块（[`google-one-ultra.sgmodule`](./shadowrocket/google-one-ultra.sgmodule)）**：匹配 `^https://one\.google\.com/ai.*$`，将 `g1.ios.30tb.ai.pro.m` → `g1.ai.ultra.1month_eft.acq`。

> [!NOTE]
> Clash / Mihomo 等纯内核代理工具原生不支持 HTTPS MitM 响应正文改写，因此未包含在列表中。

---

## 三、各平台一键导入 & 复制链接

> **提示**：在 iPhone Safari 中点击下方的「一键导入」链接可直接唤起对应 App；如果 GitHub App 内置浏览器拦截了跳转，请点击「复制 Raw 链接」到对应 App 中手动粘贴导入。

| 平台 | 文件路径 | 一键导入（iOS Safari） | Raw 链接（复制粘贴到 App） |
| :--- | :--- | :--- | :--- |
| **Shadowrocket（小火箭）** | [`shadowrocket/google-one.sgmodule`](./shadowrocket/google-one.sgmodule) | [一键导入小火箭](shadowrocket://install?module=https%3A%2F%2Fraw.githubusercontent.com%2Freidentify%2Fgoogle-one-rewrite%2Fmain%2Fshadowrocket%2Fgoogle-one.sgmodule) | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/shadowrocket/google-one.sgmodule` |
| **Shadowrocket（小火箭 · AI Ultra）** | [`shadowrocket/google-one-ultra.sgmodule`](./shadowrocket/google-one-ultra.sgmodule) | [一键导入小火箭 (Ultra)](shadowrocket://install?module=https%3A%2F%2Fraw.githubusercontent.com%2Freidentify%2Fgoogle-one-rewrite%2Fmain%2Fshadowrocket%2Fgoogle-one-ultra.sgmodule) | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/shadowrocket/google-one-ultra.sgmodule` |
| **Stash** | [`stash/google-one.stoverride`](./stash/google-one.stoverride) | [一键导入 Stash](stash://install-override?url=https%3A%2F%2Fraw.githubusercontent.com%2Freidentify%2Fgoogle-one-rewrite%2Fmain%2Fstash%2Fgoogle-one.stoverride) | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/stash/google-one.stoverride` |
| **Surge** | [`surge/google-one.sgmodule`](./surge/google-one.sgmodule) | [一键导入 Surge](surge:///install-module?url=https%3A%2F%2Fraw.githubusercontent.com%2Freidentify%2Fgoogle-one-rewrite%2Fmain%2Fsurge%2Fgoogle-one.sgmodule) | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/surge/google-one.sgmodule` |
| **Loon** | [`loon/google-one.plugin`](./loon/google-one.plugin) | [一键导入 Loon](loon://import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2Freidentify%2Fgoogle-one-rewrite%2Fmain%2Floon%2Fgoogle-one.plugin) | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/loon/google-one.plugin` |
| **Quantumult X** | [`quantumult-x/google-one.conf`](./quantumult-x/google-one.conf) | 见下方 QX 教程 | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/quantumult-x/google-one.conf` |
| **Egern** | [`egern/google-one.yaml`](./egern/google-one.yaml) | 见下方 Egern 教程 | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/egern/google-one.yaml` |

---

## 四、保姆级配置教程（中文）

### 1. Shadowrocket（小火箭）

1. **导入模块**（二选一）：
   - **方法 A（复制链接，最稳妥）**：打开小火箭 → 底部 **配置** → 往下滑找到 **模块** → 点击右上角 **`+`** → 粘贴下方链接 → 点 **完成**：
     ```text
     https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/shadowrocket/google-one.sgmodule
     ```
   - **方法 B（一键拉起）**：在 iPhone Safari 打开本页面，点击上方表格中的 **「一键导入小火箭」**。
2. **开启 HTTPS 解密（MitM）并信任证书**：
   - 底部 **配置** → 点击当前使用的配置文件右侧 **`i`** → **HTTPS 解密** → 打开开关。
   - 若之前未安装证书：点击 **生成新的 CA 证书** → **安装证书** → 前往 iOS **设置 → 通用 → VPN 与设备管理** 完成安装。
   - **关键一步**：前往 iOS **设置 → 通用 → 关于本机 → 证书信任设置** → 开启 **Shadowrocket** 证书的**完全信任**。
3. **验证生效**：
   - 打开小火箭代理开关，重启 Google One App 并进入套餐页即可。使用完毕后可在 **模块** 中随时关闭。

---

### 2. Stash

1. **导入覆写**：打开 Stash → **覆写** → 右上角 **`+`** → 粘贴下方链接并启用：
   ```text
   https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/stash/google-one.stoverride
   ```
2. **开启 MitM 并信任证书**：
   - Stash 首页 → **MitM** → 打开开关 → **CA 证书**（生成并安装描述文件，然后在 iOS `证书信任设置` 中开启完全信任）。
   - 注意：小火箭的证书与 Stash 的证书**不通用**，必须分别信任。
3. **验证**：在 Stash **检视 HTTP 请求** 中筛选 `one.google.com`，查看改写前后响应正文。

---

### 3. Surge

1. 打开 Surge → **模块（Modules）** → **安装新模块** → 粘贴下方链接：
   ```text
   https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/surge/google-one.sgmodule
   ```
2. 确保 Surge 的 **MitM** 开关已开启，且 Surge CA 证书已在 iOS 系统中安装并完全信任。

---

### 4. Loon

1. 打开 Loon → **配置** → **插件（Plugin）** → 右上角 **`+`** → 粘贴下方链接：
   ```text
   https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/loon/google-one.plugin
   ```
2. 确保 Loon 的 **MitM** 与 **重写** 开关均已打开，且 Loon CA 证书已安装并完全信任。

---

### 5. Quantumult X

1. 打开 Quantumult X → 底部 **风车图标** → **重写（Rewrite）** → **引用（Resource）** → 右上角 **`+`** → 粘贴下方链接：
   ```text
   https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/quantumult-x/google-one.conf
   ```
2. 返回风车页，确认 **重写** 和 **MitM** 开关均已打开，且 QX CA 证书已安装并完全信任。

---

### 6. Egern

1. 打开 Egern → **模块** → 添加远程模块，粘贴下方链接：
   ```text
   https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/egern/google-one.yaml
   ```
2. 开启 **MitM** 并安装信任 Egern CA 证书。

---

## 五、常见问题排查（FAQ）

1. **导入后没有生效？**
   - 检查是否在 iOS **设置 → 通用 → 关于本机 → 证书信任设置** 中打开了对应 App 证书的开关（很多人只安装了描述文件，漏了这一步）。
   - 检查对应 App 的 **HTTPS 解密 / MitM** 总开关是否已开启。
   - 完全划掉 Google One App 后台，重新打开再试。
2. **用完需要关闭吗？**
   - **强烈建议用完即关**：直接关闭该模块/覆写即可，不需要卸载证书。

---

## 六、参考来源与致谢

本项目思路与规则适配参考了以下 GitHub 开源仓库，感谢各位作者的分享与整理：

- [anpplex/Surge](https://github.com/anpplex/Surge)
- [kawhaiyoung/rule](https://github.com/kawhaiyoung/rule)
- [crhywun/g1-modules](https://github.com/crhywun/g1-modules)
