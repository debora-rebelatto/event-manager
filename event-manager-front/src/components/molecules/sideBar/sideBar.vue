<template>
  <div>
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
        </el-menu-item>
        <el-menu-item index="4">
          <el-button type="primary" @click="dialogTableVisible = true">Cadastrar Evento</el-button>
        </el-menu-item>
      </el-menu>

    <el-dialog title="Cadastrar Evento" :visible.sync="dialogTableVisible" center custom-class="dialog">
      <div class="card-event">
        <div class="input-two">
          <el-input
            placeholder="Nome do evento"
            prefix-icon="el-icon-date"
            v-model="name">
          </el-input>
          <el-input
            placeholder="Data"
            prefix-icon="el-icon-search"
            v-model="date">
          </el-input>
        </div>
       <el-input
          placeholder="Instituição de ensino"
          prefix-icon="el-icon-search"
          v-model="school">
        </el-input>
        <el-input
          placeholder="Informações adicionais"
          prefix-icon="el-icon-search"
          v-model="addictional">
        </el-input>
        <el-input
          placeholder="Descrição do evento"
          prefix-icon="el-icon-search"
          v-model="describle">
        </el-input>
        <el-button @click="saveEvent"> Salvar </el-button>
        <el-button @click="dialogTableVisible = false"> Cancelar </el-button>

      </div>
    </el-dialog>
  </div>

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
      dialogTableVisible: false,
      name: "",
      date: "",
      school: "",
      describle: "",
      addictional: ""
    }
  },

  methods: {
    saveEvent() {
      console.log("salv0")
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

.el-dialog {
  background-color: aqua;
}

.el-dialog__title {
  color: #409EFF;
  font-weight: 600;
}

.el-dialog__body {
  padding: 10px 20px;
}

.demo-input-label {
  display: inline-block;
  width: 130px;
}

.input-two {
  display: flex;
}

</style>