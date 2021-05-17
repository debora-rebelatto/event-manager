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
        <div class="two-input">
          <el-input
            placeholder="Nome do evento"
            prefix-icon="el-icon-circle-plus-outline"
            v-model="name"
            class="parse-input"
            style="padding-right: 10px;">
          </el-input>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="a"
            start-placeholder="Início"
            class="parse-input"
            end-placeholder="Término">
          </el-date-picker>
        </div>
       <el-input
          placeholder="Instituição de ensino"
          prefix-icon="el-icon-school"
          v-model="school"
          style="margin-top: 10px">
        </el-input>
        <el-input
          placeholder="Informações adicionais"
          prefix-icon="el-icon-circle-plus-outline"
          v-model="addictional"
          style="margin-top: 10px">
        </el-input>
        <el-input
          placeholder="Descrição do evento"
          v-model="describle"
          style="margin-top: 10px; padding-bottom: 10px"
          type="textarea">
        </el-input>
        <div class="two-input">
          <el-button @click="saveEvent" type="success" class="parse-input"> Salvar </el-button>
          <el-button @click="dialogTableVisible = false" type="danger" class="parse-input"> Cancelar </el-button>
        </div>

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

.two-input {
  display: flex;
  justify-content: space-between;
}

.parse-input {
  width: -webkit-fill-available;
}

</style>