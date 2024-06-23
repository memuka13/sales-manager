import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MANAGERS_DATA } from 'src/app/data';
import { Manager, ManagerFiltersForm } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { ProductsComponent } from '../products/products.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FilersComponent } from 'src/app/components/filers/filers.component';
import { take } from 'rxjs';
import { formatISO } from 'date-fns';
import { getFilterPredicate } from './sales-managers.util';

@Component({
  selector: 'app-sales-managers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './sales-managers.component.html',
  styleUrls: ['./sales-managers.component.scss'],
})
export class SalesManagersComponent {
  private readonly dialog = inject(MatDialog);
  readonly displayedColumns: string[] = [
    'username',
    'name',
    'surname',
    'dateRegistered',
    'totalSales',
  ];
  readonly dataSource = new MatTableDataSource<Manager>(MANAGERS_DATA);
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  private form = new FormGroup<ManagerFiltersForm>({
    username: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    dateRegisteredRange: new FormGroup({
      start: new FormControl(''),
      end: new FormControl(''),
    }),
    totalSalesFrom: new FormControl('', Validators.min(0)),
    totalSalesTo: new FormControl('', Validators.min(0)),
  });

  filter(form: FormGroup<ManagerFiltersForm>) {
    const username = form.value.username?.toLowerCase();
    const name = form.value.name?.toLowerCase();
    const surname = form.value.surname?.toLowerCase();
    const dateRegisteredRangeStart = form.value.dateRegisteredRange?.start
      ? formatISO(new Date(form.value.dateRegisteredRange?.start), {
          representation: 'date',
        })
      : '';
    const dateRegisteredRangeEnd = form.value.dateRegisteredRange?.end
      ? formatISO(new Date(form.value.dateRegisteredRange?.end), {
          representation: 'date',
        })
      : '';
    const totalSalesFrom = form.value.totalSalesFrom;
    const totalSalesTo = form.value.totalSalesTo;

    const filterValue =
      username +
      '$' +
      name +
      '$' +
      surname +
      '$' +
      dateRegisteredRangeStart +
      '$' +
      dateRegisteredRangeEnd +
      '$' +
      totalSalesFrom +
      '$' +
      totalSalesTo;
    this.dataSource.filter = filterValue.trim();
  }

  ngOnInit() {
    this.dataSource.filterPredicate = getFilterPredicate();
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  openDialog(row: Manager) {
    const dialogRef = this.dialog.open(ProductsComponent, {
      data: row,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log('The dialog was closed', result);
      });
  }

  openFilter() {
    const dialogRef = this.dialog.open(FilersComponent, {
      data: this.form,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: FormGroup<ManagerFiltersForm>) => {
        if (result) {
          this.form = result;
          this.filter(result);
        }
      });
  }
}
