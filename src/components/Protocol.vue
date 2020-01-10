<template>
<v-layout  >
    <v-container  >
  <v-layout row>
    <v-flex md2 >
    <!-- Card with patient and op data -->
        <v-card
      class="mx-auto"
      max-width="175" 
      style="position: fixed;"
    >
    <v-card-title>Patientendaten</v-card-title>
      <v-card-text class="text-left">
     {{name}}, {{surname}}</br> {{formBirthdate}}
     <v-divider></v-divider>
     </v-card-text>
     <v-card-title>Operation</v-card-title>
     <v-card-text class="text-left">
      Diagnose: {{diagnose}}</br>
      Operation: {{operation}} </br>
      Datum: {{formOpdate}}
      <v-divider></v-divider>
       </v-card-text>
      
      <v-card-text class="text-center">
       <v-btn  class="my-n3" width="140px"  color="primary"  @click="dialogBaselines = true" >Baselines</v-btn>
      </v-card-text>
      <v-card-text class="text-center">
       <v-btn   class="my-n3" width="140px" color="primary"  @click="dialogExtras = true" >Extras</v-btn>
      </v-card-text>
      <v-card-text class="text-center">
       <v-btn  class="my-n3" width="140px"  color="primary"  @click="dialogClosing = true" >Closing</v-btn>
      </v-card-text>
    </v-card>
    </v-flex>

    <!-- protocol entries -->
    <v-flex md10 >
     <p class=".font-weight-medium">Fall-Nr. {{casenr}} - IOM {{status}} </br></p>
      <v-layout row>
        <v-flex md2><b><p>Uhrzeit</p></b></v-flex>
        <v-flex md2><b>Kategorie</b></v-flex>
        <v-flex md1></v-flex>
        <v-flex md2><b>Eintrag</b></v-flex>
        <v-flex md1></v-flex>
        <v-flex md3><b>Bemerkung</b></v-flex>
        <v-flex md1><b>Aktionen</b></v-flex>
      </v-layout >  </br>  
   
      <form >
      <div v-for="(entry, index) in entries" :class="{active:entry.selected}" @dblclick="$set(entry, 'selected', !entry.selected)" @contextmenu="">
        <v-layout row >
          
        <v-flex md2 ><v-text-field style="margin-left: 2.3em;" v-model="entry.ts" name="entries[][ts]"  :solo="true" :flat="true" background-color="transparent">{{entry.ts}}</v-text-field></v-flex>
       
        <v-flex md2>
             <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">                         <v-select label="Kategorie"  v-model="entry.entrycat"  :items="dbcategories" item-text="name" item-value="entry.entrycat.name"   return-object name="entrycat"></v-select>

</span>
        </template>
        <span>{{entry.entrycat.name}}</span>
      </v-tooltip>
        </v-flex>
        
        <v-flex md1></v-flex>
        <v-flex md2>
           <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">              <v-select label="Event"  v-model="entry.event" :items="entry.entrycat.options" item-text="options"  :value="entry.event"  return-object  name="entries[][event]" >{{entry.event}}</v-select>
</span>
        </template>
        <span>{{entry.event}}</span>
      </v-tooltip>
        </v-flex>
        <v-flex md1></v-flex>
        <v-flex md3> <v-textarea label="Bemerkung" v-model="entry.comment"  name="entries[][comment]" :auto-grow="true" :dense="true" :clearable="true" :rows="2"></v-textarea></v-flex>
        <v-flex md1>
          <v-icon @click="removeEntry(index)" >
          delete
        </v-icon>
         <v-icon @click="addNewEntry()">
          add
        </v-icon>
        </v-flex>
        
      </v-layout > 

     
     
         <v-divider></v-divider>
      </div>
      <v-layout row>
        <v-flex md10><b></b></v-flex>
        <v-flex md2> <v-btn depressed  large color="success" @click.stop="dialogFinish = true">IOM beenden</v-btn>

