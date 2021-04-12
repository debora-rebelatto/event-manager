<template>
  <div>
    <el-button 
        :type="secundary" 
        class="buttom-form"> 
        <slot/>
    </el-button>
  </div>
</template>

<script>
export default {
    name: 'generic-button',

    props: {
        id: {
            type: String,
            default: ''
        },

        disabled: {
            type: Boolean,
            default: false
        },

        value: {
            type: String,
            default: ''
        }
    },

    methods: {
        click($event){
            this.$emit('click', $event.target.value)
        }
    }

}
</script>

<style>

</style>