import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import AdminView from '../views/AdminView.vue'
import LoginPage from '../components/LoginPage.vue'
import SignupPage from '../components/SignupPage.vue'
import AdminAuth from '../components/AdminAuth.vue'
import ProfileCard from '../components/homepage/ProfileCard.vue'
import AddElections from '../components/adminpage/AddElection.vue'
import ViewElections from '../components/adminpage/ViewElections.vue'
import AddPositions from '../components/adminpage/AddPositions.vue'
import ViewPositions from '../components/adminpage/ViewPositions.vue'
import AddCategories from '../components/adminpage/AddCategories.vue'
import ViewCategories from '../components/adminpage/ViewCategories.vue'
import { useAuthStore } from '../stores/auth'
import AboutView from '../views/AboutView.vue'
import DashboardOverview from '../components/adminpage/DashboadOverview.vue'
import CreateUser from '../components/adminpage/CreateUser.vue'
import ViewUser from '../components/adminpage/ViewUser.vue'
import AddCandidate from '../components/adminpage/AddCandidate.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: LoginPage
        },
        {
          path: 'signup',
          name: 'Signup',
          component: SignupPage
        },
        {
          path: 'admin',
          name:'AdminAuth',
          component: AdminAuth
        }
      ]
    },
     {
      path: '/admin',
      name: 'Admin',
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore()
        const isAuthenticated = auth.isAuthenticated

        if (to.name == 'Admin' && !isAuthenticated) next({ name: 'AdminAuth' })
        else next()
      },
      component: AdminView,
      children: [
        {path:'',
        name:'admin-home',
          component:DashboardOverview
        },
        {
          path: 'add-election',
          name: 'ElectAdd',
          component: AddElections
        },
        {
          path: 'add-candidate',
          name: 'AddCandidate',
          component: AddCandidate
        },
        {
          path: 'view-election',
          name: 'ManageElect',
          component: ViewElections
        },
        {
          path: 'add-positions',
          name: 'ManagePositions',
          component: AddPositions
        },
        {
          path: 'view-positions',
          name: 'ViewPositions',
          component: ViewPositions
        },
        {
          path: 'add-categories',
          name: 'ManageCategories',
          component: AddCategories
        },
        {
          path: 'view-categories',
          name: 'ViewCategories',
          component: ViewCategories
        },
        {
          path: 'view-user',
          name: 'ViewUser',
          component: ViewUser
        },
        {
          path: 'create-user',
          name: 'CreateUser',
          component: CreateUser
        },
      ]
    },
    {
      path: '/home',
      name: 'Home',
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore()
        const isAuthenticated = auth.isAuthenticated

        if (to.name == 'Home' && !isAuthenticated) next({ name: 'Login' })
        else next()
      },
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore()
        const isAuthenticated = auth.isAuthenticated

        if (to.name == 'Home' && !isAuthenticated) next({ name: 'Login' })
        else next()
      },
      component: AboutView
    },

    {
      path: '/candidate/:id',
      name: 'candidate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:ProfileCard
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]

 
})
 router.beforeEach((to, from, next) => {
  const {isAuthenticated}=useAuthStore()
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to the login page or another page
    next('/login');
  } else {
    next();
  }
})

export default router
