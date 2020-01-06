<!-- This file contains the structure for the add assistant site-->
<template slot="items" slot-scope="props">
    <v-container>
      <template>
        <div>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </div>
      </template>
        <v-col>
            <!-- Form to add a new assistant -->
            <v-form v-model="valid" ref="form" lazy-validation>
                <h1>Neuen Assistenten hinzufügen</h1>
                <v-text-field label="Assistent" :rules="rules" v-model="assistant" required></v-text-field>
                <v-btn @click="submit" color="success" :disabled="!valid">
                    Hinzufügen
                </v-btn>
                <v-btn @click="clear">Zurücksetzten</v-btn>
            </v-form>
        </v-col>
        </br>
        </br>

    <!-- Datatable with the stored assistants -->
        <v-card>
                <v-card-title>
                    Erfasste Assistenten
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="assistants"
      item-key="name"
      :search="search"
      class="elevation-1"

    >
      <template v-slot:item.action="{ item }">
            <v-icon
          @click="deleteAssistant(item._id, item)"
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
    assistant: '',
    selected: [],
    rules: [
      v => !!v || 'Bitte geben Sie eine Assistent ein',
    ],
    fixed: true,
    assistants: [],
    search: '',
    headers: [{
      text: 'Assistent',
      align: 'left',
      value: 'assistant',
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
          text: 'Assistent hinzufügen',
          disabled: true,
          href: 'addassistant',
        },
      ],


  }),
  // fetch all assistants on pageload
  mounted() {
    this.fetchAssistants();
  },
  methods: {
    // submit method to send the new assistant to the backend

    submit() {
      if (this.$refs.form.validate()) {
        const token = window.localStorage.getItem('auth');
        return axios({
          method: 'post',
          data: {
            assistant: this.assistant,
          },
          url: '/assistants',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Assistent wurde gespeichert!',
              'success',
            );
            this.fetchAssistants();

            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Fehlgeschlagen!',
              'Der Assistent konnte nicht gespeichert werden!',
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

    // fetches all assistants from the database
    async fetchAssistants() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          assistant: this.assistant,
        },
        url: '/assistants',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },

      })
        .then((response) => {
          this.assistants = response.data.assistants;
        })
        .catch(() => {});
    },
    
    // delete a assistant from the database
    async  deleteAssistant(id, item) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `/assistants/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.assistants.indexOf(item);
          this.assistants.splice(index, 1);
        })
        .catch(() => {});
    },

  },
};

</script>
