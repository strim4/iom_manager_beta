<template>
<!-- Login form -->
    <v-form v-model="valid" ref="form" lazy-validation>
        <h1 class="my-5">IOM-Manager - Login:</h1>
        <v-row class="my-5" align="center" justify="center">
         <v-img
        src="./../static/logo.png"
        position='center center'
        max-height="160"
        max-width="360"
      ></v-img>
      </v-row>
      <v-row>
          <v-col cols="12" sm="6" md="3"></v-col>
          <v-col align="center" cols="12" sm="-10" md="6">
              <v-text-field class="my-n5" label="E-Mail" v-model="email" :rules="emailRules" required></v-text-field>
          </v-col>
      </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="3"></v-col>
            <v-col cols="12" sm="6" md="6">
                 <v-text-field class="my-n2" 
                 v-model="password"
                 :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                 :type="show1 ? 'text' : 'password'"
                 label="Passwort" 
              
              counter
              @click:append="show1 = !show1"
              required
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3"></v-col>
      </v-row>
        <v-btn @click="submit" :disabled="!valid" color="success"> Anmelden</v-btn>

        <v-btn @click="clear">Zurücksetzen</v-btn>
        <h3 class="mt-12">Noch nicht registriert?</h3>
        <router-link v-bind:to="{ name: 'Register' }" >
        <v-btn  color="primary"> Registrieren</v-btn>
        </router-link>

    </v-form>
    <!-- End Loginform-->
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        //initialize variables
        valid: true,
        show1: false,
        email: '',
        password: '',
        emailRules: [
            v => !!v || 'Bitte geben Sie eine E-Mailadresse ein',
            v => /\S+@\S+\.\S+/.test(v) || 'E-mailadresse ist ungültig',
        ],
    }),

    methods: {
        //Login and user an set user token 
        async submit() {
            return axios({
                    method: 'post',
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                    url: '/users/login',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    window.localStorage.setItem('auth', response.data.token);
                    this.$swal('Angemeldet!', 'Sie haben sich erfolgreich angemeldet!', 'success');
                    this.$router.push({ name: 'Home' });
                })
                .catch((error) => {
                    const message = error.response.data.message;
                    this.$swal('Fehlgeschlagen!', `${message}`, 'error');
                    this.$router.push({ name: 'Login' });
                });
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>