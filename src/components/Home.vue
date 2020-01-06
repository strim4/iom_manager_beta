<template>
  <v-layout>

    <!--Start Dashboards -->
     <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-col>

        <v-row class="my-5" align="center" justify="center">
         <v-img
        src="./../static/logo.png"
        position='center center'
        max-height="150"
        max-width="300"
      ></v-img>
      </v-row>
      <v-row  class="mb-5" align="center" justify="center">
          <h1>IOM-Manager</h1>
        </v-row>
      <v-row>
        <v-flex  xs6>
            <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Erfasste Fälle</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="indigo" size="50">
        <span class="white--text headline">{{ CompletCaseCount}}</span>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
         <router-link :to="{ name: 'Casesearch' }">
          <v-btn color="indigo accent-4" text>Fallsuche</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
        </v-flex>

         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Offene Fälle</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="indigo" size="50">
        <span class="white--text headline">{{OpenCaseCount}}</span>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
        
          <router-link :to="{ name: 'Opencases' }">
         <v-btn color="indigo accent-4" text>Offene Fälle</v-btn>
        </router-link>
        
      </v-card-actions>
    </v-card>
        </v-flex>
        
         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Handbuch</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="indigo" size="50">
        <v-icon dark>mdi-book</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
        <a href="./../static/handbuch.pdf" target="_blank">
       <v-btn color="indigo accent-4" text>Handbuch öffnen</v-btn>
        </a>
      </v-card-actions>
    </v-card>
        </v-flex>
        
         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Kontakt / Info</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="indigo" size="50">
        <v-icon dark>mdi-email</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
          <router-link :to="{ name: 'Contact' }">
         <v-btn color="indigo accent-4" text>Kontakt öffnen</v-btn>
        </router-link>        
      </v-card-actions>
    </v-card>
        </v-flex>
      </v-row>
      </v-col>
      </v-layout>
      <!--End Dashboards -->
    </v-container>
  </v-layout>
</template>


<script>
import axios from 'axios';

export default {
  //initialize variables
  data() {
    return {
    openItems: {}, 
    completCases: {},
    name: '',
    current_user: null,
    };
  },

//Count Cases
computed: {
  OpenCaseCount () {
      return Object.keys(this.openItems).length
  },
   CompletCaseCount () {
      return Object.keys(this.completCases).length
  }
},

methods: {
//fetches all open cases
    async fetchOpenCases() {
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
          this.openItems = response.data.cases;
           this.current_user = response.data.current_user;
         
        })
        .catch(() => {});
    },

// fetch all completcases
     async fetchAllCases() {
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
          
          this.completCases = response.data.protocols;
        
          
        })
        .catch(() => {});
    },

},

//fetches open cases on pageload
  mounted(){

   this.fetchOpenCases();
   this.fetchAllCases();

  },
};
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
