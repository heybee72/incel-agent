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
                  <v-btn color="success" depressed @click="viewRentals" >
                    <v-icon color="white">mdi-eye</v-icon> <span class="ml-1">View Rentals</span></v-btn>
                <!-- <v-btn color="green" dark><v-icon color="white">mdi-plus</v-icon> Add Traveller</v-btn> -->
              </v-card-title>
              <!-- <v-card-subtitle> Search Hotels </v-card-subtitle> -->
              <hr />
              <v-form ref="form" v-model="isFormValid">
                <!-- <p class="success-text">Other core setup values</p> -->
                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="plocation"
                      :rules="rules"
                      outlined
                      dense
                      label="Pickup Location"
                      placeholder="Enter Pickup Location"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
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
                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="passenger"
                      outlined
                      dense
                      label="Number of passengers"
                      placeholder="Enter number of passengers"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="carType"
                      :rules="rules"
                      outlined
                      dense
                      label="Car Type"
                      placeholder="Enter car type"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- <v-row class="border-rad-sm overflow-hidden">
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
                </v-row> -->

                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" sm="12" md="12" lg="3" xl="4" class="pa-4">
                    <v-select
                      :items="journey"
                      item-text="title"
                      item-value="value"
                      label="Journey Type"
                      dense
                      v-model="radioGroup"
                      outlined
                    ></v-select>
                    <!-- <p>Journey Type</p>
                    <v-radio-group v-model="radioGroup">
                      <v-radio
                        v-for="v in journey"
                        :key="v['value']"
                        :label="`${v['title']}`"
                        :value="v['value']"
                      ></v-radio>
                    </v-radio-group> -->
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="4" xl="4" class="pa-4">
                    <v-text-field
                      v-model="pickupDate"
                      type="date"
                      outlined
                      dense
                      label="Pickup Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="5" xl="4" class="pa-4">
                    <v-select
                      :items="travellers"
                      item-text="name"
                      item-value="id"
                      label="Select traveller"
                      dense
                      v-model="traveller_id"
                      outlined
                    ></v-select>
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
                    @click="addcarRental"
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
import Vue from "vue";
import api from "Api";

export default {
  components: {},
  data() {
    return {
      isFormValid: false,
      loading: false,
      radioGroup: "",
      traveller_id: 0,
      travellers: [],
      max: 1000,
      passenger: "",
      carType: "",
      plocation: "",
      dlocation: "",
      pickupDate: "",
      purposes: ["Leisure", "Business", "Vacation", "Event"],
      passengers: ["1 - 3", "1 - 5", "6 - 10", "Above 11"],
      vehicles: ["Sedan Car", "SUV", "Mini Bus", "Bus"],
      journey: [
        { title: "Single Journey", value: "single_journey" },
        { title: "Round Trip", value: "roundtrip" },
        { title: "All Day", value: "all_day" },
      ],
      rules: [
        (value) => !!value || "This field is required.",
        (value) => (value || "").length <= 20 || "Max 20 characters",
        // (value) => {
        //   const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //   return pattern.test(value) || "Invalid e-mail.";
        // },
      ],
    };
  },
  mounted() {
    let user =
      typeof this.$store.getters.getUser == "string"
        ? JSON.parse(this.$store.getters.getUser)
        : this.$store.getters.getUser;
    this.fetchTravllers(user);
    // this.fetchTours(user);
  },
  methods: {
    leavePage() {
      this.$router.push("/admin/dashboard");
    },
    viewRentals() {
      this.$router.push("/admin/car/rentals");
    },
    fetchTravllers(user) {
      api
        .get("travellers/agent_view", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          let travellers = response.data.traveller;
          for (let i = 0; i < travellers.length; i++) {
            const traveller = travellers[i];
            this.travellers.push({
              id: traveller.id,
              name: traveller.fullname,
            });
          }
          //   console.log(result);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    async addcarRental() {
      this.loading = true;
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      try {
        const response = await api.post(
          "car_rentals/agentAdd",
          {
            pickup_location: this.plocation,
            destination: this.dlocation,
            no_of_passengers: this.passenger,
            car_type: this.carType,
            journey_type: this.radioGroup,
            traveller_id: this.traveller_id,
            pickup_date: this.pickupDate,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        this.loading = false;
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: response.data.message,
        });
        console.log(response.data);
      } catch (e) {
        this.loading = false;
        console.log(e.response);
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "an error occured, please try again",
        });
      }
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
