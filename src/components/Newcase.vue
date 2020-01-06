<!-- This file contains the structure to prapare a new case and save it to the database -->
<template>

<!-- Form to add a new Case -->
    <v-form v-model="valid" ref="form" lazy-validation>
      <template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
  </div>
</template>
        <h1>Neuer Fall</h1>
        <v-row>
        <v-col cols="12" sm="6" md="6">
          <h5 class="mt-5">Angaben zum Patienten</h5>
          <v-text-field label="Fall Nr." v-model="casenr" :rules="requiredRules" required></v-text-field>
          <v-text-field label="PID" v-model="pid"></v-text-field>
          <v-text-field label="FID" v-model="fid"></v-text-field>
          <v-text-field label="Name" v-model="name" :rules="requiredRules" required></v-text-field>
          <v-text-field label="Vorname" v-model="surname" :rules="requiredRules" required></v-text-field>
         <v-text-field label="Geburtsdatum"  prepend-icon="event"  v-model="birthdate" :rules="dateRules" required></v-text-field>
        <!-- <v-date-picker class="mb-5" v-model="birthdate"  :landscape="$vuetify.breakpoint.smAndUp"  :locale="'de'"></v-date-picker>-->
        </v-col>
        <v-col cols="12" sm="6" md="6">
        <h5 class="mt-5">Angaben zur Operation</h5>
        <v-select label="Diagnose" v-model="diagnose" :items="diagnoses" item-text="diagnose"></v-select>
        <v-select label="Operation" v-model="operation" :items="operations" item-text="operation"></v-select>
        <v-select label="ISIS-Gerät" v-model="isismodality" :items="isismodalities" item-text="device"></v-select>
        <v-select label="Operateur" v-model="surgeon" :items="surgeons" item-text="surgeon"></v-select>
        <v-select label="Assistent" v-model="assistant" :items="assistants" item-text="assistant"></v-select>
        <v-text-field label="OP-Datum" prepend-icon="event" v-model="ODate" :rules="requiredRules" required>></v-text-field>
        <v-date-picker v-model="opdate" :landscape="$vuetify.breakpoint.smAndUp" :locale="'de'"></v-date-picker>

        </v-col>
        </v-row>
        <v-btn class="mt-5" @click="submit" color="success" :disabled="!valid">
            speichern
        </v-btn>
        <v-btn class="mt-5" @click="clear">zurücksetzten</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios';
import moment from 'moment';


export default {
  data: () => ({
//initialize variables
    valid: true,
    casenr: '',
    pid: '',
    fid: '',
    name: '',
    surname: '',
    birthdate: '',
    datebirthdate: null,
    diagnose: '',
    operation: '',
    isismodality: '',
    opdate: '',
    surgeon: '',
    assistant: '',
    requiredRules: [
      v => !!v || 'Bitte befüllen Sie alle Pflichtfelder',
    ],
      dateRules: [
         v => !!v || 'Bitte befüllen Sie alle Pflichtfelder',
      v => /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/.test(v) || 'Nur Eingaben im Format dd.mm.yyyy sind zulässig',
    ],
    
    select: null,
    diagnoses: [],
    operations: [],
    isismodalities: [],
    surgeons: [],
    assistants: [],
    ccases: [],
    compCases: [],
    breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Neuer Fall',
          disabled: true,
          href: 'newcase',
        },
      ],
  }),

  computed: {
    // a computed getter
    ODate: function () {
      // `this` points to the vm instance
      return moment(this.opdate).format("DD-MM-YYYY")
    }
  },

  
  // fetches all dropdown values form the database on pageload
  mounted() {
    this.fetchDiagnoses();
    this.fetchOperations();
    this.fetchDevices();
    this.fetchSurgeons();
    this.fetchAssistans();
    this.fetchCases();
    this.fetchCompCases();
  },

  methods: {
//format date 
formatDate: function (date) {
  return moment(date).format('DD-MM-YYYY')
},
    // submit method to send the new case to the backend to store. checks if casenr already exists
    submit() {
      if (this.$refs.form.validate()  ) {
        var found = false;
for(var i = 0; i < this.ccases.length; i++) {
    if (this.ccases[i].casenr == this.casenr) {
        found = true;
      
        break;
    }
};
for(var i = 0; i < this.compCases.length; i++) {
    if (this.compCases[i].casenr == this.casenr) {
        found = true;
       
        break;
    }
};
        
        if(found){
           this.$swal(
              'Fehler!',
              'Die Fallnummer existiert bereits!',
              'error',
            );
        }else{
          this.datebirthdate = moment(this.birthdate, 'DD.MM.YYYY').toDate();
           const token = window.localStorage.getItem('auth');
        return axios({
          method: 'post',
          data: {
            casenr: this.casenr,
            pid: this.pid,
            fid: this.fid,
            name: this.name,
            surname: this.surname,
            birthdate:  this.datebirthdate,
            diagnose: this.diagnose,
            operation: this.operation,
            isismodality: this.isismodality,
            opdate: this.opdate,
            surgeon: this.surgeon,
            assistant: this.assistant,
          },
          url: '/cases',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Fall wurde erfolgreich gespeichert!',
              'success',
            );
            this.$router.push({ name: 'Opencases' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Der Fall konnte nicht gespeichert werden!',
              'error',
            );
          });




          };
      }
      return true;
    },
    
    // method to reset the form
    clear() {
      this.$refs.form.reset();
    },

    // method to fetch all diagnoses from the database
    async fetchDiagnoses() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: '/diagnoses',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },

      })
        .then((response) => {
          this.diagnoses = response.data.diagnoses;
        })
        .catch(() => {});
    },

    // method to fetch all operations from the database
    async fetchOperations() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
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

    // method to fetch all isismodalities from the database
    async fetchDevices() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: '/devices',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
      })
        .then((response) => {
          this.isismodalities = response.data.devices;
        })
        .catch(() => {});
    },

    // method to fetch all surgeons from the database
    async fetchSurgeons() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
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

    // method to fetch all assistants from the database
    async fetchAssistans() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
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

     async fetchCompCases() {
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
          this.compCases = response.data.protocols;
        })
        .catch(() => {});
    },
  },
};
</script>

