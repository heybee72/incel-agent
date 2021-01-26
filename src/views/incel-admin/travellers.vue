<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template> -->
        <v-card>
          <v-card-title>
            <span class="headline">Create new traveller</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal first name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal middle name"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Legal last name*"
                    hint="example of persistent helper text"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Age*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :items="[
                      'Skiing',
                      'Ice hockey',
                      'Soccer',
                      'Basketball',
                      'Hockey',
                      'Reading',
                      'Writing',
                      'Coding',
                      'Basejump',
                    ]"
                    label="Interests"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-row>
        <app-card
          :heading="$t('message.travellers')"
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
            <!-- <template v-slot:activator="{ on, attrs }"> -->
              <v-btn color="green" @click="open">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn>
            <!-- </template> -->
            <!-- <v-btn v-click="(dialog = true)" color="green">
                <v-icon color="white">mdi-plus</v-icon>
              </v-btn> -->
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
            <template v-slot:item="row">
              <tr>
                <td>
                  <v-checkbox
                    color="primary"
                    hide-details
                    v-model="row.selected"
                  ></v-checkbox>
                </td>
                <td>{{ row.item.name }}</td>

                <td>{{ row.item.result }}</td>
                <td>{{ row.item.calories }}</td>
                <td>{{ row.item.carbs }}</td>
                <td>
                  <v-chip class="ma-2" dark color="green" label>
                    {{ row.item.protein }}
                  </v-chip>
                </td>
                <td>
                  <v-btn class="mx-2" dark small color="green">View</v-btn>
                  <v-btn dark small color="red">Deactivate</v-btn>
                  <!-- <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="pink"
                    @click="onButtonClick(row.item)"
                  >
                    <v-icon dark>mdi-heart</v-icon>
                  </v-btn> -->
                </td>
              </tr>
            </template>
            <!-- <template slot="items" slot-scope="props">
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
            </template> -->
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
      dialog: false,
      selected: [],
      headers: [
        {
          text: "Fullname",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "calories" },
        { text: "Country", value: "fat" },
        { text: "State", value: "carbs" },
        { text: "Status", value: "protein" },
        { text: "Actions", value: "action" },
      ],
      items: [],
    };
  },
  mounted() {
    this.getTablesData();
  },
  methods: {
    open(){
      this.dialog = true;
    },
    getTablesData() {
      api
        .get("vuely/tablesData.js")
        .then((response) => {
          print(response.data);
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
