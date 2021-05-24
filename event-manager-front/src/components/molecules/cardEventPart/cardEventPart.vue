<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><b>Semana Acadêmica</b></span>
      </div>
      <div class="text item card-second">
        <h5>Cidade: Chapeco UF: SC</h5>
        <h5>Instituição: UFFS</h5>
        <h5>Valor: 100</h5>
        <el-button class="event-button" @click="certificado">
          Gerar Certificado
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
  name: 'card-event-part',

    data () {
        return {
            BASE_URL: 'http://localhost:3000',
            EVENT_URL: '/event',
            auth: headers,
            objEvent: []
        }
    },

    methods: {
        certificado () {
            axios.get(`${this.BASE_URL}${this.EVENT_URL}/pdf/609ac1a91ed9b431603045ae`, {headers: this.auth})
            .then(res => {
                Promise.resolve(res.data)
                alert('Certificado gerado, acesse na nova aba!')
                window.open('', '_blank');
            })
            .catch(err => {
                Promise.reject(err)
                alert('Não foi possivel obter certificado')
            })
        }
    }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 97%;
  height: 100%;
  max-height: 280px;
  background-color: #6df1a4;
  flex-wrap: wrap;
  margin: 1%;
  border-radius: 10px;
  overflow: auto;
}
.box-card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 150px;
  height: 240px;
  margin: 5px 10px 10px 10px;
  padding: 5px 40px;
}

.event-button {
  width: 200px;
  background-color: #6df1a4;
  margin: 5px;
  margin-top: 30px;
}

.card-second {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
