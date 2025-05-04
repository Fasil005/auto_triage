import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-triage',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './triage.component.html',
  styleUrl: './triage.component.css'
})
export class TriageComponent implements OnInit {


  triageForm!: FormGroup;
  submitted = false;
  ageInDays: number = 0;

  alerts = [
    { patient: 'John Doe', priority: 'High', time: '2 mins ago' },
    { patient: 'Jane Smith', priority: 'Medium', time: '5 mins ago' },
    { patient: 'Alice Johnson', priority: 'Low', time: '10 mins ago' },
    { patient: 'Bob Brown', priority: 'High', time: '15 mins ago' },
    { patient: 'Eve Davis', priority: 'Medium', time: '20 mins ago' },
    { patient: 'Charlie White', priority: 'Low', time: '25 mins ago' },
    { patient: 'Diana King', priority: 'High', time: '30 mins ago' },
    { patient: 'Frank Lee', priority: 'Medium', time: '35 mins ago' },
    { patient: 'Grace Kim', priority: 'Low', time: '40 mins ago' },
    { patient: 'Henry Black', priority: 'High', time: '45 mins ago' }
  ];

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.triageForm = this.fb.group({
      name: ['', [Validators.required]],
      uhid: ['', [Validators.required]],
      age: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      heartRate: [null, [Validators.required]],
      respiratoryRate: [null, [Validators.required]],
      bp: ['', [Validators.required]],
      temperature: [null, [Validators.required]],
      spo2: [null, [Validators.required]],
      complaint: ['', [Validators.required]]
    });
  }

  onDOBChange() {
    const age_in_days = this.triageForm.get('age')?.value;
    if (age_in_days) {
      const birthDate = new Date(age_in_days);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - birthDate.getTime());
      this.ageInDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }
  }
  
  handleSubmit() {

    if (this.triageForm.valid) {
      this.submitted = false;
      console.log('Form submitted successfully:', this.triageForm.value);

      const formValue = this.triageForm.value;

      const payload = {
        patient: {
          name: formValue.name,
          uhid: formValue.uhid,
          age: formValue.age,
          age_in_days: this.ageInDays,
          gender: formValue.gender
        },
        triage: {
          heart_rate: formValue.heartRate,
          respiratory_rate: formValue.respiratoryRate,
          blood_pressure: formValue.bp,
          temperature: formValue.temperature,
          spo2: formValue.spo2,
          chief_complaint: formValue.complaint
        }
      };

      console.log('Formatted Payload:', payload);
  
      this.http.post('/api/triage/predict/', payload).subscribe(
        (response: any) => {
          console.log('Backend Response:', response);
  
          const newAlert = {
            id: Date.now(),
            patient: response.name || formValue.name,
            priority: response.triageLevel || 'Green',
            time: new Date().toLocaleTimeString(),
          };
  
          this.alerts = [newAlert, ...this.alerts];
          // this.result = response;
        },
        (error) => {
          console.error('Error occurred during form submission:', error);
          alert('Failed to submit form data. Please try again.');
        }
      );
    } else {
      this.submitted = true;
      console.log('Form is invalid');
      this.triageForm.markAllAsTouched();
    }
  };
}
