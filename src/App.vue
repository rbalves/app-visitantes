<template>
    <div>
        <AppNav
        @marginTopNav="marginTopApp = $event"
        @componentSelecionado="componentSelecionado = $event"
        />
    <keep-alive>
      <component 
      :is="componentSelecionado"
      v-bind="propsAtuais">
      </component>
    </keep-alive>
    </div>
</template>

<script>

import AppNav from './components/AppNav'
import AppBody from './components/AppBody'
import AppVisitantes from './components/AppVisitantes'

export default {
  components: {
    AppNav,
    AppBody,
    AppVisitantes
  },
  data(){
      return{
          marginTopApp: undefined,
          componentSelecionado: 'AppBody'
      }
  },
  computed:{
    propsAtuais(){
      var retorno;
      switch(this.componentSelecionado){
        
        case 'AppBody':
          retorno = {marginTopBody : this.marginTopApp}
          break;
        
        case 'AppVisitantes':
          retorno = {marginTopVisitantes : this.marginTopApp}
          break;
      }

      return retorno
    }
  }
}
</script>
