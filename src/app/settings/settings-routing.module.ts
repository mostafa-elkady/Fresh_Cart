import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AuthGuard } from "../auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "change", pathMatch: "full" },
  { path: "settings", canActivate: [AuthGuard], component: SettingsComponent },
  {
    path: "change",
    canActivate: [AuthGuard],
    component: ChangePasswordComponent,
  },
  {
    path: "reset",
    canActivate: [AuthGuard],
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
