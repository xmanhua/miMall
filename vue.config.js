module.exports = {//https://cli.vuejs.org/zh/config/#pages
    // lintOnSave: false,// 开发环境下每次保存代码时都启用 eslint验证
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {//代理
            '/api': {
                target: 'http://mall-pre.springboot.cn',
                changOrigin: true,//是否将主机头设为原点
                pathRewrite: {
                    '/api' :  '',//把api设为空，api后面的路径与主机相拼，不用单个配
                }
            }
        }
    },
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch');
    },
    publicPath: './',//子路径名,github用
    // outputDir: 'dist',//不写也一样，默认就是dist
    // indexPath: 'index2.html',//生成首页
    // productionSourceMap: false,// 不生成map文件，不写也一样，默认不生成map
}