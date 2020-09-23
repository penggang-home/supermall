<template>
  <div>
    <scroll class="content">
      <ul>
        <li>121</li>
        <li>122</li>
        <li>123</li>
        <li>124</li>
        <li>125</li>
        <li>126</li>
        <li>127</li>
        <li>128</li>
        <li>129</li>
        <li>1210</li>
        <li>1211</li>
        <li>1212</li>
        <li>1213</li>
        <li>1214</li>
        <li>1215</li>
        <li>1216</li>
        <li>1217</li>
        <li>1218</li>
        <li>1219</li>
        <li>1220</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"
export default {
  name: 'Profile',
  components:{
    Scroll
  }
}
</script>

<style scoped> 
.content{
  height: 300px;
  background-color: green;
  overflow: hidden;
}
</style>