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
                Add new tour booking

                <v-spacer></v-spacer>

                <!-- <v-btn color="green" dark><v-icon color="white">mdi-plus</v-icon> Add Traveller</v-btn> -->
              </v-card-title>
              <!-- <v-card-subtitle> Search Hotels </v-card-subtitle> -->
              <hr />
              <v-form ref="form" v-model="isFormValid">
                <!-- <p class="success-text">Other core setup values</p> -->
                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" class="pa-4">
                    <v-select
                      :items="items"
                      item-text="name"
                      item-value="id"
                      label="Select traveller"
                      dense
                      v-model="tid"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="border-rad-sm overflow-hidden radio-input-row">
                  <v-col
                    cols="12"
                    class="pa-4"
                    v-for="tour in tours"
                    v-bind:key="tour.id"
                  >
                    <label>
                      <input
                        type="radio"
                        v-model="tourId"
                        :value="tour.id"
                        name="opt.groupName"
                      />
                      <span>
                        <h3>{{ tour.title }}</h3>
                        <h6>Children price: {{ tour.childrenprice }}</h6>
                        <h6>Adilt price: {{ tour.adultprice }}</h6>
                      </span>
                    </label>
                  </v-col>
                  <!-- <label v-for="opt in options" v-bind:key="opt.value">
   <input type="radio" v-model="opt.checked" value="opt.value" name="opt.groupName" />
   <span v-html="opt.value"></span>
</label> -->
                </v-row>

                <br />
                <br />
                <v-row align="center" justify="space-around">
                  <!-- <v-btn @click="leavePage" depressed color="error"> Cancel </v-btn> -->
                  <v-btn
                    depressed
                    :disabled="!isFormValid || loading"
                    color="success"
                    @click="addTourBooking"
                  >
                    Add booking
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
      items: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ],
      tours: [],
      max: 1000,
      tid: "",
      tourId: "",
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
  mounted() {
    let user =
      typeof this.$store.getters.getUser == "string"
        ? JSON.parse(this.$store.getters.getUser)
        : this.$store.getters.getUser;
    this.fetchTravllers(user);
    this.fetchTours(user);
  },
  methods: {
    leavePage() {
      this.$router.push("/admin/dashboard");
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
            this.items.push({ id: traveller.id, name: traveller.fullname });
          }
          //   console.log(result);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    fetchTours(user) {
      console.log(user);
      api
        .get("tours", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          let tours = response.data.tour;
          for (let i = 0; i < tours.length; i++) {
            const tour = tours[i];
            this.tours.push({
              id: tour.id,
              title: tour.tour,
              adultprice: tour.adult_price,
              childrenprice: tour.children_price,
            });
          }
          console.log(tours);
        })
        .catch((error) => {
          console.log(error.response);
        });
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
  width: calc(100vw - 450px);
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
</style>
