import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

import { HttpService } from '../../core/http/http.service';
import { BlogPostsFacade } from '../../store/blog-posts/blog-posts.facade';
import {
  CreateBlogPostRequest,
  LENGTH_DESCRIPTIONS,
  STRUCTURE_DESCRIPTIONS,
} from '../../store/blog-posts/blog-posts.model';

@Component({
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TextFieldModule,
    CommonModule,
  ],
  providers: [HttpService],
  standalone: true,
  selector: 'app-create-blog-post',
  templateUrl: './create-blog-post.component.html',
  styleUrl: './create-blog-post.component.scss',
})
export class CreateBlogPostComponent {
  private readonly _blogPostsFacade = inject(BlogPostsFacade);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _snackBar = inject(MatSnackBar);

  createdBlogPost$ = this._blogPostsFacade.createdBlogPost$;

  LENGTH_DESCRIPTIONS = LENGTH_DESCRIPTIONS;
  STRUCTURE_DESCRIPTIONS = STRUCTURE_DESCRIPTIONS;

  firstStepGroup = this._formBuilder.group({
    description: ['', Validators.required],
  });

  secondStepGroup = this._formBuilder.group({
    length: [LENGTH_DESCRIPTIONS[0][0], Validators.required],
    structure: [STRUCTURE_DESCRIPTIONS[0][0], Validators.required],
  });

  thirdStepGroup = this._formBuilder.group({
    companyDetailsJSON: ['', Validators.required],
  });

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      const file = files.item(0);

      if (file) {
        const reader = new FileReader();

        reader.onload = (e): void => {
          const result = e.target?.result;

          this.thirdStepGroup.patchValue({
            companyDetailsJSON: typeof result === 'string' ? result : null,
          });
        };

        reader.readAsText(file);
      }
    }
  }

  onSubmit(): void {
    const firstStepGroupInvalid = this.firstStepGroup.invalid;
    const secondStepGroupInvalid = this.secondStepGroup.invalid;
    const thirdStepGroupInvalid = this.thirdStepGroup.invalid;

    if (firstStepGroupInvalid || secondStepGroupInvalid || thirdStepGroupInvalid) {
      this.firstStepGroup.markAllAsTouched();
      this.secondStepGroup.markAllAsTouched();
      this.thirdStepGroup.markAllAsTouched();

      const duration = 5000;

      if (firstStepGroupInvalid) {
        this._snackBar.open('You must provide a desciption', 'Close', {
          duration,
        });
      } else if (secondStepGroupInvalid) {
        this._snackBar.open('You must provide length and structure', 'Close', {
          duration,
        });
      } else if (thirdStepGroupInvalid) {
        this._snackBar.open('You must provide a company details json file', 'Close', {
          duration,
        });
      }

      return;
    }

    const payload: CreateBlogPostRequest = {
      description: this.firstStepGroup.value.description!,
      length: this.secondStepGroup.value.length!,
      structure: this.secondStepGroup.value.structure!,
      companyDetailsJSON: this.thirdStepGroup.value.companyDetailsJSON!,
    };

    this._blogPostsFacade.createBlogPost(payload);
  }
}