<!-- dialog for baselines  -->
         <v-dialog v-model="dialogBaselines" persistent max-width="1000px">
                <v-card>
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
                <v-col cols="12" sm="6" md="2">
                  <v-label>N</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
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
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusLN" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusLP" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusLAmp" class="my-n5" suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusRN" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusRP" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusRAmp" class="my-n5" suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisLN" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisLP" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisLAmp" class="my-n5"suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisRN" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisRP" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisRAmp" class="my-n5" suffix="uV" ></v-text-field>
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
                  <v-select v-model="baselines.mepChannel1" class="my-n5" 
                    :items="muscles"
                    label="Kanal 1"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel1Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>
              
               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel2" class="my-n5" 
                    :items="muscles"
                    label="Kanal 2"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel2Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
               </v-row> 

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel3" class="my-n5" 
                    :items="muscles"
                    label="Kanal 3"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel3Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel4" class="my-n5" 
                    :items="muscles"
                    label="Kanal 4"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel4Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel5" class="my-n5" 
                    :items="muscles"
                    label="Kanal 5"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel5Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel6" class="my-n5" 
                    :items="muscles"
                    label="Kanal 6"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel6Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel7" class="my-n5" 
                    :items="muscles"
                    label="Kanal 7"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel7Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel8" class="my-n5" 
                    :items="muscles"
                    label="Kanal 8"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel8Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel9" class="my-n5" 
                    :items="muscles"
                    label="Kanal 9"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel9Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel10" class="my-n5" 
                    :items="muscles"
                    label="Kanal 10"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel10Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel11" class="my-n5" 
                    :items="muscles"
                    label="Kanal 11"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel11Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel12" class="my-n5" 
                    :items="muscles"
                    label="Kanal 12"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel12Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel13" class="my-n5" 
                    :items="muscles"
                    label="Kanal 13"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel13Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel14" class="my-n5" 
                    :items="muscles"
                    label="Kanal 14"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel14Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel15" class="my-n5" 
                    :items="muscles"
                    label="Kanal 15"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel15Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel16" class="my-n5" 
                    :items="muscles"
                    label="Kanal 16"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel16Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C4CZ" class="my-n5" suffix="mA"></v-text-field>
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
                  <v-select v-model="baselines.masseterSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter2"  class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter3"  class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter4"  class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Orb oris</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.orisSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Deltoideus</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.deltoideusSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Biceps</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bicepsSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Extensor</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.extensorSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.thenarSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  v-model="baselines.thenar2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.tibSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Abd hall</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.abdSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader  class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.thenar2Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar21" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar22" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar23" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar24" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2" >
                  <v-subheader  class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.tib2Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib21" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib22" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib23" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib24" class="my-n5"></v-text-field>
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
                  <v-text-field v-model="baselines.aepLI" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLII" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLIII" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLIV" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field  v-model="baselines.aepLV" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRI" class="my-n5"  suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRII" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRIII" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRIV" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRV" class="my-n5" suffix="ms" ></v-text-field>
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
                  <v-select v-model="baselines.vepL" class="my-n5" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.vepR" class="my-n5" 
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
                  <v-select v-model="baselines.brL" class="my-n5"  
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.brR" class="my-n5"  
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.brt" class="my-n5"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >LAR</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.larL" class="my-n5"  
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.larR" class="my-n5"  
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
                   <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.lart" class="my-n5"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5"  >BCR</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bcrL" class="my-n5"  
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bcrR" class="my-n5"  
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.bcrt" class="my-n5"  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success"  @click="dialogBaselines = false">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    <!-- dialog for d-wave -->
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
                  <v-text-field v-model="extras.dWaveAmp" class="my-n5" suffix="mV" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.dWaveLat" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1" class="my-n5" label="Weitere"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1Amp" class="my-n5" suffix="mV" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1Lat" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2" class="my-n5" label="Weitere"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2Amp" class="my-n5" suffix="mV" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2Lat" class="my-n5" suffix="ms"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success"  @click="dialogExtras = false">Speichern</v-btn>
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
                <v-col cols="12" sm="6" md="2">
                  <v-label>N</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
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
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusLN" class="my-n5" suffix="ms">></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusLP" class="my-n5" suffix="ms">></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusLAmp" class="my-n5" suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusRN" class="my-n5" suffix="ms">></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusRP" class="my-n5" suffix="ms">></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusRAmp" class="my-n5" suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisLN" class="my-n5" suffix="ms">></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisLP" class="my-n5" suffix="ms">></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisLAmp" class="my-n5" suffix="uV" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisRN" class="my-n5" suffix="ms">></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisRP" class="my-n5" suffix="ms">></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisRAmp" class="my-n5" suffix="uV" ></v-text-field>
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
                  <v-select v-model="closing.mepChannel1" class="my-n5" 
                    :items="muscles"
                    label="Kanal 1"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel1Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>
              
               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel2" class="my-n5" 
                    :items="muscles"
                    label="Kanal 2"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel2Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
               </v-row> 

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel3" class="my-n5" 
                    :items="muscles"
                    label="Kanal 3"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel3Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel4" class="my-n5" 
                    :items="muscles"
                    label="Kanal 4"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel4Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel5" class="my-n5" 
                    :items="muscles"
                    label="Kanal 5"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel5Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel6" class="my-n5" 
                    :items="muscles"
                    label="Kanal 6"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel6Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel7" class="my-n5" 
                    :items="muscles"
                    label="Kanal 7"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel7Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel8" class="my-n5" 
                    :items="muscles"
                    label="Kanal 8"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel8Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel9" class="my-n5" 
                    :items="muscles"
                    label="Kanal 9"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel9Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel10" class="my-n5" 
                    :items="muscles"
                    label="Kanal 10"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel10Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.mepChannel11" class="my-n5" 
                    :items="muscles"
                    label="Kanal 11"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.mepChannel11Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel12" class="my-n5" 
                    :items="muscles"
                    label="Kanal 12"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel12Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel13" class="my-n5" 
                    :items="muscles"
                    label="Kanal 13"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel13Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel14" class="my-n5" 
                    :items="muscles"
                    label="Kanal 14"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel14Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel15" class="my-n5" 
                    :items="muscles"
                    label="Kanal 15"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel15Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C4CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel16" class="my-n5" 
                    :items="muscles"
                    label="Kanal 16"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel16Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C1C2" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C3C4" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C3CZ" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C4CZ" class="my-n5" suffix="mA"></v-text-field>
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
                  <v-select v-model="closing.masseterSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter2"  class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter3"  class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter4"  class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Orb oris</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.orisSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Deltoideus</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.deltoideusSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Biceps</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.bicepsSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Extensor</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.extensorSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.thenarSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  v-model="closing.thenar2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.tibSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Abd hall</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.abdSide" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd1" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd2" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd3" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd4" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader  class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.thenar2Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar21" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar22" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar23" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar24" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2" >
                  <v-subheader  class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.tib2Side" class="my-n5" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib21" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib22" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib23" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib24" class="my-n5"></v-text-field>
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
                  <v-text-field v-model="closing.aepLI" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLII" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLIII" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLIV" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field  v-model="closing.aepLV" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRI" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRII" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRIII" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRIV" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRV" class="my-n5" suffix="ms" ></v-text-field>
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
                  <v-select v-model="closing.vepL" class="my-n5" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.vepR" class="my-n5" 
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
                  <v-select v-model="closing.brL" class="my-n5" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.brR" class="my-n5" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.brt" class="my-n5" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >LAR</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.larL" class="my-n5" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                 
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.larR" class="my-n5" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.lart" class="my-n5" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >BCR</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.bcrL" class="my-n5" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.bcrR" class="my-n5" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.bcrt" class="my-n5" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success"  @click="dialogClosing = false">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>  

         <!-- Dialog for finishing IOM -->
        <v-dialog
        v-model="dialogFinish"
        max-width="400"
      >
     
        <v-card>
          <v-card-title class="headline">IOM beenden?</v-card-title>
  
          <v-card-text>
            Sind Sie sicher, dass Sie das IOM-beenden möchten?
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              depressed  large color="success"
              @click="stopIom()"
            >
              Ja, beenden.
            </v-btn>
  
            <v-btn
             depressed  large color="normal"
              @click="dialogFinish = false"
            >
              Nein, nicht beenden            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog></v-flex>

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
                  <v-select v-model="evaluation.age" class="my-n3"
                    :items="age"
                    label="Alter"
                  ></v-select>
                  <v-select v-model="evaluation.sex" class="my-n3"
                    :items="sex"
                    label="Geschlecht"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.local" class="my-n3"
                    :items="local"
                    label="Lokalisation"
                  ></v-select>
                  <v-select v-model="evaluation.detail" class="my-n3"
                    :items="detail"
                    label="Detail"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.patho" class="my-n3"
                    :items="patho"
                    label="Pathologie"
                  ></v-select>
                  <v-select v-model="evaluation.op" class="my-n3"
                    :items="op"
                    label="Operation"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.anaest" class="my-n3"
                    :items="anaest"
                    label="Anästhesie"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" sm="4" md="8">
                 <v-select v-model="evaluation.modalities" class="my-n3" label="Modalitäten" :items="modalities" multiple chips></v-select>
                  <v-select v-model="evaluation.mapping" class="my-n3" label="Mapping" :items="mapping" multiple chips></v-select>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                    <label>Tiefste Mapping-Schwelle</label>
                    </v-col>
                    <v-col cols="12" sm="4" md="2">
                    <v-text-field v-model="evaluation.mappingsw" class="my-n3" suffix="mA"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-select v-model="evaluation.reflexes" class="my-n3" label="Reflexe" :items="reflexes" multiple chips></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="evaluation.sseps2" class="my-n3"
                    :items="eventchanges"
                    label="SSEPs"
                  ></v-select>
                  <v-select v-model="evaluation.meps2" class="my-n3"
                    :items="eventchanges"
                    label="TES-MEPs"
                  ></v-select>
                  <v-select v-model="evaluation.aeps2" class="my-n3"
                    :items="eventchanges"
                    label="AEPs"
                  ></v-select>
                  <v-select v-model="evaluation.veps2" class="my-n3"
                    :items="eventchanges"
                    label="VEPs"
                  ></v-select>
                  <v-select v-model="evaluation.gripdmeps2" class="my-n3"
                    :items="eventchanges"
                    label="DCS-MEPs"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select v-model="evaluation.optechnik" class="my-n3" 
                    :items="optechnik"
                    label="OP-Technik"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-checkbox  class="my-n3" v-model="evaluation.studycheck" label="Studienfall" ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="evaluation.study" class="my-n3"  :disabled="!evaluation.studycheck" label="Studien eingeben"></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                  
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea class="mb-n10" v-model="evaluation.comment"
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
            <v-btn  depressed  large color="success" @click="submit()">Fall beenden</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogEval = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>   
      </v-layout >          
      </br> </br></br> </br>
      </form>
        </v-flex>     
  </v-layout> 
