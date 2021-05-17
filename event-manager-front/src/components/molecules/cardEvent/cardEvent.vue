<template>
  <div class="container">
      <el-card class="box-card" v-for="item in objEvent" :key='item._id'>
        <div slot="header" class="clearfix">
          <span><b>{{item.title}}</b></span>
        </div>
        <div class="text item card-second">
          <h5>Cidade: {{item.city}} UF: {{item.state}}</h5>
          <h5>Instituição: {{item.location}}</h5>
          <h5>Valor: ${{item.quantityTickets}}</h5>
          <el-button 
            class="event-button">
              Cadastrar

          </el-button>
        </div>
      </el-card>
  </div>
</template>

<script>
import GenericButton from '../../atoms/GenericButton/GenericButton.vue'
import { headers } from '@/services/https.js'
import axios from 'axios'

export default {
  components: { GenericButton },
  name: 'card-event',
  


  data () {
    return{
      BASE_URL: 'http://localhost:3000',
      EVENT_URL: '/event',
      auth: headers,
      objEvent: []
    }

  },

  mounted () {
    this.getEvents()
    console.log(this.objEvent)
  },

  methods: {
    getEvents () {
      axios.get(`${this.BASE_URL}${this.EVENT_URL}`, {headers: this.auth})
      .then(res => {
        Promise.resolve(res.data)
        res.data.map(element => {
          this.objEvent.push(element)
        });
      })
      .catch(err => {
        Promise.reject(err)
        alert('Não foi possivel obter lista de eventos')
      })
    }
  }

}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    width: 1050px;
    height: 100%;
    max-height: 280px;
    background-color: #6DF1A4;
    flex-wrap: wrap;
    margin: 1%;
    border-radius: 10px;    
    overflow: auto;
  }
  .box-card{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 150px;
    height: 240px;
    margin: 5px 10px 10px 10px;
    padding: 5px 40px;
  }

  .event-button{
    width: 200px;
    background-color: #6DF1A4;
    margin: 5px;
    margin-top: 30px;
  }

  .card-second{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

</style>