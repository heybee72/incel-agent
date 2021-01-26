<template>
  <div>
    <page-title-bar></page-title-bar>
    <v-container class="grid-list-xl pt-0">
      <div class="crypto-dash-wrap">
        <v-row class="border-rad-sm overflow-hidden">
          <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pa-0">
            <!-- Safe Trade -->
            <v-card elevation="2" class="pad-20">
              <v-card-title>Currency Set Up</v-card-title>
              <v-card-subtitle> Core Application Set Up</v-card-subtitle>
              <hr />
              <v-form ref="form" v-model="isFormValid">
                <p class="danger-text">Currency exchange rate set up</p>

                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="Dollars($)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="Naira(₦)"
                    ></v-text-field>
                  </v-col>
                    <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="D(₦)"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <br/>
                <hr />
                <br/>
                <p class="danger-text">Other core setup values</p>
                 <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="TravelBeta Affilaiate Code"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="TravelBeta Api Key"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <br/>
                <v-row align="center" justify="space-around">
                  <v-btn @click="leavePage" depressed color="error"> Cancel </v-btn>
                  <v-btn depressed :disabled="!isFormValid" color="success"> Update </v-btn>
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
  methods:{
    leavePage(){
      this.$router.push('/admin/dashboard');
    }
  }
};
</script>

<style scoped>
  .pad-20{
      padding: 20px 80px;
  }
  .danger-text{
      color:red;
      font-size: 12px;
  }
</style>
