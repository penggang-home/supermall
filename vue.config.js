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
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    
  }


}