<template>
    <nav class="navbar navbar-fixed-top navbar-inverse" ref="nav">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span> 
                </button>
                <span class="navbar-brand" style="color:#ffffff;">{{ empresa }}</span>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li v-for="item in nav" :key="item.id" :class="{ active: item.ativo}">
                        <a :href="item.href" @click="ativar(item,ativo)" :style="[ item.ativo ? { 'background-color' : bgColorActive } : { 'background-color' : '' } ]">
                            {{item.nome}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    data () {
    return {
        empresa: 'EMPRESA',
        bgColorActive: '#213856',
        props:['componentSelecionado'],
        nav:
            [
                {
                    id: 'home',
                    nome: 'Home',
                    ativo: true,
                    component: "AppBody"
                },
                {
                    id: 'visitantes',
                    nome: 'Visitantes',
                    ativo: false,
                    component: "AppVisitantes"
                }
            ],
        heightNav: ''
    }
    },
    mounted () {
        this.lerAltura()
    },
    methods: {
        ativar: function (item, itemAtivo) {
            if (item.id !== itemAtivo[0].id) {
                itemAtivo[0].ativo = false
                item.ativo = true
            }

            this.$emit('componentSelecionado',item.component)

        },
        lerAltura: function () {
            this.heightNav = this.$refs.nav.clientHeight
        },
        setarMargin: function () {
            this.$emit('marginTopNav',this.heightNav + 15 + 'px')
        }
    },
    computed: {
        ativo: function () {
            return this.nav.filter(function (item) {
                return item.ativo
            })
        }
    },
    watch: {
        heightNav: function () {
            this.setarMargin()
        }
    }
}
</script>

<style>
    .navbar-inverse{
        background-color: #396092;
    }

    .navbar-nav > li:hover{
        background-color: #213856;
        cursor: pointer;
    }

    .navbar-toggle:hover{
        background-color: #213856;
    }
</style>
