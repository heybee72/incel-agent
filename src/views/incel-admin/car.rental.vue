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
              <v-card-title>
                Car Rental Service

                <v-spacer></v-spacer>

                <!-- <v-btn color="green" dark><v-icon color="white">mdi-plus</v-icon> Add Traveller</v-btn> -->
              </v-card-title>
              <!-- <v-card-subtitle> Search Hotels </v-card-subtitle> -->
              <hr />
              <v-form ref="form" v-model="isFormValid">
                <!-- <p class="success-text">Other core setup values</p> -->
                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="fname"
                      :rules="rules"
                      outlined
                      dense
                      label="First Name"
                      placeholder="Enter firstname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="lname"
                      :rules="rules"
                      outlined
                      dense
                      label="Last Name"
                      placeholder="Enter lastname"
                    ></v-text-field>
                  </v-col>
                </v-row>
                 <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="email"
                      :rules="rules"
                      outlined
                      dense
                      label="Email"
                      placeholder="Enter email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="phone"
                      :rules="rules"
                      outlined
                      dense
                      label="Phone Number"
                      placeholder="Enter phone number"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <p>Purpose of booking</p>
                    <v-radio-group v-model="radioGroup">
                      <v-radio
                        v-for="n in 4"
                        :key="n"
                        :label="`${purposes[n]}`"
                        :value="n"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <p>Numbe of passengers</p>
                    <v-radio-group v-model="radioGroup">
                      <v-radio
                        v-for="p in 4"
                        :key="p"
                        :label="`${passengers[p]}`"
                        :value="p"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <p>Vehicle Required</p>
                    <v-radio-group v-model="radioGroup">
                      <v-radio
                        v-for="v in 4"
                        :key="v"
                        :label="`${vehicles[v]}`"
                        :value="v"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="model"
                      type="date"
                      :rules="[rules.required]"
                      outlined
                      dense
                      label="Pickup Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="plocation"
                      :rules="rules"
                      outlined
                      dense
                      label="Pickup Location"
                      placeholder="Enter Pickup Location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="dlocation"
                      :rules="rules"
                      outlined
                      dense
                      label="Destination Location"
                      placeholder="Enter Destination Location"
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
                    >Submit 
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
      radioGroup: 1,
      max: 1000,
      model: "",
      fname: "",
      lname: "",
      plocation: "",
      dlocation: "",
      email: "",
      phone: "",
      purposes: ["Leisure", "Business", "Vacation", "Event"],
      passengers: ["1 - 3", "1 - 5", "6 - 10", "Above 11"],
      vehicles: ["Sedan Car", "SUV", "Mini Bus", "Bus"],
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
