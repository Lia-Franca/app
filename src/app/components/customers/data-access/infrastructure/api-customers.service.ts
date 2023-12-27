import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ICustomer } from "../entities/customers.interface";
import { Observable } from "rxjs";
import { EntityPath, Protocol, url } from "../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiCustomersService {
    private http = inject(HttpClient);

    public getAllCustomers(): Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(
            url(
              Protocol.http,
              EntityPath.api,
              '/Customer'
            )
          );
    }

    public getCustomerById(id: number): Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(
            url(
              Protocol.http,
              EntityPath.api,
              '/Customer'
            ), {
                params: { id: id },
            }
          );
    }

    public postCustomer(customer: ICustomer): Observable<ICustomer> {
        return this.http.post<ICustomer>(
            url(
              Protocol.http,
              EntityPath.api,
              '/Customer'
            ), customer
          );
    }

    public putCustomer(customer: ICustomer): Observable<ICustomer> {
      return this.http.put<ICustomer>(
        url(
          Protocol.http,
          EntityPath.api,
          `/Customer/${customer.id}`
        ), customer
      )
    }

    public deleteCustomer(customer: ICustomer): Observable<ICustomer> {
      return this.http.delete<ICustomer>(
        url(
          Protocol.http,
          EntityPath.api,
          `/Customer/${customer.id}`
        )
      )
    }
}
