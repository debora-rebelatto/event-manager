<template>
  <div class="container">
    <sideBar></sideBar>
    <div>
      <h2 class="title-page">
        Eventos Rolando na universidade
      </h2>     
      <cardEvent class="card"></cardEvent> 
    </div>
  </div>
</template>

<script>
import GenericButton from '@/components/atoms/GenericButton'
import sideBar from '@/components/molecules/sideBar'
import cardEvent from '@/components/molecules/cardEvent/index.js'

export default {
    components: {
      "generic-button": GenericButton,
      "sideBar":  sideBar,
      "cardEvent": cardEvent
    }

}
</script>

<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: row;
}

.title-page {
  color: #6DF1A4;
  padding-left: 10px;
}

</style>