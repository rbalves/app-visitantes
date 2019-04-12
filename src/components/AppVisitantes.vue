<template>
    <div>
        <div class="" :style="{'margin-top':marginTopVisitantes}">
            <AppListaVisitantes/>
        </div>
    </div>
</template>

<script>
import AppListaVisitantes from './AppListaVisitantes'
export default {
    props:['marginTopVisitantes'],
    data(){
        return{

        }
    },
    components: {
        AppListaVisitantes
    }
}
</script>

<style>
</style>
