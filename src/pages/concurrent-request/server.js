const Koa = require('koa');
const Router = require('koa-router');
const Mock = require('mockjs');

// 创建 Koa 实例
const app = new Koa();
const router = new Router();

// 模拟登录接口
router.get('/api/userinfo', async (ctx) => {
    // 使用 Mock.js 生成模拟数据
    const responseData = Mock.mock({
        'status': 200,
        'message': 'Login successful',
        'data': {
            'token': '@guid', // 生成一个随机的 token
        }
    });

    // 设置响应状态和内容
    ctx.status = 200;
    ctx.body = responseData;
});

// 使用路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());

// 启动服务器
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
