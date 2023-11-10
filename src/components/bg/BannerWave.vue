<script setup></script>
<template>
  <div id="bannerWave1"></div>
  <div id="bannerWave2"></div>
</template>
<style lang="less" scoped>
//波浪
#bannerWave1,
#bannerWave2 {
  position: absolute;
  bottom: 0;
  animation: gradientBG 120s linear infinite;
  background-position: 0 100px;
}

#bannerWave1 {
  height: 84px;
  width: 200%;
  background-image: url(../../assets/test/bannerWave1.png);
  z-index: 10;
}

#bannerWave2 {
  height: 100px;
  width: 400%;
  background-image: url(../../assets/test/bannerWave2.png);
  z-index: 5;
}

@keyframes gradientBG {
  0% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
