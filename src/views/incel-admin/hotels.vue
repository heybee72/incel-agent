<template>
  <div>
    <page-title-bar></page-title-bar>

    <v-container class="grid-list-xl pt-0">
      <div class="crypto-dash-wrap">
        <v-row class="border-rad-sm overflow-hidden">
          <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pa-0">
            <div style="padding: 20px" v-if="isSelectingRoom == false">
              <v-btn
                style="margin-bottom: 20px"
                v-show="allHotels.length > 0"
                color="red"
                dark
                @click="allHotels = []"
                ><v-icon color="white">mdi-cancel</v-icon> Clear Booking</v-btn
              >
              <br />
              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                color="deep-purple accent-4"
              ></v-progress-linear>
              <v-card
                v-for="(hotel, index) in allHotels"
                :key="index"
                elevation="3"
                shaped
                class="my-12"
                style="margin-bottom: 12px"
              >
                <v-row>
                  <v-col md="10">
                    <v-card-title>{{ hotel["name"] }}</v-card-title>
                    <v-card-subtitle
                      >{{ hotel["address"] }} /
                      <strong>{{ hotel["phone"] }}</strong></v-card-subtitle
                    >
                    <div v-if="!hotel['show_all']">
                      <v-card-text>
                        {{ hotel["desc"] | truncate(300, "...") }}
                      </v-card-text>
                      <a
                        v-if="hotel['desc'].length > 300"
                        style="margin-left: 16px"
                        @click="hotel['show_all'] = true"
                        >Read more</a
                      >
                    </div>
                    <div v-else>
                      <v-card-text>
                        {{ hotel["desc"] }}
                      </v-card-text>
                      <a
                        v-if="hotel['desc'].length > 300"
                        style="margin-left: 16px"
                        @click="hotel['show_all'] = false"
                        >Read less</a
                      >
                    </div>
                  </v-col>
                  <v-col md="2">
                    <v-btn
                      color="blue"
                      @click="() => fetchRooms(hotel['id'])"
                      dark
                      >View rooms</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <div else>
              <v-btn
                style="margin-bottom: 20px"
                v-show="allHotels.length > 0"
                color="red"
                dark
                @click="isSelectingRoom = false"
                ><v-icon color="white">mdi-cancel</v-icon> Clear Booking</v-btn
              >
              <br />
              <!-- <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                color="deep-purple accent-4"
              ></v-progress-linear> -->
              <h3>{{ allRooms.hotel_name }}</h3>
              <br />
              <v-card
                class="pad-20"
                style="margin-bottom: 20px"
                v-for="(r, roomIndex) in selectedRooms"
                :key="roomIndex"
              >
                <v-card-title>
                  <h2>{{ r.room_name }}</h2>
                  <!-- <v-spacer></v-spacer> -->
                  <!-- <p></p> -->
                </v-card-title>
                <v-card-subtitle>{{ r.room_code }}</v-card-subtitle>

                <v-card-text v-if="Array.isArray(r.rates)">
                  <div v-for="(rate, i) in r.rates" :key="i">
                    <h3>
                      {{ rate.description }}
                      <small>{{ ` ( USD ${rate.amount} ) ` }}</small>
                    </h3>
                    <p v-if="Array.isArray(rate.tariffNotes)">
                      No description available
                    </p>
                    <!-- <p else>{{ rate.tariffNotes }}</p> -->
                    <div v-if="!Array.isArray(rate.tariffNotes)" v-html="rate.tariffNotes"/>
                    <v-btn
                      style="margin: 20px 0px"
                      color="green"
                      dark
                      @click="loading = true"
                      >Book now</v-btn
                    >
                    <hr />
                    <!-- amount: "78.1887"
                      description: "Breakfast"
                      isBookable: "yes"
                      status: "unchecked"
                      tariffNotes -->
                  </div>
                </v-card-text>
                <v-card-text v-if="!Array.isArray(r.rates)">
                  <h3>
                    {{ r.rates.description }}
                    <small>{{ ` ( USD ${r.rates.amount} ) ` }}</small>
                  </h3>
                </v-card-text>
              </v-card>
              <!-- <RoomCard
               
              >
                <v-card-title>
                  <h2>{{ room[roomIndex].room_name }}</h2>
                   <v-spacer></v-spacer> -->
              <!-- <p></p> 
                </v-card-title>
                <v-card-subtitle>{{ room[index].room_name }}</v-card-subtitle> 
                <v-card-text
                  v-if="typeof room[roomIndex]['rates'] === 'object'"
                >
                  <h5>{{ room[roomIndex]['rates'] }}</h5>
                </v-card-text>
                <v-card-text else>
                  <div v-for="(rate, i) in room[roomIndex].rates" :key="i">
                    <h5>{{ rate[i] }}</h5>
                    <v-btn style="margin: 20px" color="green" dark @click="()=>{}"
                      >Book now</v-btn
                    >
                    // amount: "78.1887"
                      description: "Breakfast"
                      isBookable: "yes"
                      status: "unchecked"
                      tariffNotes //
                  </div>
                </v-card-text>
              </RoomCard> -->
            </div>

            <!-- Safe Trade -->
            <v-card v-if="allHotels.length < 1" elevation="2" class="pad-20">
              <!-- <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                color="deep-purple accent-4"
              ></v-progress-linear> -->
              <v-card-title>
                Search Hotels

                <v-spacer></v-spacer>

                <v-btn color="green" dark @click="addTraveller"
                  ><v-icon color="white">mdi-plus</v-icon> Add Traveller</v-btn
                >
              </v-card-title>
              <!-- <v-card-subtitle> Search Hotels </v-card-subtitle> -->
              <hr />
              <v-form ref="form" v-model="isFormValid">
                <!-- <p class="success-text">Other core setup values</p> -->
                <v-row class="border-rad-sm overflow-hidden">
                  <v-col cols="12" class="pa-4">
                    <v-select
                      :items="items"
                      item-text="country"
                      item-value="slug"
                      label="Select country"
                      dense
                      v-model="country"
                      @change="fetchCities"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row
                  class="border-rad-sm overflow-hidden"
                  v-if="cities.length > 0"
                >
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-select
                      :items="cities"
                      item-text="name"
                      item-value="code"
                      label="Select city"
                      dense
                      v-model="city"
                      outlined
                    ></v-select>
                  </v-col>
                  <!-- <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="model"
                      :rules="rules"
                      solo
                      label="Location"
                      placeholder="Enter your desired location"
                    ></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="rooms"
                      :counter="2"
                      :rules="rules"
                      outlined
                      dense
                      label="Number of room(s)"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row
                  class="border-rad-sm overflow-hidden"
                  v-if="cities.length > 0"
                >
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="checkin"
                      type="date"
                      :rules="rules"
                      solo
                      label="Check In"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="checkout"
                      type="date"
                      :rules="rules"
                      label="Check Out"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row
                  class="border-rad-sm overflow-hidden"
                  v-if="cities.length > 0"
                >
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="adult"
                      :counter="2"
                      :rules="rules"
                      solo
                      label="Number of adults(s)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="6" xl="6" class="pa-4">
                    <v-text-field
                      v-model="children"
                      :counter="2"
                      :rules="rules"
                      solo
                      label="Number of child(ren)"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <br />
                <br />
                <v-row align="center" justify="space-around">
                  <!-- <v-btn @click="leavePage" depressed color="error"> Cancel </v-btn> -->
                  <v-btn
                    depressed
                    :disabled="!isFormValid || loading || cities.length < 1"
                    color="success"
                    @click="fetchHotels"
                  >
                    Search For Hotel
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
import Dataset from "Dataset";
import api from "Api";
// import RoomCard from "./hotels/room.vue";

