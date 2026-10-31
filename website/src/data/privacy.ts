import { REPO } from '../config';

// 文案依据固定到已核对的上游提交，更新说明时须重新核对，不能只改日期。
export const PRIVACY_REVIEW = {
  revision: 'f8beb71665cb3d93c6675a92ecfe7a92c6e64160',
  checkedAt: '2026-10-31',
} as const;

export const privacySource = (path: string) =>
  `${REPO}/blob/${PRIVACY_REVIEW.revision}/${path}`;

export const PRIVACY_POINTS = [
  {
    icon: 'offline',
    title: '课表、日程和成绩，保存在本机',
    description:
      '业务数据写入设备上的 JSON 文件，外观偏好也在本地保存。已同步的内容可以离线查看，不上传到理枝自建的数据服务。',
    source: 'lib/core/storage/json_file.dart',
    sourceLabel: '本地文件实现',
  },
  {
    icon: 'lock',
    title: '凭据与会话，交给系统安全存储',
    description:
      '学校账号凭据、学校 Cookie 与可选的 MOOC 会话，使用系统安全存储保存；不会作为普通业务 JSON 文件写入。',
    source: 'lib/school/storage.dart',
    sourceLabel: '学校凭据存储',
  },
  {
    icon: 'branch',
    title: '设备直连平台，不经理枝中转',
    description:
      '学校请求从设备发往学校接口，按需使用学校 WebVPN；MOOC 请求直接发往中国大学 MOOC。理枝是这些服务的第三方客户端，不代建登录或数据中转服务。',
    source: 'lib/school/session.dart',
    sourceLabel: '学校请求与域名校验',
  },
  {
    icon: 'phone',
    title: '不用注册理枝账号',
    description:
      '校园功能使用学校账号完成学校认证。可选的中国大学 MOOC 需单独登录官方页面，或导入 Cookie；MOOC 密码由官方登录页处理，理枝保存登录后的会话。',
    source: 'docs/architecture.md',
    sourceLabel: '认证与 MOOC 数据流',
  },
  {
    icon: 'chart',
    title: '不做行为遥测，诊断留在本地',
    description:
      '当前实现不内置使用行为统计或自动崩溃上报。故障日志只在本机保留七天，并对密码、学号、Cookie 等字段做脱敏；查看、导出与分享由你决定。',
    source: 'lib/core/diagnostics.dart',
    sourceLabel: '日志保留与脱敏',
  },
  {
    icon: 'close',
    title: '退出账号，不等于删除所有数据',
    description:
      '退出学校账号会移除本机学校登录信息，本地课表和日程继续保留；MOOC 会话需在对应账号页退出。需要删除业务数据时，请使用相应的删除操作。',
    source: 'lib/school/controller.dart',
    sourceLabel: '学校退出登录实现',
  },
] as const;

export const PRIVACY_BOUNDARIES = [
  {
    title: '检查更新也会联网',
    description:
      '应用启动后会自动检查更新，也支持手动检查。它会访问 GitHub 的版本与提交信息，自动检查结果缓存一天；这些请求不附带学校凭据、Cookie 或课表成绩。',
    source: 'lib/updates/release.dart',
    sourceLabel: '更新请求实现',
  },
  {
    title: '平台认证仍按平台规则进行',
    description:
      '学校认证可能包含短信、图形验证码与风控请求；MOOC 官方登录页也可能使用自身的验证服务。这些是对应平台的认证行为，不是理枝的行为统计。外部页面的数据处理由对应服务决定。',
    source: 'lib/school/login.dart',
    sourceLabel: '学校认证与风控',
  },
  {
    title: '部分学校接口仍使用 HTTP',
    description:
      '学校请求会校验目标域名，但教务记录的 jwms.bit.edu.cn 直连入口仍使用 HTTP；不能把本地客户端等同于所有网络通信都经过 HTTPS 加密。',
    source: 'lib/school/network.dart',
    sourceLabel: '学校接口与协议范围',
  },
  {
    title: '本地保存不等于全部加密',
    description:
      '系统安全存储用于凭据与会话；课表、日程、学业数据及日志没有额外的逐文件加密。请保护设备和备份，分享日志前再次检查内容。',
    source: 'lib/core/storage/json_file.dart',
    sourceLabel: '业务文件保存方式',
  },
] as const;
