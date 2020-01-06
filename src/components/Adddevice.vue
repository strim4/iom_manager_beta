<!-- This file contains the structure for the add device site-->
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
                <h1>Neue IOM-Geräte hinzufügen</h1>
                <v-text-field label="IOM-Gerät" :rules="rules" v-model="device" required></v-text-field>
                <v-btn @click="submit" color="success" :disabled="!valid">
                    Hinzufügen
                </v-btn>
                <v-btn @click="clear">Zurücksetzten</v-btn>
            </v-form>
        </v-col>
        </br>
        </br>

    <!-- Datatable with the stored devices -->
        <v-card>
                <v-card-title>
                    Erfasste IOM-Geräte
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="devices"
      item-key="name"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
            <v-icon

          @click="deleteIOM-Gerät(item._id, item)"
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
  data: () => ({
  //initialize variables
    valid: true,
    device: '',
    selected: [],
    rules: [
      v => !!v || 'Bitte geben Sie eine IOM-Gerät ein',
    ],
    fixed: true,
    devices: [],
    search: '',
    headers: [{
      text: 'IOM-Gerät',
      align: 'left',
      value: 'device',
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
          text: 'ISIS-Gerät hinzufügen',
          disabled: true,
          href: 'adddevice',
        },
      ],


  }),
  // fetch all devices on pageload
  mounted() {
    this.fetchDevices();
  },
  methods: {
    // submit method to send the new device to the backend
    submit() {
      if (this.$refs.form.validate()) {
        const token = window.localStorage.getItem('auth');
        return axios({
          method: 'post',
          data: {
            device: this.device,
          },
          url: '/devices',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Das IOM-Gerät wurde gespeichert!',
              'success',
            );
            this.fetchDevices();

            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Fehlgeschlagen!',
              'Das IOM-Gerät konnte nicht gespeichert werden!',
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

    // fetches all devices from the database
    async fetchDevices() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          device: this.device,
        },
        url: '/devices',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },

      })
        .then((response) => {
          this.devices = response.data.devices;
        })
        .catch(() => {});
    },

    // delete a device from the database
    async  deleteDevice(id, item) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `/devices/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.devices.indexOf(item);
          this.devices.splice(index, 1);
        })
        .catch(() => {});
    },
  },
};

</script>
