<template>
  <el-input 
    :placeholder="placeholder" 
    v-model="input">
  </el-input>
</template>

<script>
export default {
    name: 'generic-input',

    props: {

      placeholder: {
        type: String,
        default: ''
      }
      
    }
}
</script>

<style>

</style>