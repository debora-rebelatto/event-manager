<template>
  <div class="container">
      <div class="sidebar">
        <sideBar />
      </div>
  </div>
</template>

<script>
import GenericButton from '@/components/atoms/GenericButton'
import sideBar from '@/components/molecules/sideBar'

export default {
    components: {
      "generic-button": GenericButton,
      "sideBar":  sideBar
    }

}
</script>

<style lang="css" scoped>

</style>>
.container {
  display: flex;

}

.sidebar{}

</style>