<template>
  <div>
    <page-title-bar></page-title-bar>

    <v-container class="grid-list-xl pt-0">
      <div class="crypto-dash-wrap">
        <v-row class="border-rad-sm overflow-hidden">
          <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pa-0">
            <!-- Safe Trade -->
            <v-card elevation="2" class="pad-20">
              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                color="deep-purple accent-4"
              ></v-progress-linear>
              <v-card-title>Book a flight 
                
            <v-spacer></v-spacer>

            <v-btn color="green" dark><v-icon color="white">mdi-plus</v-icon> Add Traveller</v-btn>
              </v-card-title>
              <!-- <v-card-subtitle> Search Hotels </v-card-subtitle> -->
              <hr />
              <v-form ref="form" v-model="isFormValid">
                <!-- <p class="success-text">Other core setup values</p> -->
                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :rules="rules"
                      outlined
                      dense
                      label="Flying From"
                      placeholder="Enter city you are flying from"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :rules="rules"
                      outlined
                      dense
                      label="Flying To"
                      placeholder="Enter city you are flying to"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-select
                      :items="['kk','lll']"
                      label="Flight Class"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-select
                      :items="['One Way Trip','Round Trip']"
                      label="Flight Type"
                      outlined
                      dense
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="model"
                      type="date"
                      :rules="[rules.required]"
                      outlined
                      dense
                      label="Departure Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="model"
                      type="date"
                      :rules="[rules.required]"
                      label="Arrival Date"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :counter="2"
                      :rules="[rules.required, rules.min]"
                      outlined
                      dense
                      label="Adults(s)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :counter="2"
                      :rules="[rules.required]"
                      outlined
                      dense
                      label="Child(ren)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :counter="2"
                      :rules="[rules.required]"
                      outlined
                      dense
                      label="Infant(s)"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <br />
                <br />
                <v-row align="center" justify="space-around">
                  <!-- <v-btn @click="leavePage" depressed color="error"> Cancel </v-btn> -->
                  <v-btn
                    depressed
                    :disabled="!isFormValid || loading"
                    color="success"
                    @click="loading = true"
                  >Proceed
                  </v-btn>
                </v-row>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isFormValid: false,
      loading: false,
      max: 1000,
      model: "",
      rules: [
        (value) => !!value || "Required.",
        (value) => (value || "").length <= 20 || "Max 20 characters",
        // (value) => {
        //   const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //   return pattern.test(value) || "Invalid e-mail.";
        // },
      ],
    };
  },
  methods: {
    leavePage() {
      this.$router.push("/admin/dashboard");
    },
  },
};
</script>

<style scoped>
.pad-20 {
  padding: 20px 80px;
}
.danger-text {
  color: red;
  font-size: 12px;
}
</style>
