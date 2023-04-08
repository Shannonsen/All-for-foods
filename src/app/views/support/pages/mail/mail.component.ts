import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {
  FormData: FormGroup = new FormGroup('');
  constructor(private contact: EmailService) {
  }

  ngOnInit(): void {
    this.FormData = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.minLength(4)]),
      email: new FormControl('', [Validators.required,Validators.minLength(4), Validators.email]),
      textarea: new FormControl('', [Validators.required,Validators.minLength(30)])
    });
  }

  onSubmit(FormData: FormGroup) {
    this.contact.SendEmail(FormData)
  }

}
