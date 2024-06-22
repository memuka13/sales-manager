import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  Optional,
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PRODUCTS_DATA, PRODUCTS_SOLD_BY_JDOE1 } from 'src/app/data';
import { Manager, Product } from 'src/app/models';

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
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  readonly displayedColumns: string[] = ['title', 'price', 'quantity'];
  readonly dataSource = new MatTableDataSource<Product>(PRODUCTS_DATA);
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public managerData: Manager,
  ) {
    if (managerData) {
      this.displayedColumns = ['title', 'price', 'quantity', 'salesDate'];
      this.dataSource = new MatTableDataSource<Product>(PRODUCTS_SOLD_BY_JDOE1);
    }
  }

  @ViewChild(MatPaginator) paginator?: MatPaginator;

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
  openDialog(row: Product) {
    console.log(row);
  }
}
