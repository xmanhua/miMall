<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="/miMall/dist/imgs/logo-footer.png" alt="mi">
            <p>小米商城</p>
        </div>
        <div class="footer-link">
          <a href="https://xmh-web.com/">xmh的主页</a><span>|</span>
          <a href="https://coding.imooc.com/class/113.html" target="_blank">Vue全栈课程</a><span>|</span>
          <a href="https://coding.imooc.com/class/236.html" target="_blank">React全家桶课程</a><span>|</span>
          <a href="https://coding.imooc.com/class/343.html" target="_blank">微信支付专项课程</a><span>|</span>
          <a href="https://coding.imooc.com/class/392.html" target="_blank">配套课程：Java通用型支付+电商平台双系统实战</a>        </div>
        <div class="copyright">Copyright ©2020 <span class="domain">mi.futurefe.com</span> All Rights Reserved.</div>
    </div>
</template>
<script>
    export default {
        name: 'nav-footer'
    }
</script>
<style lang="scss" scoped>//scoped 是局布渲染使用
  .footer{
    height:234px;
    border-top:4px solid #FF6600;
    background-color:#333333;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-logo{
      margin-top:46px;
      margin-bottom:31px;
      img{
        width:53px;
        height:36px;
        margin-bottom:13px;
      }
    }
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright{
      .domain{
        color:#FF6600;
      }
    }
  }
</style>