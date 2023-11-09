import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
freshnessList=["Brand New","Second Hand","Refurbished"]
hide=true;
productForm!: FormGroup;
actionbtn='save';
constructor(private formBuilder : FormBuilder, 
  private api: ApiService, 
  private dialogRef : MatDialogRef<DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public editData : any,
  private _snackBar: MatSnackBar){}

  

ngOnInit():void{
  this.productForm=this.formBuilder.group({
    id:[''],
    productName:['',Validators.required],
  
    category:['',Validators.required],
    date:['',Validators.required],
    freshness:['',Validators.required],
    price:['',Validators.required],
    comment:['',Validators.required]
  })
   if(this.editData){
    this.actionbtn="Update"
    this.productForm.controls['productName'].setValue(this.editData.productName);
    this.productForm.controls['category'].setValue(this.editData.category);
    this.productForm.controls['date'].setValue(this.editData.date);
    this.productForm.controls['freshness'].setValue(this.editData.freshness);
    this.productForm.controls['price'].setValue(this.editData.price);
    this.productForm.controls['comment'].setValue(this.editData.comment);
   }
}

addProduct(){
  if(!this.editData){
    if(this.productForm.valid){
      console.log(this.productForm.value)
      this.api.postProduct(this.productForm.value).subscribe({
        next:(res)=>{
          this.openSnackBar('Product Added Successfull', 'OK');
          // this.correct = true;
          setTimeout(() => {
            this.dialogRef.close('login');
          }, 0);
          // alert("product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("error while adding the product")
  
        }
      })
  
      
    }
  }else{
    this.updateproduct()
  }
 
}
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 8000, 
  });
}
updateproduct(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      // alert("product Updated Successfully");
      this.openSnackBar('Product Updated Successfull', 'OK');
      // this.correct = true;
      setTimeout(() => {
        this.dialogRef.close('login');
      }, 0);
      this.productForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error while updating the record");
    }
  })
}
}
