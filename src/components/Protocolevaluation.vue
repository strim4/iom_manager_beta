<template>
<v-layout  >
    <v-container  >
     <v-layout row>
    <v-flex md2 >
     <!-- Card for patient and op information -->  
        <v-card
      class="mx-auto"
      max-width="175" 
      style="position: fixed;"
    >
    <v-card-title>Patientendaten</v-card-title>
      <v-card-text class="text-left">
     {{name}}, {{surname}}</br> {{formBirthdate}}</p>
     <v-divider></v-divider>
     </v-card-text>
     <v-card-title>Operation</v-card-title>
     <v-card-text class="text-left">
      Diagnose: {{diagnose}}</br>
      Operation: {{operation}} </br>
      Datum: {{formOpdate}}
      </p>
      <v-divider></v-divider>
       </v-card-text>
      
       <v-card-text class="text-center">
       <v-btn  class="my-n3" width="140px"  color="primary"  @click="dialogEval = true" >Auswertung </br> Monitorist</v-btn>
      </v-card-text>
     <v-card-text class="text-center">
       <v-btn  class="my-n3" width="140px"  color="primary"  @click="dialogBaselines = true" >Baselines</v-btn>
      </v-card-text>
      <v-card-text class="text-center">
       <v-btn   class="my-n3" width="140px" color="primary"  @click="dialogExtras = true" >Extras</v-btn>
      </v-card-text>
      <v-card-text class="text-center">
       <v-btn   class="my-n3" width="140px" color="primary"  @click="dialogClosing = true" >Closing</v-btn>
      </v-card-text>
      
    </v-card>

<!-- protocol entries -->
    </v-flex>
    <v-flex md10 >
     <p class=".font-weight-medium">Fall-Nr. {{casenr}} </br></p>

        </v-flex> 
  </v-layout> 
  <v-layout row>
    <v-flex md2 >   
    </v-flex>
    </br></br>
    <v-flex md10 >
     </br></br>
      <v-layout row>
        <v-flex md2><b><p>Uhrzeit</p></b></v-flex>
        <v-flex md2><b>Kategorie</b></v-flex>
        <v-flex md3><b>Eintrag</b></v-flex>
        <v-flex md4><b>Bemerkung</b></v-flex>
      </v-layout >  </br> 
          
      <div v-for="(entry, index) in entries">
        <v-layout row >
          
        <v-flex md2 >{{entry.ts}}</v-flex>
        <v-flex md2 >{{entry.entrycat.name}}</v-flex>
        <v-flex md3  ><p  class="text-break">{{entry.event}}</p></v-flex>
        <v-flex md4> <v-textarea v-model="entry.comment"  :auto-grow="true" :dense="true" :readonly="true" :rows="2"></v-textarea></v-flex>        
      </v-layout > 
       <v-divider></v-divider>
      </div>
        </v-flex> 
  
<!-- dialog for case evaluation -->
         <v-dialog v-model="dialogEval" persistent max-width="1000px">
             <v-card>
          <v-card-title>
            <span class="headline">Fallauswertung Monitorist:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.age" class="my-n3" :disabled="true"
                    :items="age"
                    label="Alter"
                  ></v-select>
                  <v-select v-model="evaluation.sex" class="my-n3" :disabled="true"
                    :items="sex"
                    label="Geschlecht"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.local" class="my-n3" :disabled="true"
                    :items="local"
                    label="Lokalisation"
                  ></v-select>
                  <v-select v-model="evaluation.detail" class="my-n3" :disabled="true"
                    :items="detail"
                    label="Detail"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.patho" class="my-n3" :disabled="true"
                    :items="patho"
                    label="Pathologie"
                  ></v-select>
                  <v-select v-model="evaluation.op" class="my-n3" :disabled="true"
                    :items="op"
                    label="Operation"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.anaest" class="my-n3" :disabled="true"
                    :items="anaest"
                    label="Anästhesie"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" sm="4" md="8">
                 <v-select v-model="evaluation.modalities" class="my-n3" label="Modalitäten" :items="modalities" multiple :disabled="true"></v-select>
                  <v-select v-model="evaluation.mapping" class="my-n3" label="Mapping" :items="mapping" multiple :disabled="true"></v-select>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                    <label>Tiefste Mapping-Schwelle</label>
                    </v-col>
                    <v-col cols="12" sm="4" md="2">
                    <v-text-field v-model="evaluation.mappingsw" class="my-n3" suffix="mA" :disabled="true"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-select v-model="evaluation.reflexes" class="my-n3" label="Reflexe" :items="reflexes" multiple :disabled="true"></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="evaluation.sseps2" class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="SSEPs"
                  ></v-select>
                  <v-select v-model="evaluation.meps2" class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="TES-MEPs"
                  ></v-select>
                  <v-select v-model="evaluation.aeps2" class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="AEPs"
                  ></v-select>
                  <v-select v-model="evaluation.veps2" class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="VEPs"
                  ></v-select>
                  <v-select v-model="evaluation.gripdmeps2" class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="DCS-MEPs"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                 <v-col cols="12" sm="6" md="4">
                    <v-select v-model="evaluation.optechnik" class="my-n3" :disabled="true" 
                    :items="optechnik"
                    label="OP-Technik"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-checkbox  class="my-n3" v-model="evaluation.studycheck" :disabled="true"  label="Studienfall"></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="evaluation.study" class="my-n3"  :disabled="true" label="Studien eingeben"></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                  
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea v-model="evaluation.comment" :disabled="true" 
                  outlined
                  name="Bemerkungen"
                 label="Bemerkungen"
                  ></v-textarea>
                 </v-col>
             </v-row>    
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
           
            <v-btn  depressed  large color="primary"  @click="dialogEval = false">Schliessen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
  </v-layout> 
  </br></br>
  <v-layout row>
               <v-flex md2></v-flex>
               <v-flex md10>
                 <v-layout row>
                   <v-flex md0.5></v-flex>
                    <v-flex md2> <v-btn    color="primary"  @click="createPDF">PDF generieren</v-btn></v-flex>
                    <v-flex md0.5></v-flex>
                    <v-flex md2> <v-btn    color="primary"  @click="dialogUpload = true">EDF hinzufügen</v-btn></v-flex>
                    <v-flex md0.5></v-flex>
                    <v-flex md2.5><v-btn    color="primary"  @click="dialogInterpret = true">Interpretation hinzufügen</v-btn></v-flex>
                    
                    <v-flex md3><b><v-btn    color="success"  @click="submit()">Fall abschliessen</v-btn></b></v-flex>
                </v-layout>
               </v-flex>
    </v-layout> 

