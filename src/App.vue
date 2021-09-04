<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  width:100%;
  max-width: 480px;
  height:100%;
  padding:10px;
  font-family: 'IM_Hyemin-Bold';
}
@font-face{
    font-family: 'IM_Hyemin-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Bold.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
}
@font-face {
     font-family: 'S-CoreDream-9Black';
     src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-9Black.woff') format('woff');
     font-weight: normal;
     font-style: normal;
}
*:focus{outline:none;}
*{-webkit-tap-highlight-color:rgba(0,0,0,0);}
</style>
