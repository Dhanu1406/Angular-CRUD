import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../services/api.service';
import { LogDialogComponent } from '../log-dialog/log-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price','Comment','action'];
  dataSource!: MatTableDataSource<any>;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 
  title = 'angularcrud';
  // isLoggedIn: boolean=false;
  correct: boolean=true;
  constructor(private dialog: MatDialog,private api:ApiService,private sharedService: SharedService,private _snackBar: MatSnackBar ) {}
  // openLogDialog(){
  //   this.dialog.open(LogDialogComponent,{
  //     width:'30%'
  //   }).afterClosed().subscribe(val=>{
  //      if(val==='login'){
  //       this.correct=true;
  //      }    
  //   })
  // }
  ngOnInit():void{
    this.getallproducts();
    this.correct=this.api.Iscorrect;
  }
  getallproducts(){
    this.api.getProduct().subscribe({
      next:(res)=>{
       this.dataSource=new MatTableDataSource(res);
       this.dataSource.paginator=this.paginator;
       this.dataSource.sort=this.sort
      },
      error:(err)=>{
        alert("error while fetching the records");
      }
    })
  }
  editproduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getallproducts();
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000, 
    });
  }
  deleteProduct(id:number){
   this.api.deleteProduct(id)
   .subscribe({
    next:(res)=>{
      // alert("product deleted successfully");
      this.openSnackBar('Product deleted successfully', 'Close');
      this.getallproducts();
    },
    error:()=>{
      alert("error while deleting the product")
    }
   })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
