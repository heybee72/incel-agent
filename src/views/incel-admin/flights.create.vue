<template>
  <div>
    <page-title-bar></page-title-bar>

    <v-container class="grid-list-xl pt-0">
      <div class="crypto-dash-wrap">
        <v-row class="border-rad-sm overflow-hidden">
          <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pa-0">
            <div style="padding: 20px">
              <v-card
                v-for="(stop, index) in allFlights"
                :key="index"
                elevation="1"
                class="mb-8 pl-6"
              >
                <v-row>
                  <v-col md="9">
                    <v-row style="position: relative">
                      <v-col md="4">
                        <h5>
                          {{
                            allFlights[index][0].airItineraryWSResponse
                              .originDestinationWSResponses[0].originAirport
                              .airportName
                          }}
                        </h5>
                        <h6>
                          {{
                            allFlights[index][0].airItineraryWSResponse
                              .originDestinationWSResponses[0].originAirport
                              .city
                          }}
                        </h6>
                        <p>
                          {{
                            allFlights[index][0].airItineraryWSResponse
                              .originDestinationWSResponses[0].departureDateTime
                          }}
                        </p>
                        <!-- airportName, city, cityCode -->
                        <!-- <p>Sep 18, 2021</p> -->
                      </v-col>
                      <!-- <v-col md="2">
                        <small>LOS</small>
                      </v-col>
                       <div style="position: relative; top: 30px; left: 0; width: 30%; height: 2px; background: #dedede;"></div>
                      <v-col md="2">
                        <small>LOS</small>
                      </v-col> -->
                      <v-col md="4" class="text-right">
                        <!-- <h5>14:00 PM</h5> -->
                        <h5>
                          {{
                            allFlights[index][0].airItineraryWSResponse
                              .originDestinationWSResponses[0]
                              .destinationAirport.airportName
                          }}
                        </h5>
                        <h6>
                          {{
                            allFlights[index][0].airItineraryWSResponse
                              .originDestinationWSResponses[0]
                              .destinationAirport.city
                          }}
                        </h6>
                        <p>
                          {{
                            allFlights[index][0].airItineraryWSResponse
                              .originDestinationWSResponses[0].arrivalDateTime
                          }}
                        </p>
                        <!-- <p>Sep 18, 2021</p> -->
                      </v-col>
                    </v-row>
                    <!-- <v-card-title>Cafe</v-card-title> -->
                    <!-- <v-card-subtitle>{{allFlights[index].length}}</v-card-subtitle> -->
                  </v-col>
                  <v-col md="3">
                    <h3>
                      NGN
                      {{
                        Number(
                          allFlights[index][0].pricingInfoWSResponse.totalFare
                        ).toLocaleString()
                      }}
                    </h3>
                    <br />
                    <v-btn
                      color="blue"
                      v-show="
                        hasPaid == true && paidRef == allFlights[index][0].ref
                      "
                      :disabled="loading"
                      @click="bookFlight(allFlights[index][0].ref)"
                      dark
                      >Book Now</v-btn
                    >
                    <paystack
                      v-show="hasPaid == false"
                      @click="setPaidRef(allFlights[index][0].ref)"
                      :amount="
                        Number(
                          allFlights[index][0].pricingInfoWSResponse.totalFare
                        ) * 100
                      "
                      email="jdoe@gmail.com"
                      :paystackkey="PUBLIC_KEY"
                      :reference="reference"
                      :callback="(ref) => processPayment(ref, allFlights[index][0].ref)"
                      :close="close"
                    >
                      Make payment
                    </paystack>
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <!-- Safe Trade -->
            <v-card v-if="allFlights.length < 1" elevation="2" class="pad-20">
              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                color="deep-purple accent-4"
              ></v-progress-linear>
              <v-card-title
                >Book a flight

                <v-spacer></v-spacer>

                <v-btn color="green" dark
                  ><v-icon color="white">mdi-plus</v-icon> Add Traveller</v-btn
                >
              </v-card-title>
              <!-- <v-card-subtitle> Search Hotels </v-card-subtitle> -->
              <hr />
              <!-- <template v-slot:extension> -->
              <v-tabs v-model="tabs" background-color="green darken-3" slider-color="black" slider-size="4" dark>
                <v-tab> ONE WAY </v-tab>
                <v-tab> ROUND TRIP </v-tab>
                <v-tab> MULTI-CITY </v-tab>
              </v-tabs>
              <!-- </template> -->
              <v-tabs-items v-model="tabs">
                <v-tab-item>
                  <br />
                  <v-form ref="form" v-model="isFormValid">
                    <!-- <p class="success-text">Other core setup values</p> -->
                    <v-row class="border-rad-sm overflow-hidden">
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <!-- <v-text-field
                          v-model="model"
                          :rules="rules"
                          outlined
                          dense
                          label="Flying From"
                          placeholder="Enter city you are flying from"
                        ></v-text-field> -->
                        <v-autocomplete
                          v-model="dptCity"
                          :rules="rules"
                          :items="airportCities"
                          :loading="isLoading"
                          :search-input.sync="search"
                          clearable
                          hide-selected
                          item-text="name"
                          item-value="code"
                          label="Departing City or Airport"
                          dense
                          outlined
                        ></v-autocomplete>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <v-autocomplete
                          v-model="arvCity"
                          :rules="rules"
                          :items="airportCitiesTwo"
                          :loading="isLoading"
                          :search-input.sync="searchTwo"
                          clearable
                          hide-selected
                          item-text="name"
                          item-value="code"
                          label="Arriving city or airport"
                          dense
                          outlined
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row class="border-rad-sm overflow-hidden">
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="model"
                          type="date"
                          :rules="rules"
                          outlined
                          dense
                          label="Departure Date"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <v-select
                          :items="flightClass"
                          item-value="slug"
                          item-text="title"
                          label="Flight Class"
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row class="border-rad-sm overflow-hidden">
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="adults"
                          :counter="2"
                          :rules="rules"
                          outlined
                          dense
                          label="Adults(s) (12-75)"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="children"
                          :counter="2"
                          :rules="rules"
                          outlined
                          dense
                          label="Child(ren) (2-12)"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="infants"
                          :counter="2"
                          :rules="rules"
                          outlined
                          dense
                          label="Infant(s) (0-2)"
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
                        @click="searchFlight"
                        >{{ loading ? "LOADING ..." : "PROCEED" }}
                      </v-btn>
                    </v-row>
                  </v-form>
                </v-tab-item>
                <!-- second tab -->
                <v-tab-item>
                  <v-form ref="form" v-model="isFormValid">
                    <!-- <p class="success-text">Other core setup values</p> -->
                    <v-row class="border-rad-sm overflow-hidden">
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <!-- <v-text-field
                          v-model="model"
                          :rules="rules"
                          outlined
                          dense
                          label="Flying From"
                          placeholder="Enter city you are flying from"
                        ></v-text-field> -->
                        <v-autocomplete
                          v-model="dptCity"
                          :rules="rules"
                          :items="airportCities"
                          :loading="isLoading"
                          :search-input.sync="search"
                          clearable
                          hide-selected
                          item-text="name"
                          item-value="symbol"
                          label="Departing City or Airport"
                          dense
                          outlined
                        ></v-autocomplete>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <v-autocomplete
                          v-model="arvCity"
                          :rules="rules"
                          :items="airportCities"
                          :loading="isLoading"
                          :search-input.sync="search"
                          clearable
                          hide-selected
                          item-text="name"
                          item-value="symbol"
                          label="Arriving city or airport"
                          dense
                          outlined
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row class="border-rad-sm overflow-hidden">
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="model"
                          type="date"
                          :rules="rules"
                          outlined
                          dense
                          label="Departure Date"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <v-select
                          :items="flightClass"
                          item-value="slug"
                          item-text="title"
                          label="Flight Class"
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row class="border-rad-sm overflow-hidden">
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="adults"
                          :counter="2"
                          :rules="rules"
                          outlined
                          dense
                          label="Adults(s)"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="children"
                          :counter="2"
                          :rules="rules"
                          outlined
                          dense
                          label="Child(ren)"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="infants"
                          :counter="2"
                          :rules="rules"
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
                </v-tab-item>
                <!-- third tab -->
                <v-tab-item>
                  <v-form ref="form" v-model="isFormValid">
                    <!-- <p class="success-text">Other core setup values</p> -->
                    <v-row class="border-rad-sm overflow-hidden">
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <!-- <v-text-field
                          v-model="model"
                          :rules="rules"
                          outlined
                          dense
                          label="Flying From"
                          placeholder="Enter city you are flying from"
                        ></v-text-field> -->
                        <v-autocomplete
                          v-model="dptCity"
                          :rules="rules"
                          :items="airportCities"
                          :loading="isLoading"
                          :search-input.sync="search"
                          clearable
                          hide-selected
                          item-text="name"
                          item-value="symbol"
                          label="Departing City or Airport"
                          dense
                          outlined
                        ></v-autocomplete>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <v-autocomplete
                          v-model="arvCity"
                          :rules="rules"
                          :items="airportCities"
                          :loading="isLoading"
                          :search-input.sync="search"
                          clearable
                          hide-selected
                          item-text="name"
                          item-value="symbol"
                          label="Arriving city or airport"
                          dense
                          outlined
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row class="border-rad-sm overflow-hidden">
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="model"
                          type="date"
                          :rules="rules"
                          outlined
                          dense
                          label="Departure Date"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="6"
                        xl="6"
                        class="pa-4"
                      >
                        <v-select
                          :items="flightClass"
                          item-value="slug"
                          item-text="title"
                          label="Flight Class"
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row class="border-rad-sm overflow-hidden">
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="model"
                          :counter="2"
                          :rules="rules"
                          outlined
                          dense
                          label="Adults(s)"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="model"
                          :counter="2"
                          :rules="rules"
                          outlined
                          dense
                          label="Child(ren)"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                        xl="4"
                        class="pa-4"
                      >
                        <v-text-field
                          v-model="model"
                          :counter="2"
                          :rules="rules"
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
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import paystack from "vue-paystack";

