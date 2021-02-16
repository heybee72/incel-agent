<template>
  <div class="session-wrapper">
    <!-- <div class="session-left">
			<session-slider-widget></session-slider-widget>
		</div> -->
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="session-content">
          <!-- <img 
						:src="appLogo"
						class="img-responsive mb-4" 
						width="78" 
						height="78" 
					/> -->
          <br />

          <br />
          <h2 class="mb-4 mt-4">Sign Up</h2>
          <p class="fs-14">
            {{ $t("message.enterUsernameAndPasswordToAccessControlPanelOf") }}
            Incel Agent Dashboard.
          </p>
          <v-form v-model="valid" class="mb-5">
            <v-text-field
              label="Fullname"
              v-model="fullname"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              label="E-mail ID"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              label="Phone number"
              v-model="phone"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              label="Username"
              v-model="username"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              label="Company"
              v-model="company"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              label="Country"
              v-model="country"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              label="Business Address"
              v-model="address"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-text-field
              label="Branches"
              v-model="branch"
              :rules="passwordRules"
              required
            ></v-text-field>
            <label>Add Profile image: </label>
            <input
            type="file"
              ref="file"
              v-on:change="handleFileUpload"
            />
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-checkbox
              color="primary"
              label="Remember me"
              v-model="checkbox"
            ></v-checkbox>
            <router-link class="mb-2" to="/session/login"
              >Already have an account?</router-link
            >
            <div>
              <v-btn large @click="submit" block color="primary" class="mb-2"
                >SIGN UP NOW</v-btn
              >
              <!-- <v-btn
                large
                @click="onCreateAccount"
                block
                color="warning"
                class="mb-2"
                >{{ $t("message.createAccount") }}</v-btn
              > -->
            </div>
            <p>{{ $t("message.bySigningUpYouAgreeTo") }} Incel</p>
            <router-link to="">{{ $t("message.termsOfService") }}</router-link>
          </v-form>
          <div class="session-social-links d-inline-block">
            <!-- <ul class="list-unstyled mb-2">
              <li @click="signInWithFacebook">
                <span class="facebook-bg session-icon">
                  <i class="ti-facebook"></i>
                </span>
              </li>
              <li @click="signInWithGoogle">
                <span class="google-bg session-icon">
                  <i class="ti-google"></i>
                </span>
              </li>
              <li @click="signInWithTwitter">
                <span class="twitter-bg session-icon">
                  <i class="ti-twitter-alt"></i>
                </span>
              </li>
              <li @click="signInWithGithub">
                <span class="github-bg session-icon">
                  <i class="ti-github"></i>
                </span>
              </li>
            </ul> -->
            <!-- <v-btn color="error" @click="signinWithAuth0">
              Signin With Auth0
            </v-btn> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase/app";
// import { mapGetters } from "vuex";
// import SessionSliderWidget from "Components/Widgets/SessionSlider";
import AppConfig from "Constants/AppConfig";

import AuthService from "../../auth/AuthService";

const auth = new AuthService();
// const { login, logout, authenticated, authNotifier } = auth;

const { login } = auth;

export default {
  components: {
    // SessionSliderWidget
  },
  data() {
    return {
      checkbox: false,
      valid: false,
      email: "demo@example.com",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      password: "",
      passwordRules: [(v) => !!v || "This field is required"],
      fullname: "",
      phone: "",
      username: "",
      country: "",
      company: "",
      address: "",
      branch: "",
      file: "",
      appLogo: AppConfig.appLogo2,
      brand: AppConfig.brand,
    };
  },

  methods: {
    submit() {
        let formData = new FormData();
    //   const user = {
    //     email: this.email,
    //     password: this.password,
    //   };
        formData.append('name', this.fullname);
        formData.append('email', this.email);
        formData.append('phone', this.phone);
        formData.append('username', this.username);
        formData.append('company', this.company);
        formData.append('country', this.country);
        formData.append('business_address', this.address);
        formData.append('branches', this.branch);
        formData.append('password', this.password);
        formData.append('profile_image', this.file);

        this.$store.dispatch("signUpUser", formData);

      // this.$store.dispatch("signinUserInFirebase", {
      //   user,
      // });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    //   alert("jjj")
    },
    signInWithFacebook() {
      this.$store.dispatch("signinUserWithFacebook");
    },
    signInWithGoogle() {
      this.$store.dispatch("signinUserWithGoogle");
    },
    signInWithTwitter() {
      this.$store.dispatch("signinUserWithTwitter");
    },
    signInWithGithub() {
      this.$store.dispatch("signinUserWithGithub");
    },
    onCreateAccount() {
      this.$router.push("/session/sign-up");
    },
    signinWithAuth0() {
      login();
    },
  },
};
</script>
