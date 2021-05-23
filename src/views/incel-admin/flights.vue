<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-row>
        <app-card
          :heading="$t('message.manageFlightBooking')"
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
            <v-spacer></v-spacer>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            v-model="selected"
            item-key="name"
          >
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                  {{ props.header.text }}
                </span>
                <span>
                  {{ props.header.text }}
                </span>
              </v-tooltip>
            </template>
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.result }}</td>
                <td>{{ row.item.calories }}</td>
                <td>{{ row.item.carbs }}</td>
                <td>{{ row.item.carbs }}</td>
                <td>
                  <v-chip class="ma-2" dark small color="green" label>
                    {{ row.item.protein }}
                  </v-chip>
                </td>
                <td>
                  <v-btn class="mx-2" dark small color="green">View</v-btn>
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
          text: "Booking number",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "From", value: "calories" },
        { text: "To", value: "fat" },
        { text: "Traveller", value: "carbs" },
        { text: "Rate", value: "carbs" },
        { text: "Status", value: "protein" },
        { text: "Actions", value: "action" },
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
      api
        .post(
          "flight_bookings/agentViewBooking",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          // print(response.data);
          this.loader = false;
          console.log(response.data);
          // this.items = response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
</script>
