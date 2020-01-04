<!-- This file contains the structure to update a case and save it to the database -->
<template>

<!-- Form to update a case -->
    <v-form v-model="valid" ref="form" lazy-validation>
        <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
  </div>
        <h1>Offener Fall bearbeiten</h1>
      <v-row>
      <v-col cols="12" sm="6" md="6">
        <h5 class="mt-5">Angaben zum Patienten</h5>
        <v-text-field label="Fall Nr." v-model="casenr" :rules="requiredRules" required></v-text-field>
        <v-text-field label="PID" v-model="pid"></v-text-field>
        <v-text-field label="FID" v-model="fid"></v-text-field>
        <v-text-field label="Name" v-model="name" :rules="requiredRules" required></v-text-field>
        <v-text-field label="Vorname" v-model="surname" :rules="requiredRules" required></v-text-field>
        <v-text-field label="Geburtsdatum"  prepend-icon="event"  v-model="birthdate" :rules="requiredRules" required></v-text-field>
        <!--<v-date-picker v-model="birthdate" :landscape="$vuetify.breakpoint.smAndUp"  :locale="'de'"></v-date-picker> -->
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <h5 class="mt-5">Angaben zur Operation</h5>
        <v-select label="Diagnose" v-model="diagnose" :items="diagnoses" item-text="diagnose"></v-select>
        <v-select label="Operation" v-model="operation" :items="operations" item-text="operation"></v-select>
        <v-select label="ISIS-Gerät" v-model="isismodality" :items="isismodalities" item-text="device"></v-select>
        <v-select label="Operateur" v-model="surgeon" :items="surgeons" item-text="surgeon"></v-select>
        <v-select label="Assistent" v-model="assistant" :items="assistants" item-text="assistant"></v-select>
        <v-text-field label="OP-Datum" prepend-icon="event" v-model="opdate"></v-text-field>
       <!-- <v-date-picker v-model="opdate" :landscape="$vuetify.breakpoint.smAndUp" :locale="'de'"></v-date-picker> -->
        
      </v-col>
        </v-row>
        <v-btn class="mt-5" @click="update" color="success" :disabled="!valid">
            speichern
        </v-btn>
        <v-btn class="mt-5" @click="clear">zurücksetzten</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  //initialize variables
  data: () => ({
    id: 0,
    valid: true,
    casenr: '',
    pid: '',
    fid: '',
    name: '',
    surname: '',
    birthdate: null,
    diagnose: '',
    operation: '',
    isismodality: '',
    opdate: '',
    surgeon: '',
    assistant: '',

    requiredRules: [
      v => !!v || 'Bitte befüllen Sie alle Pflichtfelder',
    ],
    select: null,
    diagnoses: [],
    operations: [],
    isismodalities: [],
    surgeons: [],
    assistants: [],

        breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: true,
          href: 'home',
        },
        {
          text: 'Offene Fälle',
          disabled: true,
          href: 'opencases',
        },
      ],
  }),

  // fetches all dropdown values on pageload and fetch specific case from the database
  mounted() {
  
    this.fetchCase(this.id);
    this.fetchDiagnoses();
    this.fetchOperations();
    this.fetchDevices();
    this.fetchSurgeons();
    this.fetchAssistans();
  },

  // store case id from the routerlink to a local variable on page load
  created() {
    this.id = this.$route.params.id;
  },

  methods: {
    // update a case
    update() {
      if (this.$refs.form.validate()) {
        const token = window.localStorage.getItem('auth');
        return axios({
          method: 'put',
          data: {

            casenr: this.casenr,
            pid: this.pid,
            fid: this.fid,
            name: this.name,
            surname: this.surname,
            birthdate: moment(this.birthdate, 'DD-MM-YYYY').toDate(),
            diagnose: this.diagnose,
            operation: this.operation,
            isismodality: this.isismodality,
            opdate: moment(this.opdate, 'DD-MM-YYYY').toDate(),
            surgeon: this.surgeon,
            assistant: this.assistant,
          },
          url: `http://localhost:8081/cases/${this.id}`,
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Fall wurde erfolgreich aktualisiert!',
              'success',
            );
            this.$router.push({ name: 'Opencases' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Der Fall konnte nicht aktualisiert werden!',
              'error',
            );
          });
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
        url: 'http://localhost:8081/diagnoses',
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
        url: 'http://localhost:8081/operations',
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
        url: 'http://localhost:8081/devices',
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
        url: 'http://localhost:8081/surgeons',
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
        url: 'http://localhost:8081/assistants',
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


    // fetch a single case from the database
    async  fetchCase(id) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          id,
        },
        url: `http://localhost:8081/cases/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          this.casenr = response.data.cases.casenr;
          this.pid = response.data.cases.pid;
          this.fid = response.data.cases.fid;
          this.name = response.data.cases.name;
          this.surname = response.data.cases.surname;
          this.birthdate = moment( response.data.cases.birthdate).format("DD-MM-YYYY");
          this.diagnose = response.data.cases.diagnose;
          this.operation = response.data.cases.operation;
          this.isismodality = response.data.cases.isismodality;
          this.opdate = moment( response.data.cases.opdate).format("DD-MM-YYYY");
          this.surgeon = response.data.cases.surgeon;
          this.assistant = response.data.cases.assistant;
        })
        .catch(() => { console.log('error'); });
    },
  },
};
</script>

