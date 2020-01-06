<template slot="items" slot-scope="props" >
    <v-container > 
      <template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
  </div>
</template>
  <!-- Datatable with containing all the finished cases -->
        <v-card > 
                <v-card-title>
                 Fallarchiv
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" 
                    single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table 
      v-model="selected"
      :headers="headers"
      :items="completcases"
      :single-select="singleSelect"
      item-key="casenr"
      show-select
      :search="search"
      class="elevation-1"  
       multi-sort
    >
      <template v-slot:item.start="{ item }">
       <router-link :to="{ name: 'Protocoloverview',  params: { casenr: item.casenr }  }">
            <v-icon :color="color">
        mdi-file-document
        </v-icon>
        </router-link>
      </template>   
        <template v-slot:item.birthdate="{ item }">
      {{ formatDate(item.birthdate) }}
    </template>
     <template v-slot:item.opdate="{ item }">
      {{ formatDate(item.opdate) }}
    </template>    
    </v-data-table>
   </v-card> </br>
      <div class="text-right">
       <v-btn    color="primary"  :left="true" @click="dialogAnalyse = true">Neue Analyse mit selketierten Fällen</v-btn>
       </div>
        <!-- dialog to add new analyse -->
         <v-dialog v-model="dialogAnalyse" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Neue Analyse:</span>
          </v-card-title>
          <v-card-text>
            <v-container>

                  <v-text-field v-model="analyse.name" class="my-n5" label="Geben Sie eine Bezeichnung ein"  ></v-text-field>

            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success"  @click="saveAnalyse">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Casesearch',
  //initialize variables
  data() {
    return {
      singleSelect: false,
      selected: [],
      color: 'indigo',
      fixed: true,
      completcases: [],
      dialogAnalyse: false,
      analyse: {},
      
      search: '',
      headers: [
        { text: 'Fall öffnen', value: 'start', sortable: false },
        { text: 'Fall Nr.', value: 'casenr', width: '90px' },
        //{ text: 'FID', value: 'fid' },
        //{ text: 'PID', value: 'pid' },
        { text: 'Name', value: 'name', width: '120px'},
        { text: 'Vorname', value: 'surname', width: '120px'},
        { text: 'Geb-Datum', value: 'birthdate', width: '120px'},
        { text: 'Alter', value: 'evaluation.age', width: '120px'},
        { text: 'OP-Datum', value: 'opdate', width: '120px'},
        { text: 'Diagnose', value: 'diagnose', width: '120px'},
        //{ text: 'Operation', value: 'operation' },
        //{ text: 'Operateur', value: 'surgeon', },
        //{ text: 'Assistent', value: 'assistant', },
        { text: 'Lokalisation', value: 'evaluation.local', width: '150px'},
        { text: 'Detail', value: 'evaluation.detail', width: '120px'},
        // { text: 'Pathologie', value: 'patho'},
        { text: 'Operation', value: 'evaluation.op', width: '120px'},
        { text: 'OP-Technik', value: 'evaluation.optechnik', width: '120px'},
        { text: 'Modalitäten', value: 'evaluation.modalities', width: '150px'},
        // { text: 'TES-MEP', value: 'evaluation.meps2'},
        // { text: 'DCS-MEP', value: 'evaluation.gripdmeps2'},
        // { text: 'SSEP', value: 'evaluation.sseps2'},
        // { text: 'AEP', value: 'evaluation.aeps2'},
        // { text: 'VEP', value: 'evaluation.veps2'},
        { text: 'Mapping', value: 'evaluation.mapping', width: '180px'},
        { text: 'Reflexes', value: 'evaluation.reflexes', width: '150px'},
        { text: 'Defizit nach 1 Tag', value: 'interpretation.deficitsDay',  width: '180px'},
       { text: 'Defizit nach 1 Woche', value: 'interpretation.deficitsWeek',  width: '180px'},
         { text: 'Defizit nach 1 Monat', value: 'interpretation.deficitsMonth',  width: '180px'},
        { text: 'Studie', value: 'evaluation.study', width: '120px'},

            ],
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Fallsuche',
          disabled: true,
          href: 'casesearch',
        },
      ],

    };
  },

  // fetch all cases on pageload
  mounted() {
    this.fetchCases();
  },
  
  // method to fetch all cases from the database
  methods: {
    async fetchCases() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: '/completcase',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },

      })
        .then((response) => {
          this.completcases = response.data.protocols;
        })
        .catch(() => {});
    },

     saveAnalyse: function() {
    
         const token = window.localStorage.getItem('auth');
        return axios({
          method: 'post',
          data: {
            name: this.analyse.name,
            cases: this.selected,
          },
          url: '/analyses',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Die Analyse finden Sie nun im Menu "Analyse".',
              'success',
            );
            this.dialogAnalyse = false;
            
           
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Die Analyse konnte nicht gespeichert werden!',
              'error',
            );
          });
     
    },
    showSelect: function(){
      console.log(this.selected );
    },
    //format date
     formatDate(value) {
      return moment(value).format("DD-MM-YYYY")
  },
  
  },
};
</script>