export default {
  components: {
    // RoomCard,
  },
  data() {
    return {
      isFormValid: false,
      loading: false,
      isSelectingRoom: false,
      max: 1000,
      model: "",
      country: "",
      city: "",
      checkin: "",
      checkout: "",
      adult: "",
      children: "",
      rooms: 0,
      items: [],
      cities: [],
      allHotels: [],
      allRooms: {
        hotel_id: "",
        hotel_name: "",
      },
      selectedRooms: [],
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
  filters: {
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
  mounted() {
    const dataset = Dataset.countries;
    for (const index in dataset) {
      this.items.push({
        country: dataset[index].country,
        slug: dataset[index].slug,
      });
    }
    console.log(this.items);
  },
  methods: {
    async fetchCities() {
      this.loading = true;
      this.cities = [];
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      try {
        const response = await api.post(
          "hotel_bookings/search_cities",
          { country: this.country },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response.data);
        let result = response.data;
        for (const index in result.cities) {
          const city = result.cities[index];
          this.cities.push({
            name: city.name,
            code: city.code,
          });
        }

        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
    async fetchHotels() {
      // alert(this.checkin);
      this.loading = true;
      // this.cities = [];
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      try {
        const response = await api.post(
          "hotel_bookings/search_hotels",
          {
            checkin: this.formatDate(this.checkin),
            checkout: this.formatDate(this.checkout),
            rooms: this.rooms,
            adults: this.adult,
            children: this.children,
            location: this.city,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response.data);
        const result = response.data;
        for (const index in result.hotels) {
          const hotel = result.hotels[index];
          this.allHotels.push({
            id: hotel["@attributes"]["hotelid"],
            desc: hotel["description1"]["language"],
            address: hotel["fullAddress"]["hotelStreetAddress"],
            name: hotel["hotelName"],
            phone: hotel["hotelPhone"],
            show_all: false,
          });
        }
        console.log(this.allHotels);

        // let result = response.data;
        // for (const index in result.cities) {
        //   const city = result.cities[index];
        //   this.cities.push({
        //     name: city.name,
        //     code: city.code,
        //   });
        // }

        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },
    async fetchRooms(hotelId) {
      // alert(this.checkin);
      this.loading = true;
      this.allRooms = {
        hotel_id: "",
        hotel_name: "",
      };
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      try {
        const response = await api.post(
          "hotel_bookings/search_rooms",
          {
            hotel_id: hotelId,
            checkin: this.formatDate(this.checkin),
            checkout: this.formatDate(this.checkout),
            rooms: this.rooms,
            adults: this.adult,
            children: this.children,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const result = response.data;
        // console.log(result);
        this.isSelectingRoom = true;
        this.allRooms.hotel_id = result.hotel_id;
        this.allRooms.hotel_name = result.hotel_name;
        // this.allRooms.rooms.push(result.rooms);
        for (const index in result.rooms) {
          const room = result.rooms[index];
          console.log(room);
          this.selectedRooms.push(room);
        }
        console.log("all", typeof this.selectedRooms);
        // console.log("all", typeof this.selectedRooms);

        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
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
    leavePage() {
      this.$router.push("/admin/dashboard");
    },
    addTraveller() {
      this.$router.push("/admin/travellers");
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
