import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {

  #accountService = inject(AccountService);

  readonly onCancel = output<void>();

  protected registerForm = new FormGroup({
    displayName: new FormControl<string>('',
      { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
    email: new FormControl<string>('',
      { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl<string>('',
      { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
  });

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { displayName, email, password } = this.registerForm.value;
    this.#accountService.register({
      displayName: displayName!,
      email: email!,
      password: password!
    }).subscribe({
      next: () => {
        this.registerForm.reset();
        this.onCancel.emit();
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }

  cancel() {
    this.registerForm.reset();
    this.onCancel.emit();
  }

}
