<template>
  <el-input 
    :placeholder="placeholder" 
    v-model="value"
    @input="input"
    :maxlength='maxlength'
    :disabled='disabled'
    :type='type'
    >
  </el-input>
</template>

<script>
export default {
    name: 'generic-input',

    props: {

      placeholder: {
        type: String,
        default: ''
      },

      maxlength: {
        type: String,
        default: '30'
      },

      disabled: {
        type: Boolean,
        default: false
      },    
      
      type: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        value: ''
      }
    },

    methods: {
      input(){
        this.$emit('input', this.value)
      }
    }
}
</script>