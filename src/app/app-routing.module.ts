import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  // Main Pages
  {
    path: "",canActivate:[AuthGuard],
    loadComponent: () =>
      import("./layouts/main-layout/main-layout.component").then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        loadComponent: () =>
          import("./components/home/home.component").then(
            (m) => m.HomeComponent
          ),
        title: "Home",
      },
      {
        path: "cart",
        loadComponent: () =>
          import("./components/cart/cart.component").then(
            (m) => m.CartComponent
          ),
        title: "Cart",
      },
      {
        path: "products",
        loadComponent: () =>
          import("./components/products/products.component").then(
            (m) => m.ProductsComponent
          ),
        title: "Products",
      },
      {
        path: "product-details/:id",
        loadComponent: () =>
          import("./components/product-details/product-details.component").then(
            (m) => m.ProductDetailsComponent
          ),
        title: "Products Details",
      },
      {
        path: "categories",
        loadComponent: () =>
          import("./components/categories/categories.component").then(
            (m) => m.CategoriesComponent
          ),
        title: "categories",
      },
      {
        path: "brands",
        loadComponent: () =>
          import("./components/brands/brands.component").then(
            (m) => m.BrandsComponent
          ),
        title: "Brands",
      },
      {
        path: "allorders",
        loadComponent: () =>
          import("./components/allorders/allorders.component").then(
            (m) => m.AllordersComponent
          ),
        title: "Allorders",
      },
      {
        path: "payment/:cartId",
        loadComponent: () =>
          import("./components/payment/payment.component").then(
            (m) => m.PaymentComponent
          ),
        title: "Payment",
      },
      {
        path: "wishlist",
        loadComponent: () =>
          import("./components/wishlist/wishlist.component").then(
            (m) => m.WishlistComponent
          ),
        title: "Wishlist",
      },
    ],
  },
  //Auth Pages
  {
    path: "",
    loadComponent: () =>
      import("./layouts/auth-layout/auth-layout.component").then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("./components/login/login.component").then(
            (m) => m.LoginComponent
          ),
        title: "login",
      },
      {
        path: "signup",
        loadComponent: () =>
          import("./components/signup/signup.component").then(
            (m) => m.SignupComponent
          ),
        title: "signup",
      },
      {
        path: "forgotPassword",
        loadComponent: () =>
          import("./components/forgot-password/forgot-password.component").then(
            (m) => m.FrogotPasswordComponent
          ),
        title: "ForgotPassword",
      },
    ],
  },
  //Not Found
  {path:'**', loadComponent:()=> import('./components/notfound/notfound.component').then((m=>m.NotfoundComponent))}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }