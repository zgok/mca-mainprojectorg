import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RequestDetailsComponent } from './components/adminrequesthandle/request-details/request-details.component';
import { RequestListComponent } from './components/adminrequesthandle/request-list/request-list.component';
import { AddtocartbillComponent } from './components/cart/addtocartbill/addtocartbill.component';
import { CartComponent } from './components/cart/cart.component';
import { CartorderdetailsComponent } from './components/cart/cartorderdetails/cartorderdetails.component';
import { CartpaymentcardComponent } from './components/cart/cartpaymentcard/cartpaymentcard.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CustomerBillComponent } from './components/customer-bill/customer-bill.component';
import { CustomerReqComponent } from './components/customer-req/customer-req.component';
import { CustomerordersComponent } from './components/customer-req/customerorders/customerorders.component';
import { FinishedprojectsComponent } from './components/finishedprojects/finishedprojects.component';
import { OrderBillComponent } from './components/order-bill/order-bill.component';
import { OrderedItemsComponent } from './components/ordered-items/ordered-items.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublishFormComponent } from './components/publish-pages/publish-form/publish-form.component';
import { PublishComponent } from './components/publish/publish.component';
import { RejectedRequestsComponent } from './components/rejected-requests/rejected-requests.component';
import { UnfinishedprojectsComponent } from './components/unfinishedprojects/unfinishedprojects.component';
import { AddAdminComponent } from './components/users/admin/add-admin/add-admin.component';
import { AdminListComponent } from './components/users/admin/admin-list/admin-list.component';
import { AdminComponent } from './components/users/admin/admin.component';
import { CustomerListComponent } from './components/users/customer/customer-list/customer-list.component';
import { CustomerComponent } from './components/users/customer/customer.component';
import { OrderedCustomersComponent } from './components/users/customer/ordered-customers/ordered-customers.component';
import { PublishedCustomersComponent } from './components/users/customer/published-customers/published-customers.component';
import { UsersComponent } from './components/users/users.component';

import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'admindet', component: AdminComponent,
     children: [{ path: 'addadmin', component: AddAdminComponent, outlet: 'show', canActivate: [AuthGuard] },
    { path: 'adminlist', component: AdminListComponent, outlet: 'show', canActivate: [AuthGuard] }],canActivate: [AuthGuard]
  },
  {
    path: 'customerdet', component: CustomerComponent, children: [{ path: 'pcust', component: PublishedCustomersComponent, outlet: 'showcus'},
    { path: 'custlist', component: CustomerListComponent, outlet: 'showcus', canActivate: [AuthGuard]},
    { path: 'orderedcust', component: OrderedCustomersComponent, outlet: 'showcus', canActivate: [AuthGuard] }]
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'cartorderbill', component: CartorderdetailsComponent, canActivate: [AuthGuard] },
  { path: 'cartpaymentcard/:price', component: CartpaymentcardComponent, canActivate: [AuthGuard] },
  { path: 'addtocartbill', component: AddtocartbillComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent },
  { path: 'orderbill/:bid', component: OrderBillComponent, canActivate: [AuthGuard] },
  { path: 'paymentcard/:bid', component: PaymentCardComponent, canActivate: [AuthGuard] },
  { path: 'customerbill/:bid', component: CustomerBillComponent, canActivate: [AuthGuard] },
  { path: 'productdetails/:bid', component: ProductDetailsComponent },
  { path: 'orderreqdetails/:bid', component: CustomerordersComponent, canActivate: [AuthGuard] },
  { path: 'rejectedorders', component: RejectedRequestsComponent, canActivate: [AuthGuard] },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'ordereditems', component: OrderedItemsComponent, canActivate: [AuthGuard] },
  { path: 'finished', component: FinishedprojectsComponent },
  { path: 'unfinished', component: UnfinishedprojectsComponent },
  { path: 'publish', component: PublishComponent, canActivate: [AuthGuard] },
  { path: 'publishform', component: PublishFormComponent, canActivate: [AuthGuard] },
  { path: 'reqlist', component: RequestListComponent, canActivate: [AuthGuard] },
  { path: 'request-detail/:bid', component: RequestDetailsComponent, canActivate: [AuthGuard] },
  { path: 'customerreq', component: CustomerReqComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
