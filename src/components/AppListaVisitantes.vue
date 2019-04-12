<template>
  <div id="divVisitantes" class="row">
    <div class="col-md-4">
      <div class="divColVisitantes" id="divCadastro">
        <h2>{{ titulo }}</h2>
        <form>
          <div class="row">
            <div class="form-group col-md-7">
              <label for="nome">Nome:</label>
              <input
                type="text"
                class="form-control"
                id="nome"
                v-model="visitante.nome"
                v-mask="''"
              >
            </div>
            <div class="form-group col-md-5">
              <label for="contato">Contato:</label>
              <input
                type="text"
                class="form-control"
                id="contato"
                v-model="visitante.contato"
                v-mask="'(##) #####-####'"
              >
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md-8">
              <label for="cpf">CPF:</label>
              <input
                type="text"
                class="form-control"
                id="cpf"
                v-model="visitante.cpf"
                v-mask="'###.###.###-##'"
                :disabled="titulo == 'Editar'"
              >
            </div>
            <div class="form-group col-md-4">
              <label for="entrada">Entrada:</label>
              <input
                type="time"
                step="2"
                class="form-control"
                id="entrada"
                v-model="visitante.hora"
              >
            </div>
          </div>
          <button class="btn btn-info" type="reset" @click="resetar" style="margin-right: 0.5%">
            <i class="glyphicon glyphicon-refresh"></i> Limpar
          </button>
          <button class="btn btn-success" type="button" @click="salvar">
            <i class="glyphicon glyphicon-floppy-disk"></i> Salvar
          </button>
        </form>
      </div>
      <div v-if="erros.length" class="alert alert-danger">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="(erro,indice) in erros" :key="indice">{{ erro }}</li>
        </ul>
      </div>
    </div>
    <div class="col-md-8">
      <div class="divColVisitantes" id="divTabelaVisitantes">
        <div class="text-center">
          <h2>Visitantes</h2>
        </div>
        <div v-if="exibir" class="alert" :class="classCSS">
          <div class="row text-center">{{mensagem}}</div>
        </div>
        <div v-if="visitantes.length">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Contato</th>
                <td>Entrada</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(valor,indice) in listaOrdenada" :key="indice">
                <td>{{ valor.nome }}</td>
                <td>{{ valor.cpf }}</td>
                <td>{{ valor.contato }}</td>
                <td>{{ valor.hora }}</td>
                <td>
                  <button class="btn btn-primary" @click="editar(indice)">
                    <i class="glyphicon glyphicon-pencil"></i>
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger" @click="remover(indice)">
                    <i class="glyphicon glyphicon-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="alert alert-warning">
          <div class="row text-center">Nenhum resultado encontrado</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "./../config/config";

