<template>
  <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <sideBar></sideBar>
  </el-aside>
  
  <el-container>
    <h2 class="title-page">
      Eventos Rolando na universidade
    </h2>
    <cardEvent></cardEvent>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>
    
    <el-main>
      Aqui vai um texto
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import GenericButton from '@/components/atoms/GenericButton'
import sideBar from '@/components/molecules/sideBar'
import cardEvent from '@/components/molecules/cardEvent'

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
}

.title-page {
  color: #6DF1A4;
  padding-left: 10px;
}


</style>