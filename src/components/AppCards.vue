<template>
    <div class="row" id="divAppCards">
        <div class="row" style="margin-left:0.01%"><h2>Totais de visitantes</h2></div>
        <div class="row">
            <AppCard 
                v-for = "total in totais"
                :key = "total.id"
                v-bind="total"
            />
        </div>
    </div>
</template>

<script>

import AppCard from './AppCard'

export default {
    components:{
        AppCard
    },
    data(){
        return{
            totais:[
                {
                    id:1,
                    periodo:"Ano",
                    quantidade: 256
                },
                {
                    id:2,
                    periodo:"Mês",
                    quantidade: 35
                },
                {
                    id:3,
                    periodo:"Semana",
                    quantidade: 10
                },
                {
                    id:4,
                    periodo:"Dia",
                    quantidade: 3
                },
            ]
        }
    }
}
</script>

<style>
    #divAppCards{
        background-color: #ffffff;
        margin: 0% 1% 1%;
        padding: 1%;
    }
</style>

