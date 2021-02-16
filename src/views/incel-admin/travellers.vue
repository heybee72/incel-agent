<template>
  <div>
    <page-title-bar></page-title-bar>
    <app-section-loader :status="loader"></app-section-loader>
    <v-container fluid class="grid-list-xl py-0 mt-n3">
      <!-- profile image view -->
      <v-dialog v-model="imageDialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Profile image</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <h4 v-if="profileImage == null || profileImage == ''">
                No profile image available yet
              </h4>
              <img
                v-if="profileImage != null && profileImage != ''"
                :src="profileImage"
              />
              <br />
              <br />
              <input type="file" ref="file" v-on:change="handleFileUpload" />
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="imageDialog = false">
              Close
            </v-btn>
            <v-btn
              dark
              :disabled="loading"
              color="blue darken-1"
              @click="updateTravellerImage"
            >
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- profile image view end -->

      <!-- profile single view -->
      <v-dialog v-model="profileDialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <h4>
                        Fullname: <small>{{ currentProfile.title }}. {{ currentProfile.fullname }}</small>
                      </h4>
                    </v-col>
                     <v-col cols="12" sm="6" md="6">
                      <h4>
                        Email: <small>{{ currentProfile.email }}</small>
                      </h4>
                    </v-col>
                  </v-row>
                   <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <h4>
                        Address: <small>{{ currentProfile.address }}</small>
                      </h4>
                    </v-col>
                     <v-col cols="12" sm="6" md="6">
                      <h4>
                        Country: <small>{{ currentProfile.country }}</small>
                      </h4>
                    </v-col>
                  </v-row>
                  <!--  -->
                   <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <h4>
                        Phone: <small>{{ currentProfile.phone }}</small>
                      </h4>
                    </v-col>
                     <v-col cols="12" sm="6" md="6">
                      <h4>
                        D.O.B.: <small>{{ currentProfile.dob }}</small>
                      </h4>
                    </v-col>
                  </v-row>
                  <!--  -->
                   <!--  -->
                   <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <h4>
                        Passport number: <small>{{ currentProfile.passport_number }}</small>
                      </h4>
                    </v-col>
                     <v-col cols="12" sm="6" md="6">
                      <h4>
                        Zip code: <small>{{ currentProfile.zip }}</small>
                      </h4>
                    </v-col>
                  </v-row>
                  <!--  -->
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="profileDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- profile single view end -->

      <v-dialog v-model="dialog" persistent max-width="800px">
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
              <v-form ref="form" v-model="isFormValid">
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" sm="6" md="2">
                        <v-text-field
                          label="Title"
                          v-model="fields['title']"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" :md="isEditMode ? '5' : '4'">
                        <v-text-field
                          label="Fullname *"
                          v-model="fields['fullname']"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" :md="isEditMode ? '1' : '3'">
                        <v-text-field
                          label="Email *"
                          v-show="!isEditMode"
                          v-model="fields['email']"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Phone no. *"
                          v-model="fields['phone']"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" sm="6" md="2">
                        <v-text-field
                          label="Zip code"
                          v-model="fields['zip']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Country *"
                          v-model="fields['country']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="State *"
                          v-model="fields['state']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="City *"
                          v-model="fields['city']"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Date of birth *"
                          type="date"
                          v-model="fields['dob']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          label="Address *"
                          aria-multiline="true"
                          v-model="fields['address']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field
                          label="Emergency Phone number *"
                          v-model="fields['emergency_phone']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          label="Passport number *"
                          v-model="fields['passport_number']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field
                          label="Country of issue *"
                          aria-multiline="true"
                          v-model="fields['country_of_issue']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          type="date"
                          v-model="fields['date_issue']"
                          label="Date issued"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          type="date"
                          label="Expiry Date *"
                          v-model="fields['exp_date']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="5">
                        <v-text-field
                          label="Emergency Email *"
                          aria-multiline="true"
                          v-model="fields['emergency_email']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          required
                          label="Emergency Address"
                          v-model="fields['emergency_address']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Insurance Company *"
                          aria-multiline="true"
                          v-model="fields['insurance_company']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          required
                          label="Insurance Phone Number"
                          v-model="fields['insurance_phone']"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              v-show="!isEditMode"
              dark
              :disabled="loading"
              color="blue darken-1"
              @click="addNewTraveller"
            >
              Save
            </v-btn>
            <v-btn
              v-show="isEditMode"
              dark
              :disabled="loading"
              color="blue darken-1"
              @click="updateTraveller"
            >
              Update
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
                <td>{{ `${row.item.title}. ${row.item.fullname}` }}</td>

                <td>{{ row.item.email }}</td>
                <td>{{ row.item.country }}</td>
                <td>{{ row.item.state }}</td>
                <td>
                  {{ row.item.phone }}
                </td>
                <td>
                  <v-btn
                    class="mx-2"
                    dark
                    x-small
                    color="green"
                    @click="profileModal(row.item)"
                    >View</v-btn
                  >
                  <v-btn
                    dark
                    x-small
                    @click="updateModal(row.item)"
                    color="blue"
                    >Update</v-btn
                  >
                  <v-btn
                    class="mx-2"
                    dark
                    x-small
                    color="secondary"
                    @click="openImageDialog(row.item)"
                  >
                    <v-icon small dark>mdi-image</v-icon>
                  </v-btn>
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
import Vue from "vue";
import api from "Api";