<!-- dialog for baselines  -->
         <v-dialog v-model="dialogBaselines" persistent max-width="1000px">
        
        <v-card >
          <v-card-title>
            <span class="headline">Baselines:</span>
          </v-card-title>
          <v-card-text>
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>Baselines SSEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container> 
              <v-row>
                <v-col cols="12" sm="6" md="2">
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>N</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>P</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>Amplitude</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusLN" :disabled="true" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusLP" class="my-n5" :disabled="true"  suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusLAmp" class="my-n5" suffix="uV" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusRN" class="my-n5" suffix="ms" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusRP" class="my-n5" :disabled="true" suffix="ms" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusRAmp" class="my-n5" suffix="uV" :disabled="true"   ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisLN" class="my-n5" :disabled="true" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisLP" class="my-n5" :disabled="true" suffix="ms" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisLAmp" class="my-n5" suffix="uV" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisRN" class="my-n5" :disabled="true" suffix="ms" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisRP" class="my-n5" :disabled="true" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisRAmp" class="my-n5" suffix="uV" :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>Baselines TES MEPs</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <label>Seite</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C1/C2</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C3/C4</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C3/Cz</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C4/Cz</label>
                </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel1" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 1"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel1Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              
               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel2" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 2"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
               </v-row> 

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel3" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 3"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel3Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C3C4" class="my-n5"  suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel4" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 4"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel4Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel5" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 5"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel5Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel6" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 6"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel6Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel7" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 7"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel7Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel8" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 8"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel8Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel9" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 9"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel9Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel10" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 10"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel10Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel11" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 11"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel11Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel12" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 12"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel12Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel13" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 13"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel13Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel14" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 14"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel14Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel15" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 15"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel15Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel16" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 16"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel16Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

            </v-container>
            </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>Baselines DCS MEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container>
                <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-label></v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>Seite</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#1</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#2</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#3</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#4</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Masseter</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.masseterSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter1" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter2"  class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter3"  class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter4"  class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Orb oris</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.orisSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris1" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris3" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris4" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Deltoideus</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.deltoideusSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus1" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus3" class="my-n5"  :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus4" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Biceps</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bicepsSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps1" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps3" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps4" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Extensor</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.extensorSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor1" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor2" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor3" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor4" class="my-n5"  :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.thenarSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar1" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  v-model="baselines.thenar2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar3" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar4" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.tibSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib1" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib3" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib4" class="my-n5"  :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Abd hall</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.abdSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd1" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd2" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd3" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd4" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader  class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.thenar2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar21" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar22" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar23" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar24" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2" >
                  <v-subheader  class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.tib2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib21" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib22" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib23" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib24" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>Baselines AEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
                <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-label></v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>I</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>II</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>III</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>IV</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>V</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLI" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLII" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLIII" class="my-n5" suffix="ms":disabled="true"  ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLIV" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field  v-model="baselines.aepLV" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRI" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRII" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRIII" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRIV" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRV" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>Baselines VEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
                            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >VEP</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.vepL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.vepR" class="my-n5" :disabled="true" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>Reflexe</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >BR</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.brL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.brR" class="my-n5" :disabled="true" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >LAR</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.larL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.larR" class="my-n5" :disabled="true" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" :disabled="true" >BCR</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bcrL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bcrR" class="my-n5" :disabled="true" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
               <v-textarea class="mb-n10" v-model="baselines.bcrComment"
                  outlined
                  name="Bemerkungen"
                 label="Bemerkungen"
                  ></v-textarea>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="primary"  @click="dialogBaselines = false">Schliessen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!-- dialog for interpretation -->
         <v-dialog v-model="dialogInterpret" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Interpretation:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field v-model="interp.histopatho" label="Histopathologie"></v-text-field>
              </v-row>
              <v-label>IOM:</v-label>
              <v-textarea  v-model="interp.text" :outlined="true" :auto-grow="true" ></v-textarea>
              <v-label>Klinisch:</v-label>
              <v-textarea  v-model="interp.text2" :outlined="true" :auto-grow="true" ></v-textarea>
              <v-label>Defizite</v-label>
              <v-row>
                <v-col>
                  <v-select v-model="interp.deficitsDay" class="my-n3" label="1 Tag postop" :items="deficits" multiple chips></v-select>
                 <v-text-field v-model="interp.CNDay" class="my-n3" label="CN"></v-text-field>
                 <v-text-field v-model="interp.MCRSDay" label="MCRS"></v-text-field>
                </v-col>
                <v-col>
                  <v-select v-model="interp.deficitsWeek" class="my-n3" label="1 Woche postop" :items="deficits" multiple chips></v-select>
                  <v-text-field v-model="interp.CNWeek" class="my-n3" label="CN"></v-text-field>
                 <v-text-field v-model="interp.MCRSWeek" label="MCRS"></v-text-field>
                </v-col>
               <v-col>
                 <v-select v-model="interp.deficitsMonth" class="my-n3" label="1 Monat postop" :items="deficits" multiple chips></v-select>
                 
                 <v-text-field v-model="interp.CNMonth" class="my-n3" label="CN"></v-text-field>
                 
                 <v-text-field v-model="interp.MCRSMonth" label="MCRS"></v-text-field>
               </v-col>
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success" @click="dialogInterpret= false">Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogInterpret = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


       <!-- dialog for extras -->
         <v-dialog v-model="dialogExtras" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Extras:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label>Amplitude</label>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label>Latenz</label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >D-Welle:</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.dWaveAmp" class="my-n5" suffix="mV" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.dWaveLat" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1" class="my-n5" label="Weitere" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1Amp" class="my-n5" suffix="mV" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1Lat" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2" class="my-n5" label="Weitere" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2Amp" class="my-n5" suffix="mV" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2Lat" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="primary"  @click="dialogExtras = false">Schliessen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- dialog for closing  -->
         <v-dialog v-model="dialogClosing" persistent max-width="1000px">
                <v-card>
          <v-card-title>
            <span class="headline">Closing:</span>
          </v-card-title>
          <v-card-text>
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>Closing SSEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container> 
              <v-row>
                <v-col cols="12" sm="6" md="2">
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>N</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>P</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>Amplitude</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsMedianusLN" :disabled="true" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsMedianusLP" :disabled="true" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusLAmp" :disabled="true" class="my-n5" suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsMedianusRN" :disabled="true" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsMedianusRP" :disabled="true" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusRAmp" :disabled="true" class="my-n5" suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsTibialisLN" :disabled="true" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsTibialisLP" :disabled="true" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisLAmp" :disabled="true" class="my-n5" suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsTibialisRN" :disabled="true" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsTibialisRP" :disabled="true" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisRAmp" :disabled="true" class="my-n5" suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Closing TES MEPs</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row>
                <v-col cols="12" sm="6" md="3">
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <label>Seite</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C1/C2</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C3/C4</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C3/Cz</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C4/Cz</label>
                </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel1" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 1"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel1Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>
              
               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel2" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 2"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
               </v-row> 

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel3" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 3"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel3Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel4" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 4"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel4Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel5" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 5"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel5Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel6" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 6"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel6Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel7" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 7"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel7Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel8" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 8"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel8Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel9" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 9"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel9Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel10" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 10"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel10Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.mepChannel11" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 11"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.mepChannel11Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel12" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 12"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel12Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel13" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 13"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel13Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel14" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 14"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel14Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel15" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 15"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel15Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel16" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 16"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel16Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

            </v-container>
            </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>Closing DCS MEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container>
                <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-label></v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>Seite</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#1</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#2</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#3</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#4</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Masseter</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.masseterSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter2"  :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter3"  :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter4"  :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Orb oris</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.orisSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Deltoideus</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.deltoideusSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Biceps</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.bicepsSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Extensor</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.extensorSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.thenarSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  v-model="closing.thenar2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.tibSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Abd hall</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.abdSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader  class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.thenar2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar21" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar22" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar23" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar24" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2" >
                  <v-subheader  class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.tib2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib21" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib22" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib23" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib24" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>Closing AEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-label></v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>I</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>II</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>III</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>IV</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>V</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLI" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLII" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLIII" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLIV" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field  v-model="closing.aepLV" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRI" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRII" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRIII" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRIV" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRV" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>Closing VEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
                            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >VEP</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.vepL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.vepR" class="my-n5" :disabled="true" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>Reflexe</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >BR</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.brL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.brR" class="my-n5" :disabled="true" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >LAR</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.larL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.larR" class="my-n5" :disabled="true" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >BCR</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.bcrL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.bcrR" class="my-n5" :disabled="true" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
               <v-textarea class="mb-n10" v-model="closing.bcrComment"
                  outlined
                  name="Bemerkungen"
                 label="Bemerkungen"
                  ></v-textarea>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="primary"  @click="dialogClosing = false">Schliessen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  

