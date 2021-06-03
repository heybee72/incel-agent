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
                Get tour availability

                <v-spacer></v-spacer>

                <!-- <v-btn color="green" dark><v-icon color="white">mdi-plus</v-icon> Add Traveller</v-btn> -->
              </v-card-title>
              <!-- <v-card-subtitle> Search Hotels </v-card-subtitle> -->
              <hr />
              <v-form ref="form" v-model="isFormValid">
               
              
                <br />
                <br />
                <v-row align="center" justify="space-around">
                  <!-- <v-btn @click="leavePage" depressed color="error"> Cancel </v-btn> -->
                  <v-btn
                    v-if="isTourAvailable"
                    depressed
                    :disabled="!isFormValid || loading"
                    color="success"
                    @click="fetchAvailability"
                  >
                    Book tour
                  </v-btn>
                  <v-btn
                    v-else
                    depressed
                    :disabled="!isFormValid || loading"
                    color="success"
                    @click="fetchAvailability"
                  >
                    Check tour availability
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
  props: ["tour", "tourDate", "timeslots", "adult", "child", "infant"],
  data() {
    return {
      isFormValid: false,
      loading: false,
      isTourAvailable: false,
      tourOptions: [],
      selectedtourOption: {},
      max: 1000,
      rules: [
        (value) => !!value || "Required.",
        // (value) => (value || "").length <= 20 || "Max 20 characters",
        // (value) => {
        //   const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //   return pattern.test(value) || "Invalid e-mail.";
        // },
      ],
    };
  },
  mounted() {
    // let user =
    //   typeof this.$store.getters.getUser == "string"
    //     ? JSON.parse(this.$store.getters.getUser)
    //     : this.$store.getters.getUser;
    console.log(this.tour);
    // console.log(this.$route.params.items)
  },
  methods: {
    leavePage() {
      this.$router.push("/admin/dashboard");
    },

    fetchTourOptions() {
      //   if (this.tourDate.trim().length < 1) {
      //     Vue.notify({
      //       group: "loggedIn",
      //       type: "error",
      //       text: "Select tour date",
      //     });
      //     return;
      //   }
      this.loading = true;
      api
        .post(
          "tour/options",
          {
            tour_id: this.tour.id,
            contract_id: this.tour.contractId,
            date: "2021-05-26",
            adults: this.adults,
            children: this.children,
            infants: this.infants,
          },
          {
            headers: {
              //  Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          let tourOptions = response.data.data;
          this.tourOptions = [];
          for (let i = 0; i < tourOptions.length; i++) {
            const tourOption = tourOptions[i];
            this.tourOptions.push({
              i: i + 1,
              tourOptionId: tourOption.tourOptionId,
              transferId: tourOption.transferId,
              transferName: tourOption.transferName,
              adultPrice: tourOption.adultPrice,
              childPrice: tourOption.childPrice,
              infantPrice: tourOption.infantPrice,
              finalAmount: tourOption.finalAmount,
            });
          }
          this.loading = false;
          console.log(tourOptions);
        })
        .catch((error) => {
          this.loading = false;
          console.log(error.response);
        });
    },

    fetchTourTimeslots() {
      //   if (this.tourDate.trim().length < 1) {
      //     Vue.notify({
      //       group: "loggedIn",
      //       type: "error",
      //       text: "Select tour date",
      //     });
      //     return;
      //   }
      this.loading = true;
      api
        .post(
          "tour/timeslots",
          {
            tour_id: this.tour.id,
            contract_id: this.tour.contractId,
            tour_option_id: this.selectedtourOption.tourOptionId,
            transfer_id: this.selectedtourOption.transferId,
            date: "2021-05-28",
          },
          {
            headers: {
              //  Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          let result = response.data;
          if (result.status == false) {
            Vue.notify({
              group: "loggedIn",
              type: "error",
              text: result.message,
            });
          } else {
            console.log(result.data);
          }
          //   this.tourOptions = [];
          //   for (let i = 0; i < tourOptions.length; i++) {
          //     const tourOption = tourOptions[i];

          //   }
          this.loading = false;
          //   console.log(tourOptions);
        })
        .catch((error) => {
          this.loading = false;
          console.log(error.response);
        });
    },
    fetchAvailability(){
        console.log("availanble")
    },
    addTourBooking() {
      this.loading = true;
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      api

        .post(
          "tour_bookings/agentAdd",
          {
            traveller_id: this.tid,
            selected_tour_id: this.tourId,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          this.loading = false;
          Vue.notify({
            group: "loggedIn",
            type: "success",
            text: response.data.message,
          });
          console.log(response.data);
        })
        .catch((error) => {
          this.loading = false;
          console.log(error.response);
          Vue.notify({
            group: "loggedIn",
            type: "error",
            text: "Unable to complete, please try again!",
          });
        });
    },
    formatDate(date) {
      var today = new Date(date);
      var dd = today.getDate();

      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      today = mm + "/" + dd + "/" + yyyy;
      return today;
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
.radio-input-row input {
  display: none;
}
.radio-input-row label {
  /* margin-right: 20px; */
  display: inline-block;
  cursor: pointer;
}
.radio-input-row span {
  width: calc(100vw - 700px);
  display: block;
  padding: 15px 10px 10px 25px;
  border: 2px solid #ddd;
  border-radius: 5px;
  position: relative;
  transition: all 0.25s linear;
}
.radio-input-row input:checked + span {
  background-color: #fff;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  border-color: blue;
}

.is-active {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid blue;
}
</style>
