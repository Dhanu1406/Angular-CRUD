import { Component,Input,Output,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LogDialogComponent } from './log-dialog/log-dialog.component';
import { HomeComponent } from './home/home.component';
import { SharedService } from './shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness','price','Comment','action'];
  dataSource!: MatTableDataSource<any>;
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 
  title = 'angularcrud';
  isLoggedIn: boolean=false;
  correct: boolean=false;
  constructor(private dialog: MatDialog,private api:ApiService, private sharedService: SharedService,private _snackBar: MatSnackBar ) {}
  openLogDialog(){
    this.dialog.open(LogDialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
       if(val==='login'){
        this.api.IsLoggedin=true;
        this.api.Iscorrect=false;
        this.correct=true;
       }
       
      
        
    })
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getallproducts();
      }
    })
  }

  

  ngOnInit():void{
    this.getallproducts();
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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000, 
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