</v-container>
</v-layout>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  //initialize variables
  data: () => ({

    /* values for evaluation*/
    age: ['Kind','Erwachsener'],
    sex: ['Weiblich','Männlich'],
    local: ['supratentorielle RF','infratentorielle RF','spinal','Gefässe',''],
    detail: ['frontal','zentral','parietal','occipital','temporal','cerebellär','KHBW','HWK','BWK','LWK','SWK','Hypophyse','Hirnstamm',''],
    patho: ['intracerebral','extradural','intradural','intramedullär','vaskulär','Blutungen',''],
    op: ['Resektion','Clipping','Stabilisation','Dekompression','Biopsie','direkte Stimulation','Verschluss',''],
    anaest: ['TIVA','TIVA plus','Wach-OP',''],
    optechnik: ['Wach-OP', 'SCS', 'DBS', 'IB', ''],
    modalities: ['D-Welle ','SSEPs ', 'TES-MEPs ', 'DCS-MEPs ', 'AEPs ', 'VEPs ', 'CCEPs ', 'EMG ', 'ECOG '],
    mapping:['Dynamischer Sauger ', 'DNS ',  'Penfield '],
    reflexes:['BR ', 'LAR ', 'BCR '],

 /* values for the baselines */
    items: ['vorhanden', 'mässig', 'schlecht', ''],
    sides: ['L', 'R', ''],
    muscles: ['Occulomotor', 'Trochlearis', 'Masseter', 'Abduzens', 'Orb occ', 'Labialis', 'Orb oris', 'Mentalis', 'Glosso', 'Vagus', 'Accessorius', 'Hypoglosso', 'Deltoideus', 'Biceps', 'Triceps', 'Extensor', 'Thenar', 'Hypothenar', 'Aductor', 'Ileopsoas', 'Quadri', 'Tib ant', 'Gastro', 'Abd hall', ''],
    eventchanges: ['normal', 'bedeutende Veränderungen', 'Verlust', ''],

    dialogFinish: false,
    dialogEval: false,
    dialogBaselines: false,
    dialogExtras: false,
    dialogClosing: false,

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

  evaluation: {

      age:'',
      sex:'',
      local:'',
      detail:'',
      patho:'',
      op:'',
      anaest:'',

      modalities:'',
      mapping:'',
      reflexes:'',
      mappingsw:'',

      sseps2:'',
      meps2:'',
      aeps2:'',
      veps2:'',
      gridmeps2:'',

      optechnik: '',
      study:'',
      studycheck: false,

      comment:'',


    },


    entry: {
      ts: '',
      entrycat: '',
      event: '',
      comment: '',
    },
    entries: [
    
    ],
    
    status: 'läuft',
    id: 0,
    valid: true,
    casenr: '',
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

   timestamp: "",
    category: '',
    event: '',
    comment:'',


    selectedEntry: null,

    dbcategories: [],
 selected: undefined,

  }),

  // fetches all case data on load and pushs a first entry in the entry array
  mounted() {
  
    this.fetchCase(this.id);
    this.getNow();
    this.fetchCategories();  
    this.entries.push( {
          ts: this.entry.ts,
          entrycat: { "options": [ "IOM gestartet", "IOM beendet", "Kalibrierung" ], "_id": "5dce9280026fa6fcc7f8653e", "name": "IOM" },
          event: 'IOM gestartet',
          comment: '',
    }) ;

  },

  // store case id from the routerlink to a local variable on page load
  created() {
    this.id = this.$route.params.id;
 
  },

  methods: {

//method to add a new entry and scroll down to the last entry
    addNewEntry: function () {
   this.getNow();
 this.entries.push( {
     
      ts: this.entry.ts,
      entrycat: this.entry.entrycat,
      event: this.entry.event,
      comment: this.entry.comment,
 }) ;
window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);

    },

      
    //method to delete entry
    removeEntry: function (index) {

      swal({
            title: "Eintrag löschen?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["Abbrechen", "Löschen"],
              
        })
        .then((willDelete) => {
          if (willDelete) {
              this.entries.splice(index, 1,);
 
          } else {
           
          }
        });    
    },