export default {
  data() {
    return {
      isFormValid: false,
      loading: false,
      loader: true,
      search: "",
      profileImage: "",
      currentUserId: "",
      dialog: false,
      imageDialog: false,
      profileDialog: false,
      isEditMode: false,
      file: "",
      currentProfile: {},
      fields: {
        title: "",
        fullname: "",
        email: "",
        phone: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 20 || "Max 20 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      headers: [
        {
          text: "Fullname",
          align: "left",
          sortable: false,
          value: "fullname",
        },
        { text: "Email", value: "email" },
        { text: "Country", value: "country" },
        { text: "State", value: "state" },
        { text: "Phone", value: "phone" },
        { text: "Actions", value: "action" },
      ],
      items: [],
    };
  },
  // computed: {
  //   user : this.$store.getters.getUser
  // },
  mounted() {
    this.getTablesData();
  },
  methods: {
    open() {
      // for (let prop in this.fields) {
      //   delete this.fields[prop];
      // }
      this.fields = {};
      this.isEditMode = false;
      this.dialog = true;
    },
    openImageDialog(user) {
      // for (let prop in this.fields) {
      //   delete this.fields[prop];
      // }
      // this.fields = {};
      // this.isEditMode = false;
      this.profileImage = user.profile_image;
      this.currentUserId = user.id;
      this.imageDialog = true;
    },
    getTablesData() {
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      api
        .get("travellers/agent_view", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          let result = response.data;
          console.log(result);
          for (const index in result.traveller) {
            const item = result.traveller[index];
            this.items.push({
              id: item.id,
              title: item.title,
              fullname: item.fullname,
              email: item.email,
              profile_image: item.profile_image,
              dob: this.formatDate(item.dob),
              address: item.address,
              emergency_address: item.emergency_address,
              emergency_email: item.emergency_email,
              emergency_phone: item.emergency_phone,
              city: item.city,
              country: item.country,
              country_of_issue: item.country_of_issue,
              state: item.state,
              phone: item.phone,
              exp_date: this.formatDate(item.exp_date),
              date_issue: this.formatDate(item.date_issue),
              insurance_company: item.insurance_company,
              insurance_phone: item.insurance_phone,
              passport_number: item.passport_number,
              zip: item.zip,
            });
            // console.log(result.traveller[index].fullname);
          }
          this.loader = false;
          // this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addNewTraveller() {
      if (!this.isFormValid) {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Fill all required fields",
        });
        return;
      }
      // Vue.notify({
      //   group: "loggedIn",
      //   type: "success",
      //   text: "Agent Logged In Successfully!",
      // });
      this.loading = true;
      // console.log(this.fields);
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      try {
        let response = await api.post("travellers/add", this.fields, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        this.loading = false;
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "New traveller added successfully!",
        });
        console.log(response.data);
      } catch (e) {
        this.loading = false;
        if (e.response.status) {
          Vue.notify({
            group: "loggedIn",
            type: "error",
            text: "Make sure all fields are filled",
          });
        } else {
          Vue.notify({
            group: "loggedIn",
            type: "error",
            text: "Unable to add new traveller, please try again",
          });
        }
        console.log("error occured " + JSON.stringify(e.response.data));
      }
    },
    async updateTraveller() {
      // alert(this.fields.id);
      this.loading = true;
      // console.log(this.fields);
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      try {
        let response = await api.put(
          `travellers/update/${this.fields.id}`,
          this.fields,
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
          text: "Traveller updated successfully!",
        });
        console.log(response.data);
      } catch (e) {
        this.loading = false;
        if (e.response.status) {
          Vue.notify({
            group: "loggedIn",
            type: "error",
            text: "Make sure all fields are filled",
          });
        } else {
          Vue.notify({
            group: "loggedIn",
            type: "error",
            text: "Unable to update traveller, please try again",
          });
        }
        console.log("error occured " + JSON.stringify(e.response.data));
      }
    },
    async updateTravellerImage() {
      let user =
        typeof this.$store.getters.getUser == "string"
          ? JSON.parse(this.$store.getters.getUser)
          : this.$store.getters.getUser;
      let formData = new FormData();
      formData.append("id", this.currentUserId);
      formData.append("profile_image", this.file);
      this.loading = true;
      try {
        const response = await api.post(
          "travellers/profile_image_update",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${user.token}`,
            },
          }
        ); // Success.
        this.loading = false;
        console.log(response.data);
        Vue.notify({
          group: "loggedIn",
          type: "success",
          text: "Traveller profile image updated successfully!",
        });
        this.profileImage = response.data.traveller.profile_image;
        // delete user["password"];
        // user["token"] = response.data.token;
        // context.commit('signUserSuccess');
      } catch (e) {
        this.loading = false;
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Unable to update image, please try again!",
        });
        console.log(e.response);
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      //   alert("jjj")
    },
    profileModal(item) {
      this.currentProfile = item;
      this.profileDialog = true;
    },
    updateModal(item) {
      this.fields = item;
      this.isEditMode = true;
      this.dialog = true;
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
};
</script>
