<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-row>
        <app-card
          :heading="$t('message.tourBookings')"
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
            <v-btn color="success" depressed @click="addTourBookingPage"><v-icon color="white">mdi-plus</v-icon> Book new tour</v-btn>
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

                <td>{{ row.item.tour }}</td>
                <td>{{ row.item.dob }}</td>
                <td>{{ row.item.children_price }}</td>
                <td>{{ row.item.adult_price }}</td>
                <td>{{ row.item.passport_number }}</td>
                <td>{{ row.item.country_of_issue }}</td>
                <td>
                  <v-btn class="mx-2" dark small color="success">View</v-btn>
                </td>
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
        { text: "Tour", value: "tour" },
        { text: "Date of birth", value: "dob" },
        { text: "Children Price", value: "children_price" },
        { text: "Adult rice", value: "adult_price" },
        { text: "Passport number", value: "passport_number" },
        { text: "Country of issue", value: "country_of_issue" },
        { text: "Action", value: "action" },
      ],
      items: [],
    };
  },
  mounted() {
     let user =
      typeof this.$store.getters.getUser == "string"
        ? JSON.parse(this.$store.getters.getUser)
        : this.$store.getters.getUser;
    this.getTablesData(user);
  },
  methods: {
    getTablesData(user) {
      // let user = this.$store.getters.getUser;
      console.log(user.token);
      api
        .get("tour_bookings/agentViewBooking", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          let result = response.data;
          console.log(result);
          for (const index in result.tourBooking) {
            this.items.push({
              name: `${result.tourBooking[index].fullname}`,
              tour: `${result.tourBooking[index].tour}`,
              dob: `${result.tourBooking[index].dob}`,
              children_price: `${result.tourBooking[index].children_price}`,
              adult_price: `${result.tourBooking[index].adult_price}`,
              passport_number: `${result.tourBooking[index].passport_number}`,
              country_of_issue: `${result.tourBooking[index].country_of_issue}`,
            });
            // console.log(result.traveller[index].fullname);
          }  
          this.loader = false;
          // this.items = response.data;
        })
        .catch((error) => {
          this.loader = false;
          console.log(error.response);
        });
    },
    addTourBookingPage(){
      // alert('ll');
      this.$router.push('/admin/tourbookings/add')
    }
  },
};
</script>
