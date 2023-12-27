import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, ElementRef, ViewChild, inject } from '@angular/core';
import { ButtonComponent } from '@app-shared/components/button/button.component';
import { CpfPipe } from '@app-shared/pipes/cpf.pipe';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CustomersFacade } from '../../data-access/customers.facade';
import { EmpFilter, ICustomer } from '../../data-access/entities/customers.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CheckboxComponent } from '../../../ui/checkbox/checkbox.component';
import { AlertComponent } from '../../../ui/alert/alert.component';
import { InputComponent } from '../../../ui/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-customers-grid',
  standalone: true,
  imports: [NgFor, NgClass, ReactiveFormsModule, FormsModule, CurrencyMaskModule, CurrencyPipe, CpfPipe, ButtonComponent, MatTableModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatPaginatorModule, MatSortModule, CheckboxComponent, AlertComponent, InputComponent],
  templateUrl: './customers-grid.component.html',
  styleUrl: './customers-grid.component.scss',
})
export class CustomersGridComponent {
  @ViewChild('nomeClienteInput') nomeClienteInput!: ElementRef;
  @ViewChild('cpfInput') cpfInput!: ElementRef;
  @ViewChild('dataNascimentoInput') dataNascimentoInput!: ElementRef;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  public customersFacade = inject(CustomersFacade);
  public cpfPipe = inject(CpfPipe);
  private destroyRef = inject(DestroyRef);
  public empFilters: EmpFilter[] = [];
  public defaultValue = "All";
  public columns: string[] = ['id', 'NomeCliente', 'Cpf', 'RendaMensal','DataCadastro', 'DataNascimento',  'edit', 'delete'];
  public filterDictionary = new Map<string,string>();
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<ICustomer[]>();
  public dataSourceFilters: MatTableDataSource<any, any> = new MatTableDataSource<any>();
  public checkedIndex: number = 0
  public selectedCustomer: Partial<ICustomer> = {};
  public nomeCliente: string = ''
  public cpf: string = '';
  public dataNascimento: string = '';


  constructor() {
    this.customersFacade.getAllCustomers().subscribe({
      next: (customers: ICustomer[]) => {
        this.dataSource.data = customers;
        this.dataSourceFilters.data = customers; 
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.paginator) {
      this.dataSource.paginator._intl = new MatPaginatorIntl();
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Itens por página';
      this.dataSource.paginator._intl.nextPageLabel = '';
      this.dataSource.paginator._intl.previousPageLabel = '';
    }

  }

  public deleteCustomer(customer: ICustomer): void {
    this.customersFacade.removeCustomer(customer)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (customers) => {
 
        this.customersFacade.alert$.next({
          text: 'Cliente Excluído com sucesso!',
          type: 'success'
        })
        this.dataSource.data = customers;
        this.dataSourceFilters.data = customers; 
      },
      error: (err) => {
        console.error(err);
        this.customersFacade.alert$.next({
          text: 'Não foi possível excluir o cliente!',
          type: 'error'
        })
      },
    })
  }

  public editCustomer(customer: ICustomer): void {
    this.customersFacade.navigate([`/customer/${customer.id}`]);
  }

  public onChecked(index: number, customer: Partial<ICustomer>): void {
    this.selectedCustomer = customer;
    if (this.checkedIndex === index) return;
    this.checkedIndex = index;
  }

  public applyFilter(value: string, filter: string): void {
    const lowerValue = value.trim().toLowerCase();

    switch (filter) {
      case 'NomeCliente':
        this.applyFilterToColumn('NomeCliente', lowerValue);
        break;
      case 'Cpf':
        this.applyFilterToColumn('Cpf', this.cpfPipe.formatCPf(lowerValue));
        break;
      case 'DataNascimento':
        this.applyFilterToColumn('DataNascimento', lowerValue);
        break;
      default:
        console.warn(`Unsupported filter type: ${filter}`);
        break;
    }
  }

  public clearFilters(): void {
    this.dataSource.filter = '';
  }
  
  private applyFilterToColumn(column: string, filterValue: string): void {
    this.dataSource.filterPredicate = (data, filter) => {
      return data[column].toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }
  
}
