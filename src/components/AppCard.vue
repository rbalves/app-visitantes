<template>
    <div class="col-md-3">
        <div class="card">
            <div class="card-header"><p style="font-size:35px"> {{ periodo }}</p></div>
            <div class="card-body"><p style="font-size:50px"> {{ quantidade }}</p></div> 
        </div>
    </div>
</template>

<script>

export default {
    inheriAttrs: false,
    props:['periodo','quantidade']
}
</script>

<style>
    .card{
        padding: 1%;
        background-color: #396092; 
        color: #ffffff;
        margin-bottom: 1%;
    }

    .card > div{
        text-align: center
    }
</style>