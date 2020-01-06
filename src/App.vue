<!-- This File contains the basic structure of the app including the main menu, the navbar and the footer -->
<template>
    <v-app id="inspire">
    <!-- Start Sidemenu-->
        <v-navigation-drawer fixed v-model="drawer" app v-if="['Protocol', 'Login', 'Register'].indexOf($route.name) === -1">
            <v-list dense>
                <router-link v-bind:to="{ name: 'Home' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Home</v-list-item-content>
                    </v-list-item>
                </router-link>
                 <router-link v-bind:to="{ name: 'Opencases' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>folder_open</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Offene Fälle</v-list-item-content>
                    </v-list-item>
                </router-link>
                 <router-link v-bind:to="{ name: 'Newcase' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>control_point</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Neuer Fall</v-list-item-content>
                    </v-list-item>
                </router-link>
                  <router-link v-bind:to="{ name: 'Casesearch' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>search</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Fallsuche</v-list-item-content>
                    </v-list-item>
                </router-link>
                 <router-link v-bind:to="{ name: 'Analysis' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>assessment</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Analyse</v-list-item-content>
                    </v-list-item>
                </router-link>
                 <router-link v-bind:to="{ name: 'Settings' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>build</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Einstellungen</v-list-item-content>
                    </v-list-item>
                </router-link>
                <router-link v-bind:to="{ name: 'Contact' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>contact_mail</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Kontakt / Info</v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>
         <!-- End Sidemenu-->
          <!-- Start Mainmenu / Navbar-->
        <v-app-bar color="indigo" dark fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>IOM-Manager</router-link></v-toolbar-title>
                <v-spacer></v-spacer>
                <router-link v-bind:to="{ name: 'Home' }" class="side_bar_link" v-show="$route.path==='/users/register' || $route.path==='/users/login' || $route.path==='/' || $route.path==='/home'  ? false : true">
                 <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        </router-link>
         
  <div  v-show="$route.path==='/users/register' || $route.path==='/users/login' || $route.path==='/' ? false : true">  Eingeloggt als: <b>{{name}}</b>
        <v-btn icon @click="logout">
           
                <v-btn icon>
          <v-icon>mdi-logout</v-icon>
          </v-btn>
         
        </v-btn> </div>
        
      

       
        </v-app-bar>
         <!-- End Mainmenu / Navbar-->
        <v-content>
            <v-container fluid>
                <div id="app" >
                    <router-view/>
                </div>
            </v-container>
        </v-content>
         <!-- Start Footer-->
        <v-footer color="indigo" app>
            <span class="white--text">IOM Manager &copy; 2020 Chantal Zbinden,
             Moritz Strickler</span>
        </v-footer>
         <!-- Ende Footer -->
    </v-app>
</template>

<script>


// Imports
import './assets/stylesheets/main.css';
import axios from 'axios';

export default {
  data: () => ({
    drawer: null,
    current_user: null,
    name: '',
  
  }),

 //fetch user on Pageload
  mounted(){
     this.fetchUser();  
  },


  
  methods: {
//logout method
    logout() {
           
localStorage.removeItem('auth');
sessionStorage.removeItem('auth');
        return axios({
        method: 'get',
        url: '/logout',
        })
        .then(() => {
      
        this.$router.push({ name: 'Login' });
        })
        .catch(() => {
        });
},

//get id from loggedin user
   async fetchUser() {
     const token = window.localStorage.getItem('auth');
return axios({
method: 'get',
url: '/current_user',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
},
})
.then((response) => {
this.current_user = response.data.current_user;
  this.fetchUserName(this.current_user.id);
})
.catch(() => {
});
},


//get name to corresponding id 
 async  fetchUserName(id) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          id,
        },
        url: `/users/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          this.name = response.data.users.name;
        })
        .catch(() => { console.log('error'); });
    },

  },
  props: {
    source: String,
  },
};
</script>

<style>

</style>
