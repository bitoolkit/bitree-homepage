# 安全性与隐私：文案依据

核对日期：2026-10-31。应用上游：`https://github.com/bitoolkit/BITree`，`main` 提交 `f8beb71665cb3d93c6675a92ecfe7a92c6e64160`。

此次重新克隆当前上游源码核对，未继续使用较早的 `/tmp/bitree-readme.md`。这里只记录网站文案的源码依据，不是渗透测试、依赖全链路安全审计或法律合规声明。功能页的来源链接固定到该提交。

## 已核对的实现

| 主题 | 源码 / 文档 | 核对结果与表述限制 |
| --- | --- | --- |
| 本地业务存储 | `lib/core/storage/json_file.dart`、`lib/schedule/store.dart`、`lib/agenda/store.dart`、`lib/academics/store.dart` | 应用支持目录下的 `schedule.json`、`agenda.json`、`academics.json`；原子写入普通 JSON，未做逐文件加密。不能宣传“全部数据加密”。 |
| 本地偏好 | `lib/app/controller.dart` | 外观、语言和日程视图使用 `SharedPreferencesAsync`；不是云端账户同步。 |
| 学校凭据与 Cookie | `lib/school/storage.dart` | `flutter_secure_storage`；Cookie 通过安全存储实现持久化。iOS/macOS 使用 `unlocked_this_device`。不是普通业务 JSON。 |
| MOOC 会话 | `lib/mooc/storage.dart`、`lib/mooc/credentials.dart`、`lib/mooc/ui/login.dart` | 可选且独立于学校账号；在中国大学 MOOC 官方页面登录，也可导入 Cookie；保存浏览器会话到系统安全存储。密码由官方页面处理。不能写“没有任何第三方平台登录”。 |
| 学校请求 | `lib/school/session.dart`、`lib/school/network.dart`、`lib/school/connection.dart` | 设备直连学校域名并校验重定向，教学中心可走学校 WebVPN；不是理枝运营的代理或服务器。`jwms.bit.edu.cn` 仍允许 HTTP，不能宣传“全部网络请求均 HTTPS”。 |
| 学校风控 | `lib/school/login.dart` 的 `_riskPayload`、`docs/architecture.md` | 认证按学校协议提交验证码、风控数据与 token；目标为学校 SSO 路径。这不能描述为“从不发送认证或设备相关参数”。与应用行为统计分开说明。 |
| MOOC 请求 | `lib/mooc/api.dart`、`docs/architecture.md` | 固定 HTTPS 来源的读取请求，由设备直接访问 MOOC；官方登录页的验证和资源服务由平台控制。不能承诺“所有请求只到学校域名”。 |
| 行为遥测 / 崩溃上报 | `pubspec.yaml`、`pubspec.lock`、`lib/main.dart`、`lib/core/diagnostics.dart`，以及 `lib/` 中的网络调用检查 | 当前直接依赖及应用实现未发现专门的统计/遥测/自动崩溃上报接入。全局异常写入本地诊断；此结论不替外部官方网页或第三方服务作零采集承诺，也不是对全部传递依赖的独立审计。 |
| 诊断日志 | `lib/core/diagnostics.dart`、`lib/app/ui/logs_screen.dart` | 本地保留最近七个日历日、预览最近 100 行。密码、学号、Cookie、Authorization、token 等字段及 URL 查询参数有脱敏处理；不是保证能识别所有个人信息。导出使用用户选择的文件路径，无自动上传路径。导出文件包含版本与运行环境。 |
| 更新检查 | `lib/app/ui/app_screen.dart`、`lib/updates/repository.dart`、`lib/updates/release.dart` | 启动恢复账号后自动检查；手动检查也可用。GitHub Releases、比较提交等公开 API，不附带学校凭据、会话或业务 JSON。自动结果缓存一天。请求仍会向 GitHub暴露正常网络连接信息，部分请求 URL 包含当前版本。不是遥测，也不是“完全无非校园请求”。 |
| 退出登录 | `lib/school/controller.dart` 的 `signOut`、`lib/school/storage.dart`、`lib/mooc/controller.dart` 的 `disconnect`、README“数据与隐私” | 学校凭据和学校会话清除，课表和日程保留；学业数据文件并未整体删除；MOOC 需单独退出。不能写“退出账号删除全部数据”。 |
| 卸载与备份 | Android manifest、平台安全存储和文件实现 | Android 明确 `allowBackup=false`；其他平台及手动导出文件不作统一删除保证。因此修正帮助页“卸载一定清除全部数据”的过度表述。 |

## 维护入口

- 功能页完整说明：`src/pages/features.astro`，锚点 `#g-privacy`。
- 可追溯事实与核对提交：`src/data/privacy.ts`。
- 首页摘要：`src/components/Privacy.astro`。
- 使用帮助相关边界：`src/pages/help.astro`。

更新上游后，先重新核对存储、凭据、网络目标、认证、诊断、更新及退出行为，再同时修改核对提交与页面内容。不要单独刷新“核对日期”，也不要把项目自己的文案当作独立证据。
