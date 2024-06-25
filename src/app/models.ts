import { FormControl, FormGroup } from '@angular/forms';

export interface ProductForm {
  id: FormControl<string | null>;
  title: FormControl<string | null>;
  price: FormControl<string | null>;
  quantity: FormControl<number | null>;
}
export interface Product {
  id?: string;
  title: string;
  price: string;
  quantity: number;
}

export interface ProductSold extends Product {
  salesDate?: string;
  username?: string;
}

export interface ManagerFiltersForm {
  username: FormControl<string | null>;
  name: FormControl<string | null>;
  surname: FormControl<string | null>;
  dateRegisteredRange: FormGroup<DateRegisteredRange>;
  totalSalesFrom: FormControl<string | null>;
  totalSalesTo: FormControl<string | null>;
}

interface DateRegisteredRange {
  start: FormControl<string | null>;
  end: FormControl<string | null>;
}

export interface Manager {
  id?: string;
  username: string;
  name: string;
  surname: string;
  dateRegistered: string;
  totalSales: string;
}
