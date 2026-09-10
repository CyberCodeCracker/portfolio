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
  private readonly DRAFT_KEY = 'contact_form_draft';

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  sending = false;
  sent = false;
  error = false;

  private SERVICE_ID  = 'service_9vluh63';
  private TEMPLATE_ID = 'template_vjda7bn';
  private PUBLIC_KEY  = 'XQlnvO7bpi1LnDc5j';

  constructor() {
    try {
      const saved = localStorage.getItem(this.DRAFT_KEY);
      if (saved) {
        this.formData = { ...this.formData, ...JSON.parse(saved) };
      }
    } catch {}
  }

  saveDraft() {
    try {
      localStorage.setItem(this.DRAFT_KEY, JSON.stringify(this.formData));
    } catch {}
  }

  private clearDraft() {
    try {
      localStorage.removeItem(this.DRAFT_KEY);
    } catch {}
  }

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
      this.clearDraft();
    } catch (err) {
      console.error('EmailJS error:', err);
      this.error = true;
    } finally {
      this.sending = false;
    }
  }
}
