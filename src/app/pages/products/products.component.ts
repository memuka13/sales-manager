import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { PRODUCTS_DATA, PRODUCTS_SOLD_BY_JDOE1 } from 'src/app/data';
import { Manager, Product, ProductForm } from 'src/app/models';
import { MatButtonModule } from '@angular/material/button';
import { AddManageProductComponent } from 'src/app/components/add-manage-product/add-manage-product.component';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SellDialogComponent } from 'src/app/components/sell-dialog/sell-dialog.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  private readonly dialog = inject(MatDialog);
  readonly displayedColumns: string[] = [
    'title',
    'price',
    'quantity',
    'action',
  ];
  readonly dataSource = new MatTableDataSource<Product>(PRODUCTS_DATA);
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public managerData: Manager
  ) {
    if (managerData) {
      this.displayedColumns = ['title', 'price', 'quantity', 'salesDate'];
      this.dataSource = new MatTableDataSource<Product>(PRODUCTS_SOLD_BY_JDOE1);
    }
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild('deleteDialog') deleteDialog?: TemplateRef<unknown>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFilterPredicate() {
    return (row: Product, filter: string) => {
      const matchFilter = [];
      const columnTitle = row.title;
      const customFilterTitle = columnTitle.toLowerCase().includes(filter);
      matchFilter.push(customFilterTitle);
      return matchFilter.every(Boolean);
    };
  }

  ngOnInit() {
    this.dataSource.filterPredicate = this.getFilterPredicate();
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }
  openAddOrEditDialog(row?: Product) {
    const dialogRef = this.dialog.open(AddManageProductComponent, {
      data: row,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: FormGroup<ProductForm>) => {
        if (result) {
          console.log(result);
        }
      });
  }

  delete(row: Product) {
    const dialogRef = this.dialog.open(this.deleteDialog!);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        console.log(result);
      });
  }

  sell(row: Product) {
    const dialogRef = this.dialog.open(SellDialogComponent, {
      data: row.quantity,
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: number) => {
        console.log(result);
      });
  }
}
