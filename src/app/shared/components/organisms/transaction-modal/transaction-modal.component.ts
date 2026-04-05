import { Component, input, output, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css']
})
export class TransactionModalComponent {
  private fb = inject(FormBuilder);

   
  isOpen = input.required<boolean>();
  transactionToEdit = input<Transaction | null>(null);
  
  closeModal = output<void>();
  saveTransaction = output<any>();  

   
  txForm = this.fb.group({
    entity: ['', Validators.required],
    amount: [0, Validators.required],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    category: ['Tech', Validators.required],
    type: ['Debit', Validators.required],
    method: ['Credit Card', Validators.required],
    status: ['Completed', Validators.required]
  });

  constructor() {
     
     
    effect(() => {
      const tx = this.transactionToEdit();
      if (tx) {
         
         
        this.txForm.patchValue({ ...tx, amount: Math.abs(tx.amount) });
      } else {
        this.txForm.reset({ 
          date: new Date().toISOString().split('T')[0], 
          category: 'Tech', type: 'Debit', method: 'Credit Card', status: 'Completed' 
        });
      }
    });
  }

  onSubmit() {
    if (this.txForm.valid) {
      const formValue = this.txForm.value;
       
      const finalAmount = formValue.type === 'Debit' ? -Math.abs(formValue.amount!) : Math.abs(formValue.amount!);
      
      this.saveTransaction.emit({
        ...formValue,
        amount: finalAmount,
        id: this.transactionToEdit()?.id  
      });
      this.closeModal.emit();
    }
  }
}