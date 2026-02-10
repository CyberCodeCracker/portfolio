import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  sending = false;
  sent = false;
  error = false;

  // ========================================================
  //  Replace the three IDs below with your real EmailJS IDs
  //  1. Sign up at https://www.emailjs.com (free tier = 200 emails/month)
  //  2. Create a Service  → linked to your Gmail
  //  3. Create a Template → using {{from_name}}, {{from_email}}, {{subject}}, {{message}}
  //  4. Copy your Public Key from Account → General
  // ========================================================
  private SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
  private TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
  private PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // e.g. 'aB1cD2eF3gH4iJ5k'

  async onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;

    this.sending = true;
    this.sent = false;
    this.error = false;

    try {
      await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          subject: this.formData.subject || 'Portfolio Contact',
          message: this.formData.message
        },
        this.PUBLIC_KEY
      );

      this.sent = true;
      this.formData = { name: '', email: '', subject: '', message: '' };
    } catch (err) {
      console.error('EmailJS error:', err);
      this.error = true;
    } finally {
      this.sending = false;
    }
  }
}
