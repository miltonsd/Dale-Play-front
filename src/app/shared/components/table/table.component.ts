import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableButtonAction, TableColumn } from '@dlp/shared/models';

import { ConfirmDialogComponent } from '@dlp/shared/components';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'dlp-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: String[] = [];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() isSortable = false;

  @Input() tableColumns!: TableColumn[];

  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  @Output() action: EventEmitter<TableButtonAction> =
    new EventEmitter<TableButtonAction>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const columnNames = this.tableColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
    this.displayedColumns = columnNames;
  }

  setTableDataSource(data: any) {
    // Crea los datos de la tabla
    this.dataSource = new MatTableDataSource(data);
    // Agregar paginación a la tabla
    this.dataSource.paginator = this.paginator;
    // Agregar sorting a la tabla
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(element: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { msg: element.name },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.action.emit(element);
      }
    });
  }
}
