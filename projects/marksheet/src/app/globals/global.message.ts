import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class GlobalMessage {
  public Show_error(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
      //footer: '<a href="">Why do I have this issue?</a>',
    });
  }

  public Show_message(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Message',
      text: message,
      //footer: '<a href="">Why do I have this issue?</a>',
    });
  }

  public Show_succesmessage(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Message',
      text: message,
      //footer: '<a href="">Why do I have this issue?</a>',
    });
  }

  public Show_message_html(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Message',
      html: message,
      //footer: '<a href="">Why do I have this issue?</a>',
    });
  }

}
