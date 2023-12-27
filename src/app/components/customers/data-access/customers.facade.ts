import { ApplicationRef, ComponentRef, DestroyRef, Injectable, Type, createComponent, inject } from "@angular/core";
import { Router }  from "@angular/router";
import { AlertComponent } from "../../ui/alert/alert.component";
import { BehaviorSubject, Observable, Subject, map, switchMap } from "rxjs";
import { IAlert, ICustomer } from "./entities/customers.interface";
import { ApiCustomersService } from "./infrastructure/api-customers.service";
import { formatFromISO } from "@app-shared/utils/formatFromISODate.util";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root',
})
export class CustomersFacade {
  private router: Router = inject(Router);
  private apiCustomersService: ApiCustomersService = inject(ApiCustomersService);
  public saveCustomers$: Subject<ICustomer> = new Subject<ICustomer>();
  public appRef: ApplicationRef = inject(ApplicationRef);
  public componentRef!: ComponentRef<any>;
  public alert$: BehaviorSubject<IAlert | null> = new BehaviorSubject<IAlert | null>(null);
  private destroyRef = inject(DestroyRef);
  
  public navigate(route: string[]): Promise<boolean> {
    return this.router.navigate(route).then()
  }

  public getAllCustomers(): Observable<ICustomer[]> {
    return this.apiCustomersService.getAllCustomers().pipe(
      map((customers) => 
          customers.map((data) => {
            data.DataCadastro = String(formatFromISO(data.DataCadastro));
            data.DataNascimento = String(formatFromISO(data.DataNascimento));
            return data;
        }))
    );
  }

  public getCustomer(id: number): Observable<ICustomer[]> {
    return this.apiCustomersService.getCustomerById(id);
  }

  public saveCustomer(customer: ICustomer): Observable<ICustomer> {
    customer.id ? this.updateCustomer(customer) : this.createCustomer(customer);
    return this.saveCustomers$.asObservable();
  }

  public createCustomer(customer: ICustomer) {
    delete customer?.id;
    this.apiCustomersService.postCustomer(customer).subscribe({
      next: (data) => {
          this.saveCustomers$.next(data as ICustomer);
          this.alert$.next({
            text: 'Cliente cadastrado com sucesso!',
            type: 'success'
          })
      },
      error: (error) => {
          this.saveCustomers$.error(error);
          this.alert$.next({
            text: 'Não foi possivel cadastrar o cliente!',
            type: 'success'
          })
      }
    });
  }

  public removeCustomer(customer: ICustomer): Observable<ICustomer[]> {
    return this.apiCustomersService.deleteCustomer(customer).pipe(
      switchMap(() => this.getAllCustomers())
    );
  }

  public updateCustomer(customer: ICustomer) {
    this.apiCustomersService
    .putCustomer(customer)
    .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (data) => {
          this.saveCustomers$.next(data as ICustomer);
          this.alert$.next({
            text: 'Cliente atualizado com sucesso!',
            type: 'success'
          })
      },
      error: (error) => {
          this.saveCustomers$.error(error);
          this.alert$.next({
            text: 'Não foi possivel atualizar o cliente!',
            type: 'success'
          })
      }
    });
  }

    public createComponent(alert: Type<AlertComponent>): void {
      this.componentRef = createComponent(alert as Type<AlertComponent>, {
          environmentInjector: this.appRef.injector,
      });

      document.body.appendChild(this.componentRef.location.nativeElement);
      this.appRef.attachView(this.componentRef.hostView);
  }

  public removeComponent(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.alert$.next(null);
    }
 
}

}

