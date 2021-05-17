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

      <el-dialog title="Cadastrar Evento" :visible.sync="dialogTableVisible" class="dialog">
        <div>
          <generic-input 
            placeholder='Digite o nome do evento' 
            class="input-event"
            v-model='formEvent.title'  
          />        

          <el-date-picker
            v-model="startDate"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date">
          </el-date-picker>  
          
        <!-- <generic-date  class="input-event"/> -->
        
        <generic-input 
          type='text'
          placeholder='Digite nome da instituição' 
          class="input-event"
          v-model='formEvent.location'  
        />
        
        <generic-input
          type='text'
          placeholder='Cidade' 
          class="input-event"
          v-model='formEvent.city'  
        />

        <generic-input
          type='text'
          maxlength='2' 
          placeholder='UF' 
          class="input-event"
          v-model='formEvent.state'  
        />

        <generic-input 
          type='number'
          placeholder='Preço' 
          class="input-event"
          v-model='formEvent.price'  
        />
        
        <generic-input 
          type='number'
          placeholder='Quantidade de ingressos' 
          class="input-event"
          v-model='formEvent.quantityTickets'  
        />

         <generic-input 
          type='textarea'
          placeholder='Descrição' 
          class="input-event"
          v-model='formEvent.desctiption'  
        />
        
        </div>

          <el-button type='primary' @click="saveEvent">Salvar</el-button>
          <el-button @click="exitDialog">Cancelar</el-button>
      </el-dialog>
  </div>

</template>

<script>
import GenericInput from '@/components/atoms/GenericInput/GenericInput.vue'
import GenericDate from '@/components/atoms/GenericDate/GenericDate.vue'
import { headers } from '@/services/https.js'
import axios from 'axios'
export default {
  name: "sidebar",

  components: {
    'generic-input': GenericInput,
    'generic-date': GenericDate
  },

  data () {
    return{
      dialogTableVisible: false,
      formEvent: {
        title: '',
        city: '',
        finalDate:'',
        initialDate: '',
        location: '',
        price: '',
        quantityTickets: '',
        state: '',
        desctiption: '',
        isfree: true
      },
      startDate: '',
      auth: headers,
      BASE_URL: 'http://localhost:3000',
      EVENT_URL: '/event',
      PARTICIPANT_URL: '/user/organizerPermission'
    }
  },

  methods: {
    event() {
      this.formEvent.isfree = this.formEvent.price > 0 ? false : true
      this.formEvent.initialDate = new Date(this.startDate[0]).toISOString()
      this.formEvent.finalDate = new Date(this.startDate[1]).toISOString()
    },

    saveEvent() {
      this.event()

      //pra cadastrar evento e preciso que o usario tenha permissão to dandpo ela aqui porem ta dando
      //n autorizado na api
     
      axios.post(`${this.BASE_URL}${this.PARTICIPANT_URL}/${localStorage.getItem('user')}`, {
        headers: this.auth
      }).then(res =>{
        console.log("user", res)
      })

      console.log(this.formEvent)
      
      
      axios.post(`${this.BASE_URL}${this.EVENT_URL}`, {headers: this.auth}, this.formEvent)
      .then(res => {
        Promise.resolve(res)
        console.log(res)
      })
      .catch(err => {
        Promise.reject(err)
        alert('Não foi possivel cadastrar evento')
      })
    },

    exitDialog() {
      this.dialogTableVisible = false
    }
  }
};
</script>

<style lang="css" scoped>

.sidebar {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  text-align: center;
  align-items: center;
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

.dialog{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.input-event{
  padding: 5px;
}

</style>