//formate timestamp
  checkTime: function(i) {
        return (i < 10) ? "0" + i : i;
    },

//method to get the timestamp
   getNow: function() {
      const today = new Date();
        var h = this.checkTime(today.getHours());
      var      m = this.checkTime(today.getMinutes());
          var  s = this.checkTime(today.getSeconds());
       this.entry.ts = h + ":" + m + ":" + s;;
                },

//method to stop the iom
stopIom: function(){
this.status = 'beendet';
this.dialogFinish = false;
this.dialogEval = true;
 this.entries.push( {
      ts: this.entry.ts,
      entrycat: { "options": [ "IOM gestartet", "IOM beendet", "Kalibrierung" ], "_id": "5dce9280026fa6fcc7f8653e", "name": "IOM" },
      event: 'IOM beendet',
      comment: '',
 });

},

   // fetches all categories from the database
    async fetchCategories() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          name: this.categories,
        },
        url: '/categories',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },

      })
        .then((response) => {
          this.dbcategories = response.data.categories;
        })
        .catch(() => {});
    },

 // submit method to send the new protocol to the db and delete the case from opencase db
    submit() {
      this.dialogEval = false;
    

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
          },
          url: '/protocols',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
          
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Das Protokoll wurde erfolgreich gespeichert!',
              'success',
            );
           
            this.deleteOpenCase(this.id); 
            this.$router.push({ name: 'Protocolevaluation', params: { casenr: this.casenr }  });
            
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Das Protokoll konnte nicht gespeichert werden!',
              'error',
            );
          }); 
     
    },

    // delete the specific case from opencase collection
    async  deleteOpenCase(id) {
     const token = window.localStorage.getItem('auth');
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `/cases/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.ccases.indexOf(item);
          this.ccases.splice(index, 1);
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
        url: `/cases/${id}`,
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
          this.birthdate =  response.data.cases.birthdate;
          this.diagnose = response.data.cases.diagnose;
          this.operation = response.data.cases.operation;
          this.isismodality = response.data.cases.isismodality;
          this.opdate = response.data.cases.opdate;
          this.surgeon = response.data.cases.surgeon;
          this.assistant = response.data.cases.assistant;
          this.formBirthdate = moment( response.data.cases.birthdate).format("DD-MM-YYYY");
          this.formOpdate = moment( response.data.cases.opdate).format("DD-MM-YYYY");
        })
        .catch(() => { console.log('error'); });
    },
  },
};
</script>


<style>
.active {
  background-color: pink;
}
</style>



