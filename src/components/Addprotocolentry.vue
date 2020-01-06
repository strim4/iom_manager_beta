<!-- This file contains the structure for the add protocolentries site-->
<template slot="items" slot-scope="props">
    <v-container>
      <template>
        <div>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </div>
      </template>
        <v-col>
            <!-- Form to add a new device -->
            <v-form v-model="valid" ref="form" lazy-validation>
                <h1>Neue Protokolleinträge hinzufügen</h1>
                <v-select label="Event" v-model="event" :items="selectoptions" item-text="names" ></v-select>
                <v-text-field label="Event" :rules="rules" v-model="option" required></v-text-field>
                <v-btn @click="submit" color="success" :disabled="!valid">
                    Hinzufügen
                </v-btn>
                <v-btn @click="clear">Zurücksetzten</v-btn>
            </v-form>
        </v-col>
        </br>
        </br>

    <!-- Datatable with the stored protocolentries -->
          <v-card>
                <v-card-title>
                    Erfasste Einträge
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="categories"
     
      :search="search"
      class="elevation-1"

    >
          <template v-slot:item.action="{ item }">
            <v-icon

          @click="deleteCategory(item._id, item)"
        >
          delete
        </v-icon>
      </template>
    </v-data-table>
      </v-card>
      </br></br></br></br>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
//initialize variables
  data: () => ({
    event: '',
    option:'',
    IomCategories:[],
    valid: true,
    selectoptions: [ 'Anästhesie','IOM AEP', 'IOM D-Welle',  'IOM EEG','IOM EMG',  'IOM Mapping', 'IOM MEP', 'IOM MEP/Grid',
     'IOM Reflexe', 'IOM SSEP', 'IOM MEP', 'IOM VEP', 'Medikamente', 'OP-Verlauf', 
     'OP Blutdruck/Herzfrequenz', 'OP Dura', 'OP Gefässe', 'OP Komplikationen', 'OP Liquor',
      'OP Zugabee', 'OP Rücken', 'OP Tumor/Zyste', 'OP Vorbereitung', 'Technik','Weitere'],
    selected: [],
    categories: [],
    rules: [
    v => !!v || 'Bitte geben Sie eine IOM-Gerät ein',
    ],
    fixed: true,
    search: '',
    operations: [],
    search: '',
    headers: [{
      text: 'Event',
      align: 'left',
      value: 'options',
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
          text: 'Protokolleintrag hinzufügen',
          disabled: true,
          href: 'addprotocolentry',
        },
      ],

  }),

  // fetch all devices on pageload
  mounted() {
   this.fetchCategories();
  },

  methods: {
    //sort 
    sortCategories: function(){
      let iomCat = [];
      this.IomCategories = this.categories.filter(cat => cat.name == 'IOM');
    },
  
    // submit method to send the new entry oder update a entry to/in the backend
      submit() {
      if (this.$refs.form.validate()) {
        const token = window.localStorage.getItem('auth');
        return axios({
          method: 'put',
          data: {
            name: this.event,
            options: this.option,
          },
          url: 'http://localhost:8081/categories',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Eintrag wurde gespeichert!',
              'success',
            );
             this.$refs.form.reset();
                    })
          .catch(() => {
            this.$swal(
              'Fehlgeschlagen!',
              'Der Eintrag konnte nicht gespeichert werden!',
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

    // fetches all categories from the database
    async fetchCategories() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          name: this.categories,
        },
        url: 'http://localhost:8081/categories',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },

      })
        .then((response) => {
          this.categories = response.data.categories;
        })
        .catch(() => {});
    },

    // delete a device from the database
    async  deleteCategory(id, item) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `http://localhost:8081/categories/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.categories.indexOf(item);
          this.categories.splice(index, 1);
        })
        .catch(() => {});
    },

  },

};



</script>
