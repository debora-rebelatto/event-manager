<template>
  <el-row class="tac">
    <el-col :span="5">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo sidebar"
        background-color="#6DF1A4"
        text-color="#000000"
        active-text-color="#5769F4"
      >
        <el-menu-item index="1">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            style="margin-left: 40%"
          ></el-avatar>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-school"></i>
          <span>Universidade Federal da Fronteira Sul</span>
        </el-menu-item>
         <el-menu-item index="2">
          <i class="el-icon-time"> </i>
          <span>Semestre</span>
        </el-menu-item>
        <el-menu-item>
          <calendar title-position="left" />
        </el-menu-item>
        <el-menu-item index="4">
          <el-button type="primary" @click="dialogTableVisible = true">Cadastrar Evento</el-button>
        </el-menu-item>
      </el-menu>
    </el-col>

    <el-dialog title="Cadastrar Evento" :visible.sync="dialogTableVisible">
        <generic-input placeholder='Digite o nome do evento' style="width: 400px; height: 50px"/>
        <generic-date style="height: 50px"/>
        <generic-input placeholder='Digite nome da instituição' style="width: 400px; height: 50px"/>
        <generic-input placeholder='Descrição do evento' style="width: 400px; height: 50px"/>
    </el-dialog>
  </el-row>
</template>

<script>
import GenericInput from '@/components/atoms/GenericInput/GenericInput.vue'
import GenericDate from '@/components/atoms/GenericDate/GenericDate.vue'

export default {
    name: "sidebar",

    components: {
        'generic-input': GenericInput,
        'generic-date': GenericDate
    },

    data () {
        return{
          dialogTableVisible: false
        }
    }
};
</script>

<style lang="css" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 578px;
  text-align: center;
  word-break: break-work;
}
</style>