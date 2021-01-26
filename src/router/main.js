import Full from 'Container/Full'

const Dashboard = () => import('Views/dashboard');
const Setup = () => import('Views/incel-admin/setup');
const Hotels = () => import('Views/incel-admin/hotels');
const VisaApplicationCreate = () => import('Views/incel-admin/visaapplication.create');
const UserManagement = () => import('Views/incel-admin/user.management');
const VisaTypes = () => import('Views/incel-admin/visatypes');
const TourTypes = () => import('Views/incel-admin/tourtypes');
const Tours = () => import('Views/incel-admin/tours');
const AirportTransfers = () => import('Views/incel-admin/airport.transfers');
const Locations = () => import('Views/incel-admin/locations');
const Travellers = () => import('Views/incel-admin/travellers');
const TourBookings = () => import('Views/incel-admin/tour.bookings');
const HotelBookings = () => import('Views/incel-admin/hotels.bookings');
const CreateFlight = () => import('Views/incel-admin/flights.create');
const Flights = () => import('Views/incel-admin/flights');
const VisaApplication = () => import('Views/incel-admin/visaapplication');
const TransferBookings = () => import('Views/incel-admin/transfer.bookings');
const Invoices = () => import('Views/incel-admin/invoices');
const CarRental = () => import('Views/incel-admin/car.rental');


export default {
  path: '/',
  component: Full,
  redirect: '/admin/dashboard',
  children: [{
      path: '/admin/dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        title: 'message.ecommerce',
        breadcrumb: null
      }
    },
    {
      path: '/admin/setup',
      component: Setup,
      meta: {
        requiresAuth: true,
        title: 'message.setup',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Admin setup'
          }
        ]
      }
    },
    {
      path: '/admin/hotels',
      component: Hotels,
      meta: {
        requiresAuth: true,
        title: 'message.hotels',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'hotels'
          }
        ]
      }
    },
    {
      path: '/admin/visaaplication/create',
      component: VisaApplicationCreate,
      meta: {
        requiresAuth: true,
        title: 'message.visaApplication',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Visa Application'
          }
        ]
      }
    },
    {
      path: '/admin/users',
      component: UserManagement,
      meta: {
        requiresAuth: true,
        title: 'message.userManagement',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'User Management'
          }
        ]
      }
    },
    {
      path: '/admin/visatypes',
      component: VisaTypes,
      meta: {
        requiresAuth: true,
        title: 'message.visaTypes',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Visa types'
          }
        ]
      }
    },
    {
      path: '/admin/tourtypes',
      component: TourTypes,
      meta: {
        requiresAuth: true,
        title: 'message.tourTypes',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Tour types'
          }
        ]
      }
    },
    {
      path: '/admin/tours',
      component: Tours,
      meta: {
        requiresAuth: true,
        title: 'message.tours',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Tours'
          }
        ]
      }
    },
    {
      path: '/admin/transfers',
      component: AirportTransfers,
      meta: {
        requiresAuth: true,
        title: 'message.airportTransfers',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Airport Transfers'
          }
        ]
      }
    },
    {
      path: '/admin/locations',
      component: Locations,
      meta: {
        requiresAuth: true,
        title: 'message.setupLocations',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Locations'
          }
        ]
      }
    },
    {
      path: '/admin/travellers',
      component: Travellers,
      meta: {
        requiresAuth: true,
        title: 'message.travellers',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Travellers'
          }
        ]
      }
    },
    {
      path: '/admin/tourboookings',
      component: TourBookings,
      meta: {
        requiresAuth: true,
        title: 'message.tourBookings',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Tour bookings'
          }
        ]
      }
    },
    {
      path: '/admin/hotels/manage/bookings',
      component: HotelBookings,
      meta: {
        requiresAuth: true,
        title: 'message.hotels',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Hotel bookings'
          }
        ]
      }
    },
    {
      path: '/admin/flight/create',
      component: CreateFlight,
      meta: {
        requiresAuth: true,
        title: 'message.newFlightSearch',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Search for flights'
          }
        ]
      }
    },
    {
      path: '/admin/flights',
      component: Flights,
      meta: {
        requiresAuth: true,
        title: 'message.flights',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Flights'
          }
        ]
      }
    },
    {
      path: '/admin/visaapplications',
      component: VisaApplication,
      meta: {
        requiresAuth: true,
        title: 'message.visaApplication',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Visa Applications'
          }
        ]
      }
    },
    {
      path: '/admin/transferbookings',
      component: TransferBookings,
      meta: {
        requiresAuth: true,
        title: 'message.transferBookings',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Transfer bookings'
          }
        ]
      }
    },
    {
      path: '/admin/invoices',
      component: Invoices,
      meta: {
        requiresAuth: true,
        title: 'message.invoices',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Invoices'
          }
        ]
      }
    },
    {
      path: '/admin/car/rental',
      component: CarRental,
      meta: {
        requiresAuth: true,
        title: 'message.carRental',
        breadcrumb: [{
            breadcrumbInactive: 'Dashboard /',
            url: '/'
          },
          {
            breadcrumbActive: 'Car Rental'
          }
        ]
      }
    },

  ]
}