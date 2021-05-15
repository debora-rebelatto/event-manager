<template>
  <div class="container">

    <div class="form">
        <div >
            <h1 class="title">
                Bem vindo!
            </h1>
            <h2 class="subtitle">
                Event maneger
            </h2>
        </div>
        <generic-input 
            placeholder="Digite seu nome"  
            v-model="formLogin.user" 
            class="input-form"
        />

        <generic-input 
            placeholder="Digite seu Email" 
            v-model="formLogin.email" 
            class="input-form"
        />

        <generic-input 
            placeholder="Digite sua Senha" 
            v-model="formLogin.senha" 
            class="input-form"
        />

        <div class="buttom-form">
            <el-button 
                type="primary"
                class="button create"
                size="medium"
                @click.native="logar()">
                Criar conta
            </el-button>
        
            <el-button
                type="secundary" 
                class="button"
                size="medium"
                @click.native="logar()">
                Logar
            </el-button>
        </div>

    </div>
  </div>
</template>

<script>
import GenericButton from '@/components/atoms/GenericButton/GenericButton.vue'
import GenericInput from '@/components/atoms/GenericInput/GenericInput.vue'


export default {
    components: {
        'generic-button': GenericButton,
        'generic-input': GenericInput

    },

    data(){

        return{
            formLogin: {
                user: '',
                email: '',
                senha: ''
            }
        }
    },

    methods: {
        logar(){
            let loginMessage = this.$message.loading({
                message: 'Carregando',
                hasMask: true,
                duration: '2000',
                position: "center"
            });
            
            setTimeout(() => {
                loginMessage.close();
                this.$router.push("/dashboard");  
            }, 2000)
        }
    }
}
</script>

<style lang="css" scoped>

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
    width: 70%;
}

.buttom-form{
    width: 70%;
    display: flex;
    justify-content: space-between;
}

.button {
    border-radius: 10px;
    width: 50%;
}

.create {
    background: #6DF1A4; 
    color: black;
}

.title {
    color:#6DF1A4;
    font-size: 54px;
    font-weight: 600;
}

.subtitle {
    color: #6DF1A4;
    text-align: center;
}

</style>