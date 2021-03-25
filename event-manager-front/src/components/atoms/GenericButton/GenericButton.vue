<template>
  <div>
        <b-button
            :id='id'
            :value='value'
            :disabled='disabled'
            @click='click($event)'
        >
        <slot/>
        </b-button>

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