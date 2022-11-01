import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PublishComponent } from './components/publish/publish.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublishFormComponent } from './components/publish-pages/publish-form/publish-form.component';
import { UsersComponent } from './components/users/users.component';
import { AdminComponent } from './components/users/admin/admin.component';
import { CustomerComponent } from './components/users/customer/customer.component';
import { AddAdminComponent } from './components/users/admin/add-admin/add-admin.component';
import { AdminListComponent } from './components/users/admin/admin-list/admin-list.component';
import { CustomerListComponent } from './components/users/customer/customer-list/customer-list.component';
import { CartComponent } from './components/cart/cart.component';
import { PublishedCustomersComponent } from './components/users/customer/published-customers/published-customers.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CustomerReqComponent } from './components/customer-req/customer-req.component';
import { RequestListComponent } from './components/adminrequesthandle/request-list/request-list.component';
import { RequestDetailsComponent } from './components/adminrequesthandle/request-details/request-details.component';
import { RequestCardComponent } from './components/adminrequesthandle/request-card/request-card.component';
import { OrderedCustomersComponent } from './components/users/customer/ordered-customers/ordered-customers.component';
import { OrderBillComponent } from './components/order-bill/order-bill.component';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CustomerordersComponent } from './components/customer-req/customerorders/customerorders.component';
import { NgConfirmModule } from 'ng-confirm-box';
import { FinishedprojectsComponent } from './components/finishedprojects/finishedprojects.component';
import { UnfinishedprojectsComponent } from './components/unfinishedprojects/unfinishedprojects.component';
import { CartorderdetailsComponent } from './components/cart/cartorderdetails/cartorderdetails.component';
import { CartpaymentcardComponent } from './components/cart/cartpaymentcard/cartpaymentcard.component';
import { OrderedItemsComponent } from './components/ordered-items/ordered-items.component';
import { CustomerBillComponent } from './components/customer-bill/customer-bill.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { RejectedRequestsComponent } from './components/rejected-requests/rejected-requests.component';
import { AddtocartbillComponent } from './components/cart/addtocartbill/addtocartbill.component';

import { AuthGuard } from './shared/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutUsComponent,
    SideNavComponent,
    FooterComponent,
    CategoriesComponent,
    ProfileComponent,
    PageNotFoundComponent,
    PublishComponent,
    PublishFormComponent,
    UsersComponent,
    AdminComponent,
    CustomerComponent,
    AddAdminComponent,
    AdminListComponent,
    CustomerListComponent,
    CartComponent,
    PublishedCustomersComponent,
    CustomerReqComponent,
    RequestListComponent,
    RequestDetailsComponent,
    RequestCardComponent,
    OrderedCustomersComponent,
    OrderBillComponent,
    PaymentCardComponent,
    ProductDetailsComponent,
    CustomerordersComponent,
    FinishedprojectsComponent,
    UnfinishedprojectsComponent,
    CartorderdetailsComponent,
    CartpaymentcardComponent,
    OrderedItemsComponent,
    CustomerBillComponent,
    RejectedRequestsComponent,
    AddtocartbillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HotToastModule.forRoot(),
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgConfirmModule,
    NgxSpinnerModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
