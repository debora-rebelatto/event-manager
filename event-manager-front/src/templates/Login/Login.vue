<template>
  <div class="container">
    
    <div class="form">
        <el-input placeholder="Digite seu nome" v-model="input"  class="input-form"></el-input>
        <el-input placeholder="Digite seu Email" v-model="input"  class="input-form"></el-input>
        <el-input placeholder="Digite sua Senha" v-model="input"  class="input-form"></el-input>
       
        <el-button type="primary" class="buttom-form" style="color: #6DF1A4">Cadastrar</el-button>
        <el-button type="secundary" class="buttom-form" >Logar</el-button>

    </div>
  </div>
</template>

<script>
//import GenericButton from '@/components/atoms/GenericButton'

export default {
    
}
</script>

<style>

.container{
    background-image: url("../../assets/images/back.png");
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 90%;
    background-position-x: -350%;
    background-position-y: 60%;
}

.form{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-flow: row wrap;
    justify-content: center;
    background-color: #5769F4;
    width: 40%;
    height: 100%;
}

.input-form{
    display: flex;    
    width: 80%;
}

.buttom-form{
    width: 40%;
    height: 65px;
}


</style>