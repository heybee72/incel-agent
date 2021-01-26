<template>
   <v-col :class="colClasses">
      <div class="app-card p-2" :class="customClasses">
         <v-card-text>
            <div class="layout justify-space-between pa-3">
               <div class="align-item-start">
                  <h3 class="ma-0 fw-normal grey--text">{{heading}}</h3>
                  <br/>
                  <!-- <br/> -->
                  <h3 class="fw-bold mb-1" v-if="amount != null">₦<countTo :startVal='0' :endVal="amount" :duration='5000'></countTo></h3>
                  <h3 class="fw-bold mb-1" v-if="count != null"><countTo :startVal='0' :endVal="count" :duration='5000'></countTo></h3>
               </div>
               <div class="align-item-end">
                  <h3 class="dash-icon"><i :class="icon"></i></h3>
               </div>
               <br/>
            </div>
         </v-card-text>
        <!-- <slot></slot> -->
      </div>
   </v-col>
</template>
<script>
import countTo from "vue-count-to";
export default {
  props: ["heading", "amount", "count", "colClasses", "customClasses", "icon"],
  components: {
    countTo
  }
};
</script>
