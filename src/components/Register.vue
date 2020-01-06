<template>
<!-- Form for registration -->
    <v-form v-model="valid" ref="form" lazy-validation>
        </br> </br>
        <h1>IOM-Manager - Registrierung:</h1>
        <v-row   align="center" justify="center">
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
             
              <v-text-field class="my-n5"  label="Name" v-model="name" required></v-text-field>
          </v-col>
      </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="3"></v-col>
          <v-col align="center" cols="12" sm="-10" md="6">
             <v-text-field class="my-n5" label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
              
          </v-col>
      </v-row>
          <v-row>
          <v-col cols="12" sm="6" md="3"></v-col>
          <v-col align="center" cols="12" sm="-10" md="6">
          
              <v-text-field class="my-n5" label="Passwort" v-model="password" 
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                 :type="show1 ? 'text' : 'password'"
                
              
              counter
              @click:append="show1 = !show1"
              required></v-text-field>
          </v-col>
      </v-row>

           <v-row>
          <v-col cols="12" sm="6" md="3"></v-col>
          <v-col align="center" cols="12" sm="-10" md="6">            
               <v-text-field class="my-n5" name="input-7-1" label="Passwort bestätigen" v-model="confirm_password"
                 :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                 :type="show1 ? 'text' : 'password'"        
              counter
              @click:append="show1 = !show1"></v-text-field>
          </v-col>
      </v-row>
        </br>
        <v-btn @click="submit" :disabled="!valid" color="success">
            Registrieren
        </v-btn>
        <v-btn @click="clear">Zurücksetzten</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios';

export default {
//initialize variables
    data: () => ({
        show1: false,
        valid: true,
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        emailRules: [
            v => !!v || 'Bitte geben Sie eine E-Mailadresse ein',
            v => /\S+@\S+\.\S+/.test(v) || 'Die E-Mailadresse ist ungültig',
        ],
    }),

    methods: {
        // register a new user
        async submit() {
            if (this.$refs.form.validate()) {
                return axios({
                        method: 'post',
                        data: {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                        },
                        url: 'http://localhost:8081/users/register',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(() => {
                        this.$swal(
                            'Erfolgreich!',
                            'Sie haben sich erfolgreich registriert!',
                            'success',
                        );
                        this.$router.push({ name: 'Login' });
                    })
                    .catch((error) => {
                        const message = error.response.data.message;
                        this.$swal('Fehlgeschlagen!', `${message}`, 'error');
                    });
            }
            return true;
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>