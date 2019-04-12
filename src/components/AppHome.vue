<template>
    <div>
        <div class="jumbotron div-home" :style="{'margin-top':marginTopHome}">
            <h1>{{h1}}</h1>
            <p>{{p}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:['marginTopHome'],
    data(){
        return{
            h1:'Bem vindo ao sistema de visitantes!',
            p: 'Qualquer dúvida, entre em contato com a equipe de TI através do e-mail ti@mail.com.',
        }
    }
}
</script>

<style>
    .jumbotron{
        margin: 0% 1% 1%;
        background-color: #ffffff;
        padding: 1%;
    }
</style>
