# Google One Response Body Rewrite (Multi-Platform Proxy Rules)

[中文教程](./README.md) | [English Guide](./README_EN.md)

This repository is a multi-platform adaptation based on publicly shared `https://one.google.com/ai?` response body rewrite solutions from the community and GitHub. It provides clean, self-hosted configurations and one-click import links for **Shadowrocket**, **Stash**, **Surge**, **Loon**, **Quantumult X**, and **Egern**.

---

## 1. Overview

This repository organizes existing community rewrite approaches into native syntax for multiple iOS/macOS proxy clients:

| Item | Details |
| :--- | :--- |
| **Supported Clients** | **Shadowrocket, Stash, Surge, Loon, Quantumult X, Egern** |
| **Import Method** | **One-click URL Scheme** + copy-paste **GitHub Raw URLs** |
| **Transparency** | Dedicated native syntax per client (zero external dependencies, no outbound requests) |
| **Documentation** | Bilingual (CN/EN) setup guides + CA certificate trust checklist |

---

## 2. How It Works

All client configs perform the exact same operation:
- **MitM Hostname**: `one.google.com`
- **URL Pattern**: `^https://one\.google\.com/ai\?.*$` (matches `/ai?` only; `/ai` without `?` is untouched)
- **Response Body Regex Replacements**:
  1. `30tb.ai.pro.m` → `30tb.m`
  2. `20tb.m.v2` → `20tb.m`

> [!NOTE]
> Pure proxy cores like Clash / Mihomo do not natively support HTTPS MitM response body rewriting.

---

## 3. One-Click Import & Raw URLs

| Client | File | One-Click Import (iOS Safari) | Raw URL |
| :--- | :--- | :--- | :--- |
| **Shadowrocket** | [`shadowrocket/google-one.sgmodule`](./shadowrocket/google-one.sgmodule) | [Install in Shadowrocket](shadowrocket://install?module=https%3A%2F%2Fraw.githubusercontent.com%2Freidentify%2Fgoogle-one-rewrite%2Fmain%2Fshadowrocket%2Fgoogle-one.sgmodule) | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/shadowrocket/google-one.sgmodule` |
| **Stash** | [`stash/google-one.stoverride`](./stash/google-one.stoverride) | [Install in Stash](stash://install-override?url=https%3A%2F%2Fraw.githubusercontent.com%2Freidentify%2Fgoogle-one-rewrite%2Fmain%2Fstash%2Fgoogle-one.stoverride) | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/stash/google-one.stoverride` |
| **Surge** | [`surge/google-one.sgmodule`](./surge/google-one.sgmodule) | [Install in Surge](surge:///install-module?url=https%3A%2F%2Fraw.githubusercontent.com%2Freidentify%2Fgoogle-one-rewrite%2Fmain%2Fsurge%2Fgoogle-one.sgmodule) | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/surge/google-one.sgmodule` |
| **Loon** | [`loon/google-one.plugin`](./loon/google-one.plugin) | [Install in Loon](loon://import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2Freidentify%2Fgoogle-one-rewrite%2Fmain%2Floon%2Fgoogle-one.plugin) | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/loon/google-one.plugin` |
| **Quantumult X** | [`quantumult-x/google-one.conf`](./quantumult-x/google-one.conf) | Copy Raw URL into Rewrite Resource | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/quantumult-x/google-one.conf` |
| **Egern** | [`egern/google-one.yaml`](./egern/google-one.yaml) | Copy Raw URL into Modules | `https://raw.githubusercontent.com/reidentify/google-one-rewrite/main/egern/google-one.yaml` |

---

## 4. Quick Setup Checklist (All iOS Clients)

1. **Import the module/override/plugin** for your client using either the **One-Click Import** link (in Safari) or by pasting the **Raw URL** inside the app.
2. **Enable HTTPS Decryption / MitM** in your proxy client.
3. **Generate & Install the CA Certificate** via iOS **Settings → General → VPN & Device Management**.
4. **Trust the Root CA**: go to iOS **Settings → General → About → Certificate Trust Settings** and toggle **ON** full trust for your proxy client's CA certificate.
5. **Force-quit and reopen** the Google One app. Disable the module when finished.

---

## 5. References & Credits

This project references and adapts ideas from the following open-source GitHub repositories. Special thanks to the respective authors:

- [anpplex/Surge](https://github.com/anpplex/Surge)
- [kawhaiyoung/rule](https://github.com/kawhaiyoung/rule)
- [crhywun/g1-modules](https://github.com/crhywun/g1-modules)
