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

  // Inputs & Outputs
  isOpen = input.required<boolean>();
  transactionToEdit = input<Transaction | null>(null);
  
  closeModal = output<void>();
  saveTransaction = output<any>(); // Emits the form data

  // Define the form structure
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
    // Watch for changes to the input transaction. 
    // If we are editing, patch the form. If adding, reset it.
    effect(() => {
      const tx = this.transactionToEdit();
      if (tx) {
        // We use Math.abs to show positive numbers in the input box, 
        // we'll handle making it negative/positive upon saving.
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
      // Ensure debits are negative amounts
      const finalAmount = formValue.type === 'Debit' ? -Math.abs(formValue.amount!) : Math.abs(formValue.amount!);
      
      this.saveTransaction.emit({
        ...formValue,
        amount: finalAmount,
        id: this.transactionToEdit()?.id // Pass ID if it exists (Edit mode)
      });
      this.closeModal.emit();
    }
  }
}