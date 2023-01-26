const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageHome.vue"), name: "Home" },
      {
        path: "/about",
        component: () => import("pages/PageAbout.vue"),
        name: "About",
      },
    ],
  },

  // Always leave this as last one,
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
