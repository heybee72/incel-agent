/**
 * Vuely Global Components
 */
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AppSectionLoader from "Components/AppSectionLoader/AppSectionLoader";
import { RotateSquare2 } from "vue-loading-spinner";

// delete Confirmation Dialog
import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog";

// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";


//crypto slider
import CryptoSlider from "Components/Widgets/CryptoSlider";

// App Card component
import AppCard from 'Components/AppCard/AppCard';

// stats card
import StatsCard from 'Components/StatsCard/StatsCard';
import StatsCardV2 from 'Components/StatsCardV2/StatsCardV2';
import StatsCardIncel from 'Components/StatsCardIncel/StatsCardIncel';

// section tooltip
import SectionTooltip from "Components/SectionTooltip/SectionTooltip"

const GlobalComponents = {
   install(Vue) {
      Vue.component('appCard', AppCard);
      Vue.component('sectionTooltip', SectionTooltip);
      Vue.component('statsCard', StatsCard);
      Vue.component('statsCardV2', StatsCardV2);
      Vue.component('StatsCardIncel', StatsCardIncel);
      Vue.component('deleteConfirmationDialog', DeleteConfirmationDialog);
      Vue.component('vuePerfectScrollbar', VuePerfectScrollbar);
      Vue.component('appSectionLoader', AppSectionLoader);
      Vue.component('pageTitleBar', PageTitleBar);
      Vue.component('rotateSquare2', RotateSquare2);
      Vue.component('cryptoSlider', CryptoSlider);
   }
}

export default GlobalComponents
