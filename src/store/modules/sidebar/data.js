// Sidebar Routers
export const menus = {
	'message.general': [{

		action: 'zmdi-view-dashboard',
		title: 'message.dashboard',
		active: true,
		items: null,
		path: '/dashboard',
		label: 'Old',


	}, ],
	'message.services': [
		{
			action: 'zmdi-card-travel',
			title: 'message.manageTravellers',
			active: false,
			items: null,
			path: '/travellers',
			label: 'Old'
		},
		{
			action: 'zmdi-car',
			title: 'message.carRental',
			active: false,
			items: null,
			path: '/car/rental',
			label: 'Old'
		},
		{
			action: 'zmdi-map',
			title: 'message.tours',
			active: false,
			items: [{
				title: 'message.bookExistingTours',
				path: '/tourbookings',
			}, ],
		},
		{
			action: 'zmdi-home',
			title: 'message.hotels',
			active: false,
			items: [{
					title: 'message.searchNewBookings',
					path: '/hotels',
				},
				{
					title: 'message.manageHotelBooking',
					path: '/hotels/manage/bookings',
				},
			],
		},
		{
			action: 'zmdi-flight-takeoff',
			title: 'message.flight',
			active: false,
			items: [{
					title: 'message.newFlightSearch',
					path: '/flight/create',
				},
				{
					title: 'message.manageFlightBooking',
					path: '/flights',
				},
			],
		},
		{
			action: 'zmdi-folder-outline',
			title: 'message.visa',
			active: false,
			items: [{
					title: 'message.applyForVisa',
					path: '/visaaplication/create',
				},
				{
					title: 'message.manageVisaApplication',
					path: '/visaapplications',
				},
			],
		},
		{
			action: 'zmdi-swap',
			title: 'message.manageTransfers',
			active: false,
			items: null,
			path: '/transferbookings',
			label: 'Old'
		},
		{
			action: 'zmdi-card',
			title: 'message.invoices',
			active: false,
			items: null,
			path: '/invoices',
			label: 'Old'
		},
		{
			action: 'zmdi-sign-in',
			title: 'message.logout',
			active: false,
			items: null,
			exact: true,
			path: '/session/login',
			label: 'Old'
		},


	],
}