<!-- Side Structure -->
<template>
	<div class="sidebar" :class="sidebarSelectedFilter.class">
		<vue-perfect-scrollbar class="scroll-area" :settings="settings">
        <div class="transparent navigation">
          <v-list>
				<!-- <applogo></applogo> -->
				<user-block></user-block>
				<template v-for="(category, key) in menus">
					<div :key="key">
						<div class="px-2 py-2 sidebar-main-title">
							<span>{{$t(key)}}</span>
						</div>
						<template v-for="item in category">
							<template v-if="item.items != null">
								<v-list-group
									:ripple="false"
									:key="item.title"
									prepend-icon="arrow_right"
									append-icon=""
									no-action
									v-model="item.active"
								>
									<v-list-item slot="activator" :ripple="false">
										<v-list-item-content>
											<v-list-item-title  v-if="item.items!= null">
												<i class="mr-3 zmdi" :class="item.action"></i>
												<small >{{ textTruncate($t(item.title)) }}</small>
												<template  v-if = "item.label == 'New'">
													<span class="sidebar-label">{{item.label}}</span>
												</template>
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
									<v-list-item
										:ripple="false"
										v-for="subItem in item.items"
										v-bind:key="subItem.title"
										:to="!subItem.exact ? `/${getCurrentAppLayoutHandler() + subItem.path}` : subItem.path"
									>
									<template v-if="subItem !== null">
										<v-list-item-content>
											<v-list-item-title>
												{{ $t(subItem.title) }}
												<template v-if= "subItem.label == 'New'">
													<span class="sidebar-label">New</span>
												</template>
											</v-list-item-title>
										</v-list-item-content>
									</template>

									</v-list-item>
								</v-list-group>
							</template>	
							<template v-else>
								<v-list-group
									:ripple="false"
									class="not-submenu"
									:key="item.title"
									prepend-icon=""
									append-icon=""
									no-action
									v-model="item.active"
								>
									<v-list-item slot="activator" :ripple="false">
										<v-list-item-content >
											<v-list-item-title>
												<router-link :to="!item.exact ? `/${getCurrentAppLayoutHandler() + item.path}` : item.path">
													<i class="mx-4 zmdi" :class="item.action"></i>
													<small>{{ textTruncate($t(item.title)) }}</small>
													<template v-if= "item.label == 'New'">
														<span class="sidebar-label">New</span>
													</template>
												</router-link>
											</v-list-item-title>
										</v-list-item-content>
									</v-list-item>
								</v-list-group>
							</template>	
						</template>
					</div>
				</template>
          </v-list>
        </div>
		</vue-perfect-scrollbar>
	</div>
</template>

<script>
import UserBlock from "./UserBlock";
import { textTruncate, getCurrentAppLayout } from "Helpers/helpers";
import { mapGetters } from "vuex";
// import applogo from "Components/AppLogo/AppLogo";

export default {
  data() {
    return {
      settings: {
        maxScrollbarLength: 160
      }
    };
  },
  components: {
    UserBlock,
    // applogo
  },
  computed: {
    ...mapGetters(["sidebarSelectedFilter", "menus"])
  },
  methods: {
    textTruncate(text) {
      return textTruncate(text, 18);
    },
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    }
  }
};
</script>

<style scoped>
  small{
	color: white;
	font-size: 12px;
	font-weight: normal;
  }
  .sidebar-main-title span{
	color: white;
	text-transform: uppercase;
	font-size: 13px;
  }
</style>