import api from 'Api';

export default {
  components: {
    paystack,
  },
  data() {
    return {
      isFormValid: false,
      paidRef: "",
      hasPaid: false,
      loading: false,
      isLoading: false,
      tabs: null,
      search: null,
      searchTwo: null,
      sessionId: null,
      max: 1000,
      model: "",
      dptCity: "",
      arvCity: "",
      infants: "",
      adults: "",
      children: "",
      PUBLIC_KEY: "pk_test_2bd5300869fc1e31aef3d0f9c222fc2c40055f3f",
      segments: [],
      airportCities: [],
      airportCitiesTwo: [],
      allFlights: [],
      flightClass: [
        { title: "Economy", slug: "Economy" },
        { title: "Premium Economy", slug: "Premium_Economy" },
        { title: "Business", slug: "Business" },
        { title: "First", slug: "First" },
      ],
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
    if (sessionStorage.session_id) {
      this.sessionId = sessionStorage.getItem("session_id");
    } else {
      this.sessionId = this.makeid(9);
      sessionStorage.setItem("session_id", this.sessionId);
    }
  },
  computed: {
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    },
  },
  methods: {
    leavePage() {
      this.$router.push("/admin/dashboard");
    },
    makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    async searchFlight() {
      this.loading = true;

      try {
        let response = await axios.post(
          `https://travel-flight-api.brakket.tech/v1/api/flight/search`,
          {
            segments: [
              {
                departing: this.dptCity,
                arriving: this.arvCity,
                departingDate: "2021-09-18T00:01:00",
              },
              // {
              //     "departing": "JFK",
              //     "arriving": "LOS",
              //     "departingDate": "2021-10-28T00:01:00"
              // }
            ],
            travellers: {
              adult: 1,
              child: 0,
              infant: 1,
            },
            session: this.sessionId,
            cabin: "Economy",
            directFlight: false,
            flexibleDate: false,
            refundableOnly: false,
            salesCategory: "B2C",
            preferredAirlines: [],
          },
          {
            headers: {
              "x-api-auth": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBOYW1lIjoiVHJhdmVsQmV0YS1XZWIiLCJ0b2tlbiI6IjZEMTZGNzQ5RUMxMTlDRTU3NEY1MjQ1QTcxRDg2MDI2OTM1RDRCQzAyN0E1MzYzMTk4RDlGNUY2QTAzMTI5QzQiLCJjb21tb25GaWVsZHMiOnsiaWQiOjEsImNyZWF0ZWRBdCI6IjIwMjEtMDItMTEgMTI6NTU6NTAuMCIsInZlcnNpb24iOiIifX0.B-X78zAsFl5Dqazbo0YxZ4mw27f_vDIdh5Zbq_AoWbI`,
            },
          }
        );
        this.loading = false;
        const result = response.data.data;
        for (const index in result.itineraries) {
          const element = result.itineraries[index];
          // this.allFlights.push({
          //   arv: element['airItineraryWSResponse'],
          //   price: element[0].pricingInfoWSResponse.totalFare
          // });
          this.allFlights.push(element);
        }
        console.log(result.itineraries);
        // this.allFlights = result.itineraries;
      } catch (e) {
        this.loading = false;
      }
    },
    async bookFlight(refId) {
      this.loading = true;

      try {
        let response = await axios.post(
          `https://travel-flight-api.brakket.tech/v1/api/flight/itinerary/book`,
          {
            travellers: [
              {
                title: "Mr",
                firstName: "John",
                middleName: "Arabiop",
                lastName: "Doe",
                dobYY: "1978",
                dobMM: "05",
                dobDD: "04",
                passengerCat: "ADT",
                rph: 1,
              },
            ],
            contactDetail: {
              title: "Mrs",
              firstName: "Jane",
              lastName: "mane",
              phoneCountryPrefix: "+234",
              phone: "8127119051",
              email: "kkter@gmail.com",
            },
            ref: refId,
            session: this.sessionId,
            paymentMethodCode: "BOH",
          },
          {
            headers: {
              "x-api-auth": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBOYW1lIjoiVHJhdmVsQmV0YS1XZWIiLCJ0b2tlbiI6IjZEMTZGNzQ5RUMxMTlDRTU3NEY1MjQ1QTcxRDg2MDI2OTM1RDRCQzAyN0E1MzYzMTk4RDlGNUY2QTAzMTI5QzQiLCJjb21tb25GaWVsZHMiOnsiaWQiOjEsImNyZWF0ZWRBdCI6IjIwMjEtMDItMTEgMTI6NTU6NTAuMCIsInZlcnNpb24iOiIifX0.B-X78zAsFl5Dqazbo0YxZ4mw27f_vDIdh5Zbq_AoWbI`,
            },
          }
        );
        await this.createFlight();
        this.loading = false;
        Vue.notify({
            group: "loggedIn",
            type: "success",
            text: "Flight booking created successfully",
          });
          // setTimeout(function(){
            this.$router.push('/admin/flights');
          // }, 3000);
        const result = response.data;
        /* for (const index in result.itineraries) {
          const element = result.itineraries[index];
          // this.allFlights.push({
          //   arv: element['airItineraryWSResponse'],
          //   price: element[0].pricingInfoWSResponse.totalFare
          // });
          this.allFlights.push(element);
        } */
        console.log(result);
        // this.allFlights = result.itineraries;
      } catch (e) {
        this.loading = false;
      }
    },
    processPayment(response, ref) {
      window.alert("Payment recieved: ");
      console.log(response);
      this.hasPaid = true;
      this.paidRef = ref;
    },
    setPaidRef(ref) {
      alert(ref);
      this.paidRef = ref;
    },
    close: () => {
      console.log("You closed checkout page");
    },
   async  createFlight(){
     try{

     
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
     let result = await api

        .post(
          "flight_bookings/agentAdd",
          {
            traveller_id: "2",
            flying_from: this.dptCity,
            flying_to: this.arvCity,
            flight_class: "Economy",
            departure_date: "05-12-2021",
            no_of_passengers: "5",
            no_of_adult: "1",
            no_of_children: "0",
            no_of_infant: "1",
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(result.data);

     }catch(e){
        console.log(e);
     }
       /* .then((response) => {
          // this.loading = false;
          // Vue.notify({
          //   group: "loggedIn",
          //   type: "success",
          //   text: response.data.message,
          // });
          console.log(response.data);
        })
        .catch((error) => {
          // this.loading = false;
          console.log(error.response);
          // Vue.notify({
          //   group: "loggedIn",
          //   type: "error",
          //   text: "Unable to complete, please try again!",
          // });
        }); */
    }
  },
  watch: {
    async search(val) {
      // Items have already been loaded
      if (this.isLoading) return;

      this.isLoading = true;

      try {
        let response = await axios.get(
          `https://travel-flight-api.brakket.tech/v1/api/flight/airports?city=${val}`,
          {
            headers: {
              "x-api-auth": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBOYW1lIjoiVHJhdmVsQmV0YS1XZWIiLCJ0b2tlbiI6IjZEMTZGNzQ5RUMxMTlDRTU3NEY1MjQ1QTcxRDg2MDI2OTM1RDRCQzAyN0E1MzYzMTk4RDlGNUY2QTAzMTI5QzQiLCJjb21tb25GaWVsZHMiOnsiaWQiOjEsImNyZWF0ZWRBdCI6IjIwMjEtMDItMTEgMTI6NTU6NTAuMCIsInZlcnNpb24iOiIifX0.B-X78zAsFl5Dqazbo0YxZ4mw27f_vDIdh5Zbq_AoWbI`,
            },
          }
        );
        this.isLoading = false;
        // Vue.notify({
        //   group: "loggedIn",
        //   type: "success",
        //   text: "New traveller added successfully!",
        // });
        console.log(response.data);
        const results = response.data.data;
        for (const index in results) {
          const result = results[index];
          this.airportCities.push({
            name: `${result.airportName} ${result.airCode}`,
            code: result.airCode,
          });
        }
      } catch (e) {
        this.isLoading = false;
        console.log(e.response);
      }
    },
    async searchTwo(val) {
      // Items have already been loaded
      if (this.isLoading) return;

      this.isLoading = true;

      try {
        let response = await axios.get(
          `https://travel-flight-api.brakket.tech/v1/api/flight/airports?city=${val}`,
          {
            headers: {
              "x-api-auth": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBOYW1lIjoiVHJhdmVsQmV0YS1XZWIiLCJ0b2tlbiI6IjZEMTZGNzQ5RUMxMTlDRTU3NEY1MjQ1QTcxRDg2MDI2OTM1RDRCQzAyN0E1MzYzMTk4RDlGNUY2QTAzMTI5QzQiLCJjb21tb25GaWVsZHMiOnsiaWQiOjEsImNyZWF0ZWRBdCI6IjIwMjEtMDItMTEgMTI6NTU6NTAuMCIsInZlcnNpb24iOiIifX0.B-X78zAsFl5Dqazbo0YxZ4mw27f_vDIdh5Zbq_AoWbI`,
            },
          }
        );
        this.isLoading = false;
        // Vue.notify({
        //   group: "loggedIn",
        //   type: "success",
        //   text: "New traveller added successfully!",
        // });
        console.log(response.data);
        const results = response.data.data;
        for (const index in results) {
          const result = results[index];
          this.airportCitiesTwo.push({
            name: `${result.airportName} ${result.airCode}`,
            code: result.airCode,
          });
        }
      } catch (e) {
        this.isLoading = false;
        console.log(e.response);
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
