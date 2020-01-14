<template>

 <v-layout>
  
      <v-flex fluid>
         <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
  </div>
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-img
                src="https://c.nau.ch/i/gBGm5K6ZyMVlJedOaYdMldLj14nDQzPk8wxoNXrL/680/inselspitals.webp"
                aspect-ratio="2.75"
              ></v-img>
  <!-- Contact card-->
               <v-card-title primary-title>
                 <div>
                   <h3 class="headline mb-0"><b>Kontakt</b></h3>
                   <div class="my-4 subtitle-1 black--text">  {{ contactText }} </div>
                   <div class="my-4 subtitle-1 black--text"> {{ contactPerson }} </div>
                   <a href="mailto:chantal.zbinden@insel.ch">E-Mail senden</a>
                  </div>
                  
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
               <v-card>
              <v-img
                src="https://upload.wikimedia.org/wikipedia/commons/4/45/BFH_Biel%2C_Gebaeude_Quellgasse21_02_09.jpg"
                aspect-ratio="2.75"
              ></v-img>
  <!-- About card -->
               <v-card-title primary-title>
                 <div>
                   <h3 class="headline mb-0"><b>Über den IOM Manager</b></h3>
 <div class="my-4 subtitle-1 black--text"> Der IOM-Manager wurde von der Berner Fachhochschule in </br>Zusammenarbeit mit dem Inselspital als Studentenprojekt für die </br>Anwender des intraoperativen Neuromonitorings entwickelt. Er bietet die Funktionen für die intraoperative Protokollierung, in </br> Zusammenarbeit mit dem Klinikserver wird die Datenarchivierung </br>angeboten und es besteht die Möglichkeit unterschiedliche Analysen auszuführen. </br></br> Bei der vorliegenden Version handelt es sich um einen Prototyp. </br>Dies bedeutet, dass es  für den IOM Manager keinen laufenden </br>Support gibt. Für Anmerkungen sind die Entwickler jedoch immer </br>offen.</div>
                  </div>                
                </v-card-title>
              </v-card>
           </v-col>
          </v-row>
      </v-flex>

    </v-layout>
</template>


<script>
export default {
  //initialize variables
  data() {
    return {
         breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Kontakt / Info',
          disabled: true,
          href: 'contact',
        },
      ],
        contactText: 'Bei Fragen wenden Sie sich bitte an die folgende Kontaktperson: ',
        contactPerson: 'Chantal Zbinden, Inselspital Bern',
    }
  },
};
</script>
                  </div>                
                </v-card-title>
              </v-card>
           </v-col>
          </v-row>
      </v-flex>

    </v-layout>
</template>


<script>

export default {
  //initialize variables
  data() {
    return {
         breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Kontakt / Info',
          disabled: true,
          href: 'contact',
        },
      ],

        contactText: 'Bei Fragen wenden Sie sich bitte an die folgende Kontaktperson: ',
        contactPerson: 'Chantal Zbinden, Inselspital Bern',
    }
  },
};

</script>