export default {
  data() {
    return {
      titulo: "Cadastro",
      visitante: {
        nome: "",
        contato: "",
        cpf: "",
        hora: ""
      },
      visitantes: [],
      erros: [],
      selecionado: "",
      exibir: false,
      mensagem: "",
      classCSS: ""
    };
  },
  created() {
    axios.get(`${config.apiURL}/visitantes`).then(response => {
      this.visitantes = response.data;
    });
  },
  computed: {
    listaOrdenada() {
      return this.visitantes.sort((v1, v2) => {
        return v1.nome < v2.nome ? -1 : v1.nome > v2.nome ? 1 : 0;
      });
    }
  },
  methods: {
    resetar() {
      this.titulo = "Cadastro";
      this.visitante = {
            nome: "",
            contato: "",
            cpf: "",
            hora: ""
      };
      this.erros = [];
    },
    validarLetras(texto) {
      let regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
      return regex.test(texto);
    },
    buscarCPF(umVetor, item) {
      let prim = 0;
      let ult = umVetor.length - 1;
      let achou = false;
      while (prim <= ult && !achou) {
        let meioLista = Math.ceil((prim + ult) / 2);
        if (umVetor[meioLista] == item) {
          achou = true;
        } else {
          if (item < umVetor[meioLista]) {
            ult = meioLista - 1;
          } else {
            prim = meioLista + 1;
          }
        }
      }

      return achou;
    },
    ordenarCPF(array) {
      return array.sort((v1, v2) => {
        return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
      });
    },
    validar() {
      this.erros = [];

      if (!this.visitante.nome) {
        this.erros.push("O nome é obrigatório.");
      }
      if (
        !this.validarLetras(this.visitante.nome) &&
        this.visitante.nome.length > 0
      ) {
        this.erros.push("É aceitável apenas letras no campo nome.");
      }

      if (this.visitante.contato.length <15) {
        this.erros.push("Contato incompleto.");
      }

      if (this.visitante.cpf.length <14) {
        this.erros.push("CPF incompleto.");
      }

      let arrayCPF = [];

      this.visitantes.forEach(element => {
        arrayCPF.push(element.cpf);
      });

      if (this.titulo == "Cadastro" && this.buscarCPF(this.ordenarCPF(arrayCPF), this.visitante.cpf)
      ) {
        this.erros.push("CPF inválido.");
      }

      if (!this.visitante.hora) {
        this.erros.push("O horário de entrada é obrigatório.");
      }

      return (this.erros.length > 0) ? false : true;
    },
    exibirMensagem() {
      this.exibir = true;
      setTimeout(() => {
        this.exibir = false;
      }, 3000);
    },
    listar() {
      axios.get(`${config.apiURL}/visitantes`).then(response => {
        this.visitantes = response.data;
      });
    },
    salvar(event) {
      if (this.validar()) {
        if (this.titulo == "Cadastro") {
          axios
            .post(`${config.apiURL}/visitantes/`, this.visitante)
            .then(response => {
              this.listar();
              if (response.status == 201) {
                this.classCSS = "alert-success";
                this.mensagem = "Cadastrado com sucesso!";
              } else {
                this.classCSS = "alert-danger";
                this.mensagem = "Erro ao cadastrar!";
              }
              this.exibirMensagem();
            });
        } else {
          axios
            .put(
              `${config.apiURL}/visitantes/${this.visitante.id}/`,
              this.visitante
            )
            .then(response => {
              this.listar();
              if (response.status == 200) {
                this.classCSS = "alert-success";
                this.mensagem = "Alterado com sucesso!";
              } else {
                this.classCSS = "alert-danger";
                this.mensagem = "Erro ao alterar!";
              }
              this.exibirMensagem();
            });
        }

        this.resetar();
      }
    },
    editar(id) {
      this.resetar();
      this.titulo = "Editar";
      this.visitante.nome = this.visitantes[id].nome;
      this.visitante.contato = this.visitantes[id].contato;
      this.visitante.cpf = this.visitantes[id].cpf;
      this.visitante.hora = this.visitantes[id].hora;
      this.visitante.id = this.visitantes[id].id;
      this.selecionado = id;
    },
    remover(id) {
      
      this.visitante = {
            nome: "",
            contato: "",
            cpf: "",
            hora: ""
      };
    
      const confirmar = window.confirm(
        `Desejar remover o visitante "${this.visitantes[id].nome}"?`
      );

      if (confirmar) {
        axios
          .delete(`${config.apiURL}/visitantes/${this.visitantes[id].id}`)
          .then(response => {
            this.titulo = "Cadastro";
            this.erros = [];
            this.listar();
            if (response.status == 200) {
              this.classCSS = "alert-success";
              this.mensagem = "Deletado com sucesso!";
            } else {
              this.classCSS = "alert-danger";
              this.mensagem = "Erro ao deletar!";
            }
            this.exibirMensagem();
          });
      }
    }
  }
};
</script>

<style>
#divVisitantes {
  margin: 0% 1% 1%;
  background-color: #ffffff;
  padding: 1%;
  border-radius: 5px;
}

.divColVisitantes {
  margin: 0.5%;
}

#divCadastro {
  border: 1px solid gray;
  padding: 2%;
  border-radius: 5px;
}

#divTabelaVisitantes {
  border: 1px solid gray;
  padding: 1%;
  border-radius: 5px;
}
</style>
