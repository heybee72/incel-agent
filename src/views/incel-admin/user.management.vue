<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-row>
        <app-card
          :heading="$t('message.userManagement')"
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <v-card-title
            >Active Users
            <v-spacer></v-spacer>
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
            <div class="push-top">
            <v-select
              :items="['hhh', 'kkkk']"
              label="Filter users"
              dense
              single-line
              
            ></v-select>
            </div>
            <v-spacer></v-spacer>
            <v-btn color="green"><v-icon color="white">mdi-plus</v-icon></v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            v-model="selected"
            item-key="name"
            show-select
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
            <template slot="items" slot-scope="props">
              <td>
                <v-checkbox
                  color="primary"
                  hide-details
                  v-model="props.selected"
                ></v-checkbox>
              </td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.calories }}</td>
              <td>{{ props.item.fat }}</td>
              <td>{{ props.item.carbs }}</td>
              <td>{{ props.item.protein }}</td>
              <td>{{ props.item.sodium }}</td>
              <td>{{ props.item.calcium }}</td>
              <td>{{ props.item.iron }}</td>
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
          text: "Last name",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "First Name", value: "calories" },
        { text: "E-mail", value: "fat" },
        { text: "Confirmed", value: "carbs" },
        { text: "Role(s)", value: "protein" },
        { text: "Last Updated", value: "sodium" },
        { text: "Created On", value: "calcium" },
        { text: "Socials", value: "iron" },
      ],
      items: [],
    };
  },
  mounted() {
    this.getTablesData();
  },
  methods: {
    getTablesData() {
      api
        .get("vuely/tablesData.js")
        .then((response) => {
          this.loader = false;
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
  .push-top{
      margin-top: 32px;
  }
</style>
