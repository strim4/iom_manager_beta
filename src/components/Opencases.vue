<!-- This file contains the structure to display all the open cases -->
<template slot="items" slot-scope="props" >
    <v-container > 
            <template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
  </div>
</template>
  <!-- Datatable with containing all the open cases -->
        <v-card > 
                <v-card-title>
                  Offene Fälle
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" 
                    single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      :headers="headers"
      :items="ccases"
      item-key="casenr"
      :search="search"
      class="elevation-1"  
      no-data-text="keine offenen Fälle gefunden - Legen Sie eine neuen Fall an"
    >
      <template v-slot:item.start="{ item }">
       <router-link :to="{ name: 'Protocol', params: { id: item._id } }">
            <v-icon :color="color">
         play_circle_filled 
        </v-icon>
        </router-link>
      </template>
       <template v-slot:item.birthdate="{ item }">
      {{ formatDate(item.birthdate) }}
    </template>
     <template v-slot:item.opdate="{ item }">
      {{ formatDate(item.opdate) }}
    </template>
        <template v-slot:item.edit="{ item }">
       <router-link :to="{ name: 'Editopencase', params: { id: item._id } }">
            <v-icon>
          edit
        </v-icon>
        </router-link>
      </template>
      <template v-slot:item.delete="{ item }">
            <v-icon @click="deleteOpenCase(item._id, item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
   </v-card> </br>
      <div class="text-right">
         <router-link :to="{ name: 'Newcase' }">
       <v-btn    color="primary"  :left="true" @click="" >Neuer Fall +</v-btn>
       </router-link>
       </div>
    </v-container> 
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Cases',
  //initialize variables
  data() {
    return {
      color: 'success',
      fixed: true,
      ccases: [],
      search: '',
      headers: [
        { text: 'IOM Starten', value: 'start', sortable: false, width: '50px' },
        { text: 'Fall Nr.', value: 'casenr', width: '90px'},
        { text: 'Name', value: 'name', width: '120px'},
        { text: 'Vorname', value: 'surname', width: '120px'},
        { text: 'Geb-Datum', value: 'birthdate', width: '120px'},
        { text: 'Diagnose', value: 'diagnose', width: '120px'},
        { text: 'Operation', value: 'operation', width: '120px'},
        { text: 'OP-Datum', value: 'opdate', width: '120px'},
        { text: 'Bearbeiten', value: 'edit', sortable: false },
        { text: 'Löschen', value: 'delete', sortable: false },

      ],

        breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Offene Fälle',
          disabled: true,
          href: 'opencases',
        },
      ],

    };
  },

  // fetch all cases on pageload
  mounted() {
    this.fetchCases();
  },

  
  methods: {
    // method to fetch all cases from the database
    async fetchCases() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: '/cases',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
      })
        .then((response) => {
          this.ccases = response.data.cases;
        })
        .catch(() => {});
    },
//format date
     formatDate(value) {
      return moment(value).format("DD-MM-YYYY")
  },

    // delete a opencase from the database
    async  deleteOpenCase(id, item) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `/cases/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.ccases.indexOf(item);
          this.ccases.splice(index, 1);
        })
        .catch(() => {});
    },
  },
};
</script>
