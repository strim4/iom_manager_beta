<!-- This file contains the structure for the add surgeon site-->
<template slot="items" slot-scope="props">
    <v-container>
      <template>
        <div>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </div>
      </template>
        <v-col>
            <!-- Form to add a new surgeon -->
            <v-form v-model="valid" ref="form" lazy-validation>
                <h1>Neuen Operateur hinzufügen</h1>
                <v-text-field label="Operateur" :rules="rules" v-model="surgeon" 
                required></v-text-field>
                <v-btn @click="submit" color="success" :disabled="!valid">
                    Hinzufügen
                </v-btn>
                <v-btn @click="clear">Zurücksetzten</v-btn>
            </v-form>
        </v-col>
        </br>
        </br>

    <!-- Datatable with the stored surgeons -->
        <v-card>
                <v-card-title>
                    Erfasste Operateure
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="surgeons"
      item-key="name"
      :search="search"
      class="elevation-1"

    >
      <template v-slot:item.action="{ item }">
            <v-icon
          @click="deleteSurgeon(item._id, item)"
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
    surgeon: '',
    selected: [],
    rules: [
      v => !!v || 'Bitte geben Sie einen Operateur ein',
    ],
    fixed: true,
    surgeons: [],
    search: '',
    headers: [{
      text: 'Operateur',
      align: 'left',
      value: 'surgeon',
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
          text: 'Operateur hinzufügen',
          disabled: true,
          href: 'addsurgeon',
        },
      ],
  }),

  // fetch all surgeons on pageload
  mounted() {
    this.fetchSurgeons();
  },

  methods: {
    // submit method to send the new surgeon to the backend

    submit() {
      if (this.$refs.form.validate()) {
        const token = window.localStorage.getItem('auth');
        return axios({
          method: 'post',
          data: {
            surgeon: this.surgeon,
          },
          url: '/surgeons',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Operateur wurde gespeichert!',
              'success',
            );
            this.fetchSurgeons();

            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Fehlgeschlagen!',
              'Der Operateur konnte nicht gespeichert werden!',
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

    // fetches all surgeons from the database
    async fetchSurgeons() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          surgeon: this.surgeon,
        },
        url: '/surgeons',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },

      })
        .then((response) => {
          this.surgeons = response.data.surgeons;
        })
        .catch(() => {});
    },

    // delete a surgeon from the database
    async  deleteSurgeon(id, item) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `/surgeons/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.surgeons.indexOf(item);
          this.surgeons.splice(index, 1);
        })
        .catch(() => {});
    },

  },
};

</script>
