export default {
  path: "/admin",
  component: () => import("@/views/Admin"),
  children:[
	  {
		  path:'Allusers',
		  component: () => import("@/views/Admin/Allusers.vue")
	  },
	  {
	  	  path:'movie',
	      component: () => import("@/views/Admin/movie.vue")
	  },
	  {
	      path:'cinema',
	  	  component: () => import("@/views/Admin/cinema.vue")
	  },
	  {
		  path:'/admin',
		  redirect:'Allusers'
	  }
  ]
};