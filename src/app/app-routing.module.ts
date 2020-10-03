import { NgModule } from '@angular/core';

// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated
import { SignInComponent } from '././components/sign-in/sign-in.component';
import { SignUpComponent } from '././components/sign-up/sign-up.component';
import { LobbyComponent } from '././components/lobby/lobby.component';
import { TicketsComponent } from '././components/tickets/tickets.component';
import { ForgotPasswordComponent } from '././components/forgot-password/forgot-password.component';
//import { AuthGuard } from "././guard/auth.guard";
import { VerifyEmailComponent } from '././components/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
 { path: 'sign-in', component: SignInComponent },
 { path: 'register-user', component: SignUpComponent },
 { path: 'lobby', component: LobbyComponent },
 { path: 'tickets', component: TicketsComponent },
 { path: 'forgot-password', component: ForgotPasswordComponent },
 { path: 'verify-email-address', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
