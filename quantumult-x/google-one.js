// Quantumult X 响应正文替换脚本（零外部依赖、无网络请求）
let body = $response.body;
if (body) {
  body = body
    .replace(/30tb\.ai\.pro\.m/g, '30tb.m')
    .replace(/20tb\.m\.v2/g, '20tb.m');
}
$done({ body });
