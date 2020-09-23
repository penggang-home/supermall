module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'commonjs': "@/commonjs",
        // 'router': '@/router',//this.$router
        // 'store': '@/store',//this.$store
      }
    }
  },
  // devServer: {
  //   port: 8080, // 设置端口号
  //   host: 'localhost',
  //   open: true, //运行自动启动浏览器
  // }
}