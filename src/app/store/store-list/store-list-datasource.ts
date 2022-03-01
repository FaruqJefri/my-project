import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface StoreListItem {
  name: string;
  id: number;
  status: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: StoreListItem[] = [
  {id: 1, name: 'Hydrogen', status: 'Active'},
  {id: 2, name: 'Helium', status: 'Active'},
  {id: 3, name: 'Lithium', status: 'Active'},
  {id: 4, name: 'Beryllium', status: 'Active'},
  {id: 5, name: 'Boron', status: 'Active'},
  {id: 6, name: 'Carbon', status: 'Active'},
  {id: 7, name: 'Nitrogen', status: 'Active'},
  {id: 8, name: 'Oxygen', status: 'Active'},
  {id: 9, name: 'Fluorine', status: 'Active'},
  {id: 10, name: 'Neon', status: 'Active'},
  {id: 11, name: 'Sodium', status: 'Active'},
  {id: 12, name: 'Magnesium', status: 'Active'},
  {id: 13, name: 'Aluminum', status: 'Active'},
  {id: 14, name: 'Silicon', status: 'Active'},
  {id: 15, name: 'Phosphorus', status: 'Active'},
  {id: 16, name: 'Sulfur', status: 'Active'},
  {id: 17, name: 'Chlorine', status: 'Active'},
  {id: 18, name: 'Argon', status: 'Active'},
  {id: 19, name: 'Potassium', status: 'Active'},
  {id: 20, name: 'Calcium', status: 'Active'},
];

/**
 * Data source for the StoreList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StoreListDataSource extends DataSource<StoreListItem> {
  data: StoreListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<StoreListItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: StoreListItem[]): StoreListItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: StoreListItem[]): StoreListItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
