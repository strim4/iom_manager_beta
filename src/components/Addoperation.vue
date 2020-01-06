<!-- This file contains the structure for the add operation site-->
<template slot="items" slot-scope="props">
    <v-container>
      <template>
        <div>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </div>
      </template>
        <v-col>
            <!-- Form to add a new operation -->
            <v-form v-model="valid" ref="form" lazy-validation>
                <h1>Neue Operation hinzufügen</h1>
                <v-text-field label="Operation" :rules="rules" v-model="operation" required></v-text-field>
                <v-btn @click="submit" color="success" :disabled="!valid">
                    Hinzufügen
                </v-btn>
                <v-btn @click="clear">Zurücksetzten</v-btn>
            </v-form>
        </v-col>
        </br>
        </br>

    <!-- Datatable with the stored operations -->
        <v-card>
                <v-card-title>
                    Erfasste Operationen
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="operations"
      item-key="name"
      :search="search"
      class="elevation-1"

    >
      <template v-slot:item.action="{ item }">
            <v-icon
          @click="deleteOperation(item._id, item)"
        >
          delete
        </v-icon>
      </template>
    </v-data-table>
      </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
  //initialize variables
  data: () => ({
    valid: true,
    operation: '',
    selected: [],
    rules: [
      v => !!v || 'Bitte geben Sie eine Operation ein',
    ],
    fixed: true,
    operations: [],
    search: '',
    headers: [{
      text: 'Operation',
      align: 'left',
      value: 'operation',
    },
    { text: 'Löschen', value: 'action', sortable: false },

    ],
    breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Einstellungen',
          disabled: false,
          href: 'settings',
        },
        {
          text: 'Operation hinzufügen',
          disabled: true,
          href: 'addoperation',
        },
      ],


  }),
  // fetch all operations on pageload
  mounted() {
    this.fetchOperations();
  },

  methods: {
    // submit method to send the new operation to the backend

    submit() {
      if (this.$refs.form.validate()) {
        const token = window.localStorage.getItem('auth');
        return axios({
          method: 'post',
          data: {
            operation: this.operation,
          },
          url: '/operations',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Die Operation wurde gespeichert!',
              'success',
            );
            this.fetchOperations();

            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Fehlgeschlagen!',
              'Die Operation konnte nicht gespeichert werden!',
              'error',
            );
          });
      }
      return true;
    },

    // Reset function
    clear() {
      this.$refs.form.reset();
    },

    // fetches all operations from the database
    async fetchOperations() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          operation: this.operation,
        },
        url: '/operations',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },

      })
        .then((response) => {
          this.operations = response.data.operations;
        })
        .catch(() => {});
    },
    
    // delete a operation from the database
    async  deleteOperation(id, item) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `/operations/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.operations.indexOf(item);
          this.operations.splice(index, 1);
        })
        .catch(() => {});
    },

  },
};

</script>