<!--     dialog for interpretation
         <v-dialog v-model="dialogInterpret" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Interpretation:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                  <v-textarea  v-model="interp" :outlined="true" :auto-grow="true" ></v-textarea>
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success" @click="dialogInterpret = false">Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogInterpret = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->


      <!-- dialog for fileupload -->
         <v-dialog v-model="dialogUpload" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">EDF-Datei hochladen:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                  <v-file-input v-model="file" show-size label="Datei auswählen" ></v-file-input>
              </v-row>
              <v-row>
               
       <v-btn color="indigo accent-4" text @click="openFile()"> Anzeigen / Herunterladen</v-btn>
       
              </v-row>
              
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success" @click="saveFile()">Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogUpload = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
</v-container>


</v-layout>
</template>



<script>
import axios from 'axios';
import moment from 'moment';
import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;






export default {
//initialize variables
  data: () => ({
dialogEval: false,
dialogInterpret: false,
dialogUpload: false,
dialogBaselines: false,
dialogExtras: false,
dialogClosing: false,
file: null,

interp: {

  text: '',
  text2: '',
  histopatho: '',
  deficitsDay: '',
  deficitsWeek: '',
  deficitsMonth: '',
  CNDay: '',
  MCRSDay: '',
  CNWeek: '',
  MCRSWeek: '',
  CNMonth: '',
  MCRSMonth: '',
},
    
    casenr: 0,
    pid: '',
    fid: '',
    name: '',
    surname: '',
    birthdate: null,
    formBirthdate: '',
    formOpdate: '',
    diagnose: '',
    operation: '',
    isismodality: '',
    opdate: null,
    surgeon: '',
    assistant: '',
    entries: [],
    evaluation: {},

  timestamps: [],

study: '',

 baselines: {

    ssepsMedianusLN:'',
    ssepsMedianusLP:'',
    ssepsMedianusLAmp:'',

    ssepsMedianusRN:'',
    ssepsMedianusRP:'',
    ssepsMedianusRAmp:'',

    ssepsTibialisLN:'',
    ssepsTibialisLP:'',
    ssepsTibialisLAmp:'',

    ssepsTibialisRN:'',
    ssepsTibialisRP:'',
    ssepsTibialisRAmp:'',

        mepChannel1:'',
    mepChannel1Side:'',
    mepChannel1C1C2:'',
    mepChannel1C3C4:'',
    mepChannel1C3CZ:'',
    mepChannel1C4CZ:'',

        mepChannel2:'',
    mepChannel2Side:'',
    mepChannel2C1C2:'',
    mepChannel2C3C4:'',
    mepChannel2C3CZ:'',
    mepChannel2C4CZ:'',

        mepChannel3:'',
    mepChannel3Side:'',
    mepChannel3C1C2:'',
    mepChannel3C3C4:'',
    mepChannel3C3CZ:'',
    mepChannel3C4CZ:'',

        mepChannel4:'',
    mepChannel4Side:'',
    mepChannel4C1C2:'',
    mepChannel4C3C4:'',
    mepChannel4C3CZ:'',
    mepChannel4C4CZ:'',

        mepChannel5:'',
    mepChannel5Side:'',
    mepChannel5C1C2:'',
    mepChannel5C3C4:'',
    mepChannel5C3CZ:'',
    mepChannel5C4CZ:'',

        mepChannel6:'',
    mepChannel6Side:'',
    mepChannel6C1C2:'',
    mepChannel6C3C4:'',
    mepChannel6C3CZ:'',
    mepChannel6C4CZ:'',

        mepChannel7:'',
    mepChannel7Side:'',
    mepChannel7C1C2:'',
    mepChannel7C3C4:'',
    mepChannel7C3CZ:'',
    mepChannel7C4CZ:'',

        mepChannel8:'',
    mepChannel8Side:'',
    mepChannel8C1C2:'',
    mepChannel8C3C4:'',
    mepChannel8C3CZ:'',
    mepChannel8C4CZ:'',

        mepChannel9:'',
    mepChannel9Side:'',
    mepChannel9C1C2:'',
    mepChannel9C3C4:'',
    mepChannel9C3CZ:'',
    mepChannel9C4CZ:'',

        mepChannel10:'',
    mepChannel10Side:'',
    mepChannel10C1C2:'',
    mepChannel10C3C4:'',
    mepChannel10C3CZ:'',
    mepChannel10C4CZ:'',

        mepChannel11:'',
    mepChannel11Side:'',
    mepChannel11C1C2:'',
    mepChannel11C3C4:'',
    mepChannel11C3CZ:'',
    mepChannel11C4CZ:'',

        mepChannel12:'',
    mepChannel12Side:'',
    mepChannel12C1C2:'',
    mepChannel12C3C4:'',
    mepChannel12C3CZ:'',
    mepChannel12C4CZ:'',

        mepChannel13:'',
    mepChannel13Side:'',
    mepChannel13C1C2:'',
    mepChannel13C3C4:'',
    mepChannel13C3CZ:'',
    mepChannel13C4CZ:'',

        mepChannel14:'',
    mepChannel14Side:'',
    mepChannel14C1C2:'',
    mepChannel14C3C4:'',
    mepChannel14C3CZ:'',
    mepChannel14C4CZ:'',

        mepChannel15:'',
    mepChannel15Side:'',
    mepChannel15C1C2:'',
    mepChannel15C3C4:'',
    mepChannel15C3CZ:'',
    mepChannel15C4CZ:'',

        mepChannel16:'',
    mepChannel16Side:'',
    mepChannel16C1C2:'',
    mepChannel16C3C4:'',
    mepChannel16C3CZ:'',
    mepChannel16C4CZ:'',

    masseterSide:'',
    masseter1:'',
    masseter2:'',
    masseter3:'',
    masseter4:'',

    orisSide:'',
    oris1:'',
    oris2:'',
    oris3:'',
    oris4:'',

    deltoideusSide:'',
    deltoideus1:'',
    deltoideus2:'',
    deltoideus3:'',
    deltoideus4:'',

    bicepsSide:'',
    biceps1:'',
    biceps2:'',
    biceps3:'',
    biceps4:'',

    extensorSide:'',
    extensor1:'',
    extensor2:'',
    extensor3:'',
    extensor4:'',

    thenarSide:'',
    thenar1:'',
    thenar2:'',
    thenar3:'',
    thenar4:'',

    tibSide:'',
    tib1:'',
    tib2:'',
    tib3:'',
    tib4:'',

    abdSide:'',
    abd1:'',
    abd2:'',
    abd3:'',
    abd4:'',
    
    thenar2Side:'',
    thenar21:'',
    thenar22:'',
    thenar23:'',
    thenar24:'',

    tib2Side:'',
    tib21:'',
    tib22:'',
    tib23:'',
    tib24:'',

    aepLI:'',
    aepLII:'',
    aepLIII:'',
    aepLIV:'',
    aepLV:'',
    
    aepRI:'',
    aepRII:'',
    aepRIII:'',
    aepRIV:'',
    aepRV:'',

    vepL:'',
    vepR:'',

    brR:'',
    brL:'',
    larL:'',
    larR:'',
    bcrL:'',
    bcrR:'',
    bcrComment: '',

  },

  closing: {

    ssepsMedianusLN:'',
    ssepsMedianusLP:'',
    ssepsMedianusLAmp:'',

    ssepsMedianusRN:'',
    ssepsMedianusRP:'',
    ssepsMedianusRAmp:'',

    ssepsTibialisLN:'',
    ssepsTibialisLP:'',
    ssepsTibialisLAmp:'',

    ssepsTibialisRN:'',
    ssepsTibialisRP:'',
    ssepsTibialisRAmp:'',

        mepChannel1:'',
    mepChannel1Side:'',
    mepChannel1C1C2:'',
    mepChannel1C3C4:'',
    mepChannel1C3CZ:'',
    mepChannel1C4CZ:'',

        mepChannel2:'',
    mepChannel2Side:'',
    mepChannel2C1C2:'',
    mepChannel2C3C4:'',
    mepChannel2C3CZ:'',
    mepChannel2C4CZ:'',

        mepChannel3:'',
    mepChannel3Side:'',
    mepChannel3C1C2:'',
    mepChannel3C3C4:'',
    mepChannel3C3CZ:'',
    mepChannel3C4CZ:'',

        mepChannel4:'',
    mepChannel4Side:'',
    mepChannel4C1C2:'',
    mepChannel4C3C4:'',
    mepChannel4C3CZ:'',
    mepChannel4C4CZ:'',

        mepChannel5:'',
    mepChannel5Side:'',
    mepChannel5C1C2:'',
    mepChannel5C3C4:'',
    mepChannel5C3CZ:'',
    mepChannel5C4CZ:'',

        mepChannel6:'',
    mepChannel6Side:'',
    mepChannel6C1C2:'',
    mepChannel6C3C4:'',
    mepChannel6C3CZ:'',
    mepChannel6C4CZ:'',

        mepChannel7:'',
    mepChannel7Side:'',
    mepChannel7C1C2:'',
    mepChannel7C3C4:'',
    mepChannel7C3CZ:'',
    mepChannel7C4CZ:'',

        mepChannel8:'',
    mepChannel8Side:'',
    mepChannel8C1C2:'',
    mepChannel8C3C4:'',
    mepChannel8C3CZ:'',
    mepChannel8C4CZ:'',

        mepChannel9:'',
    mepChannel9Side:'',
    mepChannel9C1C2:'',
    mepChannel9C3C4:'',
    mepChannel9C3CZ:'',
    mepChannel9C4CZ:'',

        mepChannel10:'',
    mepChannel10Side:'',
    mepChannel10C1C2:'',
    mepChannel10C3C4:'',
    mepChannel10C3CZ:'',
    mepChannel10C4CZ:'',

        mepChannel11:'',
    mepChannel11Side:'',
    mepChannel11C1C2:'',
    mepChannel11C3C4:'',
    mepChannel11C3CZ:'',
    mepChannel11C4CZ:'',

        mepChannel12:'',
    mepChannel12Side:'',
    mepChannel12C1C2:'',
    mepChannel12C3C4:'',
    mepChannel12C3CZ:'',
    mepChannel12C4CZ:'',

        mepChannel13:'',
    mepChannel13Side:'',
    mepChannel13C1C2:'',
    mepChannel13C3C4:'',
    mepChannel13C3CZ:'',
    mepChannel13C4CZ:'',

        mepChannel14:'',
    mepChannel14Side:'',
    mepChannel14C1C2:'',
    mepChannel14C3C4:'',
    mepChannel14C3CZ:'',
    mepChannel14C4CZ:'',

        mepChannel15:'',
    mepChannel15Side:'',
    mepChannel15C1C2:'',
    mepChannel15C3C4:'',
    mepChannel15C3CZ:'',
    mepChannel15C4CZ:'',

        mepChannel16:'',
    mepChannel16Side:'',
    mepChannel16C1C2:'',
    mepChannel16C3C4:'',
    mepChannel16C3CZ:'',
    mepChannel16C4CZ:'',

    masseterSide:'',
    masseter1:'',
    masseter2:'',
    masseter3:'',
    masseter4:'',

    orisSide:'',
    oris1:'',
    oris2:'',
    oris3:'',
    oris4:'',

    deltoideusSide:'',
    deltoideus1:'',
    deltoideus2:'',
    deltoideus3:'',
    deltoideus4:'',

    bicepsSide:'',
    biceps1:'',
    biceps2:'',
    biceps3:'',
    biceps4:'',

    extensorSide:'',
    extensor1:'',
    extensor2:'',
    extensor3:'',
    extensor4:'',

    thenarSide:'',
    thenar1:'',
    thenar2:'',
    thenar3:'',
    thenar4:'',

    tibSide:'',
    tib1:'',
    tib2:'',
    tib3:'',
    tib4:'',

    abdSide:'',
    abd1:'',
    abd2:'',
    abd3:'',
    abd4:'',
    
    thenar2Side:'',
    thenar21:'',
    thenar22:'',
    thenar23:'',
    thenar24:'',

    tib2Side:'',
    tib21:'',
    tib22:'',
    tib23:'',
    tib24:'',

    aepLI:'',
    aepLII:'',
    aepLIII:'',
    aepLIV:'',
    aepLV:'',
    
    aepRI:'',
    aepRII:'',
    aepRIII:'',
    aepRIV:'',
    aepRV:'',

    vepL:'',
    vepR:'',

    brR:'',
    brL:'',
    larL:'',
    larR:'',
    bcrL:'',
    bcrR:'',
    bcrComment: '',

  },
  
    extras: {

    dWaveAmp: '',
    dWaveLat: '',
    additional1: '',
    additional1Amp: '',
    additional1Lat: '',
    additional2: '',
    additional2Amp: '',
    additional2Lat: '',

  },


     /* values for evaluation*/
    age: ['Kind','Erwachsener'],
    sex: ['Weiblich','Männlich'],
    local: ['supratentorielle RF','infratentorielle RF','spinal','Gefässe',''],
    detail: ['frontal','zentral','parietal','occipital','temporal','cerebellär','KHBW','HWK','BWK','LWK','SWK','Hypophyse','Hirnstamm',''],
    patho: ['intracerebral','extradural','intradural','intramedullär','vaskulär','Blutungen',''],
    op: ['Resektion','Clipping','Stabilisation','Dekompression','Biopsie','direkte Stimulation','Verschluss',''],
    anaest: ['TIVA','TIVA plus','Wach-OP',''],
    optechnik: ['Wach-OP', 'SCS', 'DBS', 'IB', ''],
    modalities: ['SSEPs ', 'TES-MEPs ', 'DCS-MEPs ', 'AEPs ', 'VEPs ', 'CCEPs ', 'EMG ', 'ECOG ', 'D-Welle '],
    mapping:['Dynamischer Sauger ', 'DNS ', 'Penfield '],
    reflexes:['BR ', 'LAR ', 'BCR '],

    /* values for interpretation*/
    deficits:['Motorisch ', 'Sensibel ', 'Visuell ', 'Hirnnerven '],

 /* values for the baselines and for the closing */
    items: ['vorhanden', 'mässig', 'schlecht', ''],
    sides: ['L', 'R', ''],
    muscles: ['Occulomotor', 'Trochlearis', 'Masseter', 'Abduzens', 'Orb occ', 'Labialis', 'Orb oris', 'Mentalis', 'Glosso', 'Vagus', 'Accessorius', 'Hypoglosso', 'Deltoideus', 'Biceps', 'Triceps', 'Extensor', 'Thenar', 'Hypothenar', 'Aductor', 'Ileopsoas', 'Quadri', 'Tib ant', 'Gastro', 'Abd hall', ''],
    eventchanges: ['normal', 'bedeutende Veränderungen', 'Verlust'],

  }),

  // store case id from the routerlink to a local variable on page load
  created() {
    this.casenr = this.$route.params.casenr;
   
  },

  // fetches all case data on load 
  mounted() {
    this.fetchProtocol(this.casenr);
  },

  methods: {

  // fetch a single protocol from the database
    async  fetchProtocol(casenr) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          
        },
        url: `http://localhost:8081/protocols/${casenr}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          this.pid = response.data.protocols.pid;
          this.fid = response.data.protocols.fid;
          this.name = response.data.protocols.name;
          this.surname = response.data.protocols.surname;
          this.birthdate = response.data.protocols.birthdate;
          this.diagnose = response.data.protocols.diagnose;
          this.operation = response.data.protocols.operation;
          this.isismodality = response.data.protocols.isismodality;
          this.opdate =  response.data.protocols.opdate;
          this.surgeon = response.data.protocols.surgeon;
          this.assistant = response.data.protocols.assistant;
          this.entries = response.data.protocols.entries;
          this.evaluation = response.data.protocols.evaluation;
          this.baselines = response.data.protocols.baselines;
          this.extras = response.data.protocols.extras;   
          this.closing = response.data.protocols.closing;  
          this.formBirthdate = moment( response.data.protocols.birthdate).format("DD-MM-YYYY");
          this.formOpdate = moment( response.data.protocols.opdate).format("DD-MM-YYYY");   
         
        })
        .catch(() => { console.log('error'); });
    },


  // submit method to send the finished case to the db and delete the case from opencases
    submit() {
      
      if(this.file == null){
        this.file = {};
        this.file.name = 'nofile.pdf'
      };

        var self = this;
        const token = window.localStorage.getItem('auth');
        return axios({
          method: 'post',
          data: {
           
            casenr: this.casenr,
            pid: this.pid,
            fid: this.fid,
            name: this.name,
            surname: this.surname,
            birthdate: this.birthdate,
            diagnose: this.diagnose,
            operation: this.operation,
            isismodality: this.isismodality,
            opdate: this.opdate,
            surgeon: this.surgeon,
            assistant: this.assistant,
            entries: this.entries,
            evaluation: this.evaluation,
            baselines: this.baselines,
            extras: this.extras,
            closing: this.closing,
            interp: this.interp,
            file: this.file.name,
            
          },
          url: 'http://localhost:8081/completcase',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
          
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Fall wurde erfolgreich abgeschlossen!',
              'success',
            );
      
            this.$router.push({ name: 'Casesearch' });
            
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Der Fall konnte nicht abgeschlossen werden!',
              'error',
            );
          }); 
     
    },


//method to open the uploaded file in browser or to download it

openFile: function(){

  let reader = new FileReader()
  reader.readAsDataURL(this.file);

     reader.onloadend = (e) => {

                let anchor = document.createElement('a')
                anchor.setAttribute('class', 'q-attached-file', 'download')
                anchor.setAttribute('title', this.file.name)
                anchor.setAttribute('href', reader.result)
                anchor.innerText = this.file.name
               
                var win = window.open();
    win.document.write('<iframe src="' + anchor  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  
    }
  
},


// method to save file to server
saveFile: function(){
this.dialogUpload = false;
this.submitFile();
},

//Upload file to server
submitFile(){
  let formData = new FormData();
  formData.append('file', this.file);
const token = window.localStorage.getItem('auth');
  axios.post( 'http://localhost:8081/upload',
  formData,
  {
    headers: {
      Authorization: `JWT ${token}`,
        'Content-Type': 'multipart/form-data'
    }
  }
).then(resp =>{
  console.log('SUCCESS!!');
})
.catch(function(){
  console.log('FAILURE!!');
});

},

//generate PDF Export
createPDF() {

var sourceData = this.entries
var bodyData = [];

sourceData.forEach(function(sourceRow) {
  var dataRow = [];

  dataRow.push(sourceRow.ts);
  dataRow.push(sourceRow.entrycat.name);
  dataRow.push(sourceRow.event);
  dataRow.push(sourceRow.comment);
 
  bodyData.push(dataRow)
});


  //Documentstructure for export
	let documentDefinition = {

    pageMargins: [ 20, 70, 20, 20 ],
    pageSize: 'A4',

    header: [

 
        {
image: 'data:image/png;base64,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'        ,
       height: 25,
       width: 25,
        margin : [ 20,5,0,5 ],
        },

        {
           fontSize: 8,
           columns : [
               {
                   text : 'Universtitätsklinik für Neurochirurgie Inselspital, Kathleen Seidel', margin : [ 20,0,0,5 ], 
               }     
           ]

        },

        { 
            canvas: [
                { type: 'line', color:'#3F51B5', x1: 20, y1: 0, x2: 595-20, y2: 0, lineWidth: 0.5 }
            ] 

        },

    ],
  	content: 
    [
      { text: moment(new Date()).format('DD-MM-YYYY'), alignment: 'right' },
      { text: 'IOM Protokoll Fall Nr. ' + this.casenr, style: 'header' },

      { text: 'Patientenangaben', style: 'subheader' },
      
      { text: "Vorname: " + this.surname, style: 'plaintext'},
      { text: "Name: " + this.name, style: 'plaintext'},
      { text: "Geburtsdatum: " + this.formBirthdate, style: 'plaintext'},

      { text: 'Angaben zur Operation', style: 'subheader' },

      { text: "Diagnose: " + this.diagnose, style: 'plaintext'},
      { text: "Operation: " + this.operation, style: 'plaintext'},
      { text: "OP-Datum: " + this.formOpdate, style: 'plaintext'},

       
       { text: 'Protokolleinträge\n', style: 'subheader' },
        {  
        table: 
        {
            body: bodyData   	    
        }
        }, 
      
      { text: 'Interpretation', style: 'subheader'},
      { text: this.interp.histopatho},
      { text: this.interp.text},
      { text: 'Defizit: 1 Tag postoperativ: ' + this.interp.deficitsDay},
      { text: 'Defizit: 1 Woche postoperativ: ' + this.interp.deficitsWeek},
      { text: 'Defizit: 1 Monat postoperativ: ' + this.interp.deficitsMonth},

      { text: 'Auswertung Monitorist', style: 'subheader' },
      { text: '\nFallkodierung'},

      {
        table: 
        {
          body: [

            ['Alter: ' + this.evaluation.age, 'Lokalisation: ' + this.evaluation.local,'Pathologie: ' + this.evaluation.patho, 'Anästhesie: ' + this.evaluation.anaest],
            ['Geschlecht: ' + this.evaluation.sex, 'Detail: ' + this.evaluation.local, 'Operation: ' + this.evaluation.op,''],
          ]
        }
      
      },
      { text: '\n' },
      	{
     
			table: {
			
				body: [

          ['Modalitäten', {text: this.evaluation.modalities, style: 'value'}],
          ['Mapping', {text: this.evaluation.mapping, style: 'value'}],
          ['Tiefste Mapping-Schwelle:', {text: this.evaluation.mappingsw, style: 'value'}],
          ['Reflexe', {text: this.evaluation.reflexes, style: 'value'}],
          ['SSEPs:', {text: this.evaluation.sseps2, style:'value'}],
          ['TES-MEPs:', {text: this.evaluation.meps2, style: 'value'}],
          ['AEPs:', {text: this.evaluation.aeps2, style: 'value'}],
          ['VEPs:', {text: this.evaluation.veps2, style: 'value'}],
          ['DCS-MEPs:', {text: this.evaluation.gripdmeps2, style: 'value'}],
          ['OP-Technik:', {text: this.evaluation.optechnik, style: 'value'}],
          ['Studie:', {text: this.evaluation.study, style: 'value'}],
				
				]      
      },

     },
     { text: '\nBemerkungen: ' + this.evaluation.comment},

     { text: 'Baselines SSEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'N', style: 'tableHeader'}, {text:'P', style: 'tableHeader'}, {text:'Amplitude', style: 'tableHeader'}],
					['Medianus L', this.baselines.ssepsMedianusLN + ' ms', this.baselines.ssepsMedianusLP + ' ms', this.baselines.ssepsMedianusLAmp + ' uV',],
          ['Medianus R', this.baselines.ssepsMedianusRN + ' ms', this.baselines.ssepsMedianusRP + ' ms', this.baselines.ssepsMedianusRAmp + ' uV',],
          ['Tibialis L', this.baselines.ssepsTibialisLN + ' ms', this.baselines.ssepsTibialisLP + ' ms', this.baselines.ssepsTibialisLAmp + ' uV',],
          ['Tibialis R', this.baselines.ssepsTibialisRN + ' ms', this.baselines.ssepsTibialisRP + ' ms', this.baselines.ssepsTibialisRAmp + ' uV',],
      
				]
        
			},
        
		},

    { text: 'Baselines TES-MEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'Ableitung', style: 'tableHeader'}, {text:'Seite', style: 'tableHeader'}, {text:'C1/C2', style: 'tableHeader'}, {text:'C3/C4', style: 'tableHeader'}, {text:'C3/Cz', style: 'tableHeader'}, {text:'C4/Cz', style: 'tableHeader'}],
					[this.baselines.mepChannel1, this.baselines.mepChannel1Side , this.baselines.mepChannel1C1C2 + 'mA', this.baselines.mepChannel1C3C4 + 'mA',this.baselines.mepChannel1C3CZ +'mA',this.baselines.mepChannel1C4CZ +'mA',],
      		[this.baselines.mepChannel2, this.baselines.mepChannel2Side , this.baselines.mepChannel2C1C2 + 'mA', this.baselines.mepChannel2C3C4 + 'mA',this.baselines.mepChannel2C3CZ +'mA',this.baselines.mepChannel2C4CZ +'mA',],
          [this.baselines.mepChannel3, this.baselines.mepChannel3Side , this.baselines.mepChannel3C1C2 + 'mA', this.baselines.mepChannel3C3C4 + 'mA',this.baselines.mepChannel3C3CZ +'mA',this.baselines.mepChannel3C4CZ +'mA',],
				  [this.baselines.mepChannel4, this.baselines.mepChannel4Side , this.baselines.mepChannel4C1C2 + 'mA', this.baselines.mepChannel4C3C4 + 'mA',this.baselines.mepChannel4C3CZ +'mA',this.baselines.mepChannel4C4CZ +'mA',],
          [this.baselines.mepChannel5, this.baselines.mepChannel5Side , this.baselines.mepChannel5C1C2 + 'mA', this.baselines.mepChannel5C3C4 + 'mA',this.baselines.mepChannel5C3CZ +'mA',this.baselines.mepChannel5C4CZ +'mA',],
          [this.baselines.mepChannel6, this.baselines.mepChannel6Side , this.baselines.mepChannel6C1C2 + 'mA', this.baselines.mepChannel6C3C4 + 'mA',this.baselines.mepChannel6C3CZ +'mA',this.baselines.mepChannel6C4CZ +'mA',],
          [this.baselines.mepChannel7, this.baselines.mepChannel7Side , this.baselines.mepChannel7C1C2 + 'mA', this.baselines.mepChannel7C3C4 + 'mA',this.baselines.mepChannel7C3CZ +'mA',this.baselines.mepChannel7C4CZ +'mA',],
          [this.baselines.mepChannel8, this.baselines.mepChannel8Side , this.baselines.mepChannel8C1C2 + 'mA', this.baselines.mepChannel8C3C4 + 'mA',this.baselines.mepChannel8C3CZ +'mA',this.baselines.mepChannel8C4CZ +'mA',],
      		[this.baselines.mepChannel9, this.baselines.mepChannel9Side , this.baselines.mepChannel9C1C2 + 'mA', this.baselines.mepChannel9C3C4 + 'mA',this.baselines.mepChannel9C3CZ +'mA',this.baselines.mepChannel9C4CZ +'mA',],
      		[this.baselines.mepChannel10, this.baselines.mepChannel10Side , this.baselines.mepChannel10C1C2 + 'mA', this.baselines.mepChannel10C3C4 + 'mA',this.baselines.mepChannel10C3CZ +'mA',this.baselines.mepChannel10C4CZ +'mA',],
      		[this.baselines.mepChannel11, this.baselines.mepChannel11Side , this.baselines.mepChannel11C1C2 + 'mA', this.baselines.mepChannel11C3C4 + 'mA',this.baselines.mepChannel11C3CZ +'mA',this.baselines.mepChannel11C4CZ +'mA',],
      		[this.baselines.mepChannel12, this.baselines.mepChannel12Side , this.baselines.mepChannel12C1C2 + 'mA', this.baselines.mepChannel12C3C4 + 'mA',this.baselines.mepChannel12C3CZ +'mA',this.baselines.mepChannel12C4CZ +'mA',],
      		[this.baselines.mepChannel13, this.baselines.mepChannel13Side , this.baselines.mepChannel13C1C2 + 'mA', this.baselines.mepChannel13C3C4 + 'mA',this.baselines.mepChannel13C3CZ +'mA',this.baselines.mepChannel13C4CZ +'mA',],      
       		[this.baselines.mepChannel14, this.baselines.mepChannel14Side , this.baselines.mepChannel14C1C2 + 'mA', this.baselines.mepChannel14C3C4 + 'mA',this.baselines.mepChannel14C3CZ +'mA',this.baselines.mepChannel14C4CZ +'mA',],      
      		[this.baselines.mepChannel15, this.baselines.mepChannel15Side , this.baselines.mepChannel15C1C2 + 'mA', this.baselines.mepChannel15C3C4 + 'mA',this.baselines.mepChannel15C3CZ +'mA',this.baselines.mepChannel15C4CZ +'mA',],       
      		[this.baselines.mepChannel16, this.baselines.mepChannel16Side , this.baselines.mepChannel16C1C2 + 'mA', this.baselines.mepChannel16C3C4 + 'mA',this.baselines.mepChannel16C3CZ +'mA',this.baselines.mepChannel16C4CZ +'mA',],
        ]
        
			},
        
		},


     { text: 'Baselines DCS-MEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [

          [{text:'', style: 'tableHeader'}, {text:'Seite', style: 'tableHeader'}, {text:'#1', style: 'tableHeader'}, {text:'#2', style: 'tableHeader'}, {text:'#3', style: 'tableHeader'}, {text:'#4', style: 'tableHeader'}],
					['Masseter' , this.baselines.masseterSide , this.baselines.masseter1, this.baselines.masseter2, this.baselines.masseter3, this.baselines.masseter4,],
					['Orb oris' , this.baselines.orisSide , this.baselines.oris1, this.baselines.oris2, this.baselines.oris3, this.baselines.oris4,],
          ['Deltoideus' , this.baselines.deltoideusSide , this.baselines.deltoideus1, this.baselines.deltoideus2, this.baselines.deltoideus3, this.baselines.deltoideus4,],
          ['Biceps' , this.baselines.bicepsSide , this.baselines.biceps1, this.baselines.biceps2, this.baselines.biceps3, this.baselines.biceps4,],
          ['Extensor' , this.baselines.extensorSide , this.baselines.extensor1, this.baselines.extensor2, this.baselines.extensor3, this.baselines.extensor4,],
          ['Thenar' , this.baselines.thenarSide , this.baselines.thenar1, this.baselines.thenar2, this.baselines.thenar3, this.baselines.thenar4,],
          ['Tib ant' , this.baselines.tibSide , this.baselines.tib1, this.baselines.tib2, this.baselines.tib3, this.baselines.tib4,],
          ['Abd hall' , this.baselines.abdSide , this.baselines.abd1, this.baselines.abd2, this.baselines.abd3, this.baselines.abd4,],
          ['Thenar' , this.baselines.thenar2Side , this.baselines.thenar21, this.baselines.thenar22, this.baselines.thenar23, this.baselines.thenar24,],
          ['Tib ant' , this.baselines.tib2Side , this.baselines.tib21, this.baselines.tib22, this.baselines.tib23, this.baselines.tib24,],

      	
        ],
        
        
			},
        
		},

     { text: 'Baselines AEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'I', style: 'tableHeader'}, {text:'II', style: 'tableHeader'}, {text:'III', style: 'tableHeader'}, {text:'IV', style: 'tableHeader'}, {text:'V', style: 'tableHeader'}],
					['AEP L' , this.baselines.aepLI +'ms', this.baselines.aepLII +'ms', this.baselines.aepLIII +'ms', this.baselines.aepLIV +'ms', this.baselines.aepLV +'ms'],
          ['AEP R' , this.baselines.aepRI +'ms', this.baselines.aepRII +'ms', this.baselines.aepRIII +'ms', this.baselines.aepRIV +'ms', this.baselines.aepRV +'ms'],

        ],

			},
        
		},

     { text: 'Baselines VEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'Links', style: 'tableHeader'}, {text:'Rechts', style: 'tableHeader'}],
					['VEP' , this.baselines.vepL, this.baselines.vepR, ],
          

        ],

			},
        
		},

        { text: 'Baselines: Reflexe', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'Reflex', style: 'tableHeader'}, {text:'Links', style: 'tableHeader'}, {text:'Rechts', style: 'tableHeader'}],
					['BR' , this.baselines.brL, this.baselines.brR, ],
          ['LAR' , this.baselines.larL, this.baselines.larR, ],
          ['BCR' , this.baselines.bcrL, this.baselines.bcrR, ],
          

        ],

			},
        
    },
    
    { text: 'Extras', style: 'subheader'},

    {

      table: {

        body: [

          [{text:'', style: 'tableHeader'}, {text:'Amplitude', style: 'tableHeader'}, {text:'Latenz', style: 'tableHeader'}],
          ['D-Wave:', this.extras.dWaveAmp + 'mA', this.extras.dWaveLat + 'ms'],
          [this.extras.additional1, this.extras.additional1Amp, this.extras.additional1Lat],
          [this.extras.additional2, this.extras.additional2Amp, this.extras.additional2Lat], 

        ],
      },
    },

     { text: 'Closing SSEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'N', style: 'tableHeader'}, {text:'P', style: 'tableHeader'}, {text:'Amplitude', style: 'tableHeader'}],
					['Medianus L', this.closing.ssepsMedianusLN, this.closing.ssepsMedianusLP, this.closing.ssepsMedianusLAmp + 'mA',],
          ['Medianus R', this.closing.ssepsMedianusRN, this.closing.ssepsMedianusRP, this.closing.ssepsMedianusRAmp + 'mA',],
          ['Tibialis L', this.closing.ssepsTibialisLN, this.closing.ssepsTibialisLP, this.closing.ssepsTibialisLAmp + 'mA',],
          ['Tibialis R', this.closing.ssepsTibialisRN, this.closing.ssepsTibialisRP, this.closing.ssepsTibialisRAmp + 'mA',],
      
				]
        
			},
        
		},

    { text: 'Closing TES-MEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'Ableitung', style: 'tableHeader'}, {text:'Seite', style: 'tableHeader'}, {text:'C1/C2', style: 'tableHeader'}, {text:'C3/C4', style: 'tableHeader'}, {text:'C3/Cz', style: 'tableHeader'}, {text:'C4/Cz', style: 'tableHeader'}],
					[this.closing.mepChannel1, this.closing.mepChannel1Side , this.closing.mepChannel1C1C2 + 'mA', this.closing.mepChannel1C3C4 + 'mA',this.closing.mepChannel1C3CZ +'mA',this.closing.mepChannel1C4CZ +'mA',],
      		[this.closing.mepChannel2, this.closing.mepChannel2Side , this.closing.mepChannel2C1C2 + 'mA', this.closing.mepChannel2C3C4 + 'mA',this.closing.mepChannel2C3CZ +'mA',this.closing.mepChannel2C4CZ +'mA',],
          [this.closing.mepChannel3, this.closing.mepChannel3Side , this.closing.mepChannel3C1C2 + 'mA', this.closing.mepChannel3C3C4 + 'mA',this.closing.mepChannel3C3CZ +'mA',this.closing.mepChannel3C4CZ +'mA',],
				  [this.closing.mepChannel4, this.closing.mepChannel4Side , this.closing.mepChannel4C1C2 + 'mA', this.closing.mepChannel4C3C4 + 'mA',this.closing.mepChannel4C3CZ +'mA',this.closing.mepChannel4C4CZ +'mA',],
          [this.closing.mepChannel5, this.closing.mepChannel5Side , this.closing.mepChannel5C1C2 + 'mA', this.closing.mepChannel5C3C4 + 'mA',this.closing.mepChannel5C3CZ +'mA',this.closing.mepChannel5C4CZ +'mA',],
          [this.closing.mepChannel6, this.closing.mepChannel6Side , this.closing.mepChannel6C1C2 + 'mA', this.closing.mepChannel6C3C4 + 'mA',this.closing.mepChannel6C3CZ +'mA',this.closing.mepChannel6C4CZ +'mA',],
          [this.closing.mepChannel7, this.closing.mepChannel7Side , this.closing.mepChannel7C1C2 + 'mA', this.closing.mepChannel7C3C4 + 'mA',this.closing.mepChannel7C3CZ +'mA',this.closing.mepChannel7C4CZ +'mA',],
          [this.closing.mepChannel8, this.closing.mepChannel8Side , this.closing.mepChannel8C1C2 + 'mA', this.closing.mepChannel8C3C4 + 'mA',this.closing.mepChannel8C3CZ +'mA',this.closing.mepChannel8C4CZ +'mA',],
      		[this.closing.mepChannel9, this.closing.mepChannel9Side , this.closing.mepChannel9C1C2 + 'mA', this.closing.mepChannel9C3C4 + 'mA',this.closing.mepChannel9C3CZ +'mA',this.closing.mepChannel9C4CZ +'mA',],
      		[this.closing.mepChannel10, this.closing.mepChannel10Side , this.closing.mepChannel10C1C2 + 'mA', this.closing.mepChannel10C3C4 + 'mA',this.closing.mepChannel10C3CZ +'mA',this.closing.mepChannel10C4CZ +'mA',],
      		[this.closing.mepChannel11, this.closing.mepChannel11Side , this.closing.mepChannel11C1C2 + 'mA', this.closing.mepChannel11C3C4 + 'mA',this.closing.mepChannel11C3CZ +'mA',this.closing.mepChannel11C4CZ +'mA',],
      		[this.closing.mepChannel12, this.closing.mepChannel12Side , this.closing.mepChannel12C1C2 + 'mA', this.closing.mepChannel12C3C4 + 'mA',this.closing.mepChannel12C3CZ +'mA',this.closing.mepChannel12C4CZ +'mA',],
      		[this.closing.mepChannel13, this.closing.mepChannel13Side , this.closing.mepChannel13C1C2 + 'mA', this.closing.mepChannel13C3C4 + 'mA',this.closing.mepChannel13C3CZ +'mA',this.closing.mepChannel13C4CZ +'mA',],      
       		[this.closing.mepChannel14, this.closing.mepChannel14Side , this.closing.mepChannel14C1C2 + 'mA', this.closing.mepChannel14C3C4 + 'mA',this.closing.mepChannel14C3CZ +'mA',this.closing.mepChannel14C4CZ +'mA',],      
      		[this.closing.mepChannel15, this.closing.mepChannel15Side , this.closing.mepChannel15C1C2 + 'mA', this.closing.mepChannel15C3C4 + 'mA',this.closing.mepChannel15C3CZ +'mA',this.closing.mepChannel15C4CZ +'mA',],       
      		[this.closing.mepChannel16, this.closing.mepChannel16Side , this.closing.mepChannel16C1C2 + 'mA', this.closing.mepChannel16C3C4 + 'mA',this.closing.mepChannel16C3CZ +'mA',this.closing.mepChannel16C4CZ +'mA',],
        ]
        
			},
        
		},


     { text: 'Closing DCS-MEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [

          [{text:'', style: 'tableHeader'}, {text:'Seite', style: 'tableHeader'}, {text:'#1', style: 'tableHeader'}, {text:'#2', style: 'tableHeader'}, {text:'#3', style: 'tableHeader'}, {text:'#4', style: 'tableHeader'}],
					['Masseter' , this.closing.masseterSide , this.closing.masseter1, this.closing.masseter2, this.closing.masseter3, this.closing.masseter4,],
					['Orb oris' , this.closing.orisSide , this.closing.oris1, this.closing.oris2, this.closing.oris3, this.closing.oris4,],
          ['Deltoideus' , this.closing.deltoideusSide , this.closing.deltoideus1, this.closing.deltoideus2, this.closing.deltoideus3, this.closing.deltoideus4,],
          ['Biceps' , this.closing.bicepsSide , this.closing.biceps1, this.closing.biceps2, this.closing.biceps3, this.closing.biceps4,],
          ['Extensor' , this.closing.extensorSide , this.closing.extensor1, this.closing.extensor2, this.closing.extensor3, this.closing.extensor4,],
          ['Thenar' , this.closing.thenarSide , this.closing.thenar1, this.closing.thenar2, this.closing.thenar3, this.closing.thenar4,],
          ['Tib ant' , this.closing.tibSide , this.closing.tib1, this.closing.tib2, this.closing.tib3, this.closing.tib4,],
          ['Abd hall' , this.closing.abdSide , this.closing.abd1, this.closing.abd2, this.closing.abd3, this.closing.abd4,],
          ['Thenar' , this.closing.thenar2Side , this.closing.thenar21, this.closing.thenar22, this.closing.thenar23, this.closing.thenar24,],
          ['Tib ant' , this.closing.tib2Side , this.closing.tib21, this.closing.tib22, this.closing.tib23, this.closing.tib24,],

      	
        ],
        
        
			},
        
		},

     { text: 'Closing AEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'I', style: 'tableHeader'}, {text:'II', style: 'tableHeader'}, {text:'III', style: 'tableHeader'}, {text:'IV', style: 'tableHeader'}, {text:'V', style: 'tableHeader'}],
					['AEP L' , this.closing.aepLI +'ms', this.closing.aepLII +'ms', this.closing.aepLIII +'ms', this.closing.aepLIV +'ms', this.closing.aepLV +'ms'],
          ['AEP R' , this.closing.aepRI +'ms', this.closing.aepRII +'ms', this.closing.aepRIII +'ms', this.closing.aepRIV +'ms', this.closing.aepRV +'ms'],

        ],

			},
        
		},

     { text: 'Closing VEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'Links', style: 'tableHeader'}, {text:'Rechts', style: 'tableHeader'}],
					['VEP' , this.closing.vepL, this.closing.vepR, ],
          

        ],

			},
        
		},

        { text: 'Closing: Reflexe', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'Reflex', style: 'tableHeader'}, {text:'Links', style: 'tableHeader'}, {text:'Rechts', style: 'tableHeader'}],
					['BR' , this.closing.brL, this.closing.brR, ],
          ['LAR' , this.closing.larL, this.closing.larR, ],
          ['BCR' , this.closing.bcrL, this.closing.bcrR, ],
          

        ],

			},
        
    }, 
 

   

  	],
    styles: 
    {
    	header: 
      {
				fontSize: 18,
				bold: true,
        margin: [0, 10, 0, 0],
        alignment: 'center',
        color: '#3F51B5'
			},
      	subheader: 
      {
				fontSize: 14,
        bold: true,
        margin: [0, 15, 0, 0],
        
			},
      	plaintext: 
      {
				fontSize: 12,
				bold: false,
        
			},

    	tableHeader: 
      {
      	fillColor: '#3F51B5',
    		color: 'white'
        
      },

      value: {
        color: '#3F51B5'
      },


    }
  };
  
  pdfmake.createPdf(documentDefinition).download('IOM-Fall Nr. ' + this.casenr +'.pdf');
}






 
 
  },
};
</script>

