<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-row>
        <app-card
          :heading="$t('message.carRental')"
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <v-card-title>
            <!-- <v-spacer></v-spacer> -->
            <v-text-field
              append-icon="search"
              label="Search"
              placeholder="Start typing ..."
              single-line
              hide-details
              v-model="search"
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" depressed @click="addCarRentalPage"
              ><v-icon color="white">mdi-plus</v-icon> Create</v-btn
            >
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            item-key="name"
          >
            <!-- <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                  {{ props.header.text }}
                </span>
                <span>
                  {{ props.header.text }}
                </span>
              </v-tooltip>
            </template> -->
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.name }}</td>

                <td>{{ row.item.pickup_location }}</td>
                <td>{{ row.item.destination }}</td>
                <td>{{ getType(row.item.journey_type) }}</td>
                <td>{{ row.item.no_of_passengers }}</td>
                <td>{{ row.item.car_type }}</td>
                <!-- <td>
                  <v-btn class="mx-2" dark small color="blue">View</v-btn>
                </td> -->
              </tr>
            </template>
          </v-data-table>
        </app-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "Api";

export default {
  data() {
    return {
      loader: true,
      search: "",
      selected: [],
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Pickup location", value: "pickup_location" },
        { text: "Destination", value: "destination" },
        { text: "Journey Type", value: "journey_type" },
        { text: "No. of passengers", value: "no_of_passengers" },
        { text: "Car Type", value: "car_type" },
        // { text: "Status", value: "status" },
        // { text: "Action", value: "action" },
      ],
      items: [],
    };
  },
  mounted() {
    this.getTablesData();
  },
  methods: {
    getTablesData() {
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      //   let user = this.$store.getters.getUser;
      console.log(user.token);
      api
        .get("car_rentals/agentViewBooking", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          let result = response.data;
          console.log(result);
          for (const index in result.car_rental) {
            console.log(result.car_rental[index]);
            this.items.push({
              name: `${result.car_rental[index].fullname}`,
              pickup_location: `${result.car_rental[index].pickup_location}`,
              destination: `${result.car_rental[index].destination}`,
              journey_type: `${result.car_rental[index].journey_type}`,
              payment_status: `${result.car_rental[index].payment_status}`,
              pickup_date: `${result.car_rental[index].pickup_date}`,
              no_of_passengers: `${result.car_rental[index].no_of_passengers}`,
              car_type: `${result.car_rental[index].car_type}`,
              phone: `${result.car_rental[index].phone}`,
            });
            // console.log(result.traveller[index].fullname);
          }
          this.loader = false;
          // this.loader = false;
          // this.items = response.data;
        })
        .catch((error) => {
          this.loader = false;
          console.log(error.response);
        });
    },
    getType(type){
        switch(type){
            case 'single_journey':
                return "Single Journey";
            case 'roundtrip':
                return "Round Trip";
            case 'all_day':
                return "All Day";
            default: 
                return "N/A";
        }
    },
    addCarRentalPage() {
      // alert('ll');
      this.$router.push("/admin/car/rental");
    },
  },
};
</script>
