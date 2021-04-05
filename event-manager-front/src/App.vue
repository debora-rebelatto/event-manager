<template>
    <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style >
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
 

  html body {
    height: 100vh;
    background-color: #fcfcfc;
  }

  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    animation: fadein 1s;
    -moz-animation: fadein 1s; /* Firefox */
    -webkit-animation: fadein 1s; /* Safari and Chrome */
    -o-animation: fadein 1s; /* Opera */
  }

  /* width */
  ::-webkit-scrollbar {
    width: 6px;
  }
  

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(63, 81, 181);
  }
</style>
