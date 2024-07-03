//https://medium.com/@Codeible/adding-loading-and-using-javascript-in-angular-3281ea4b056b
import {  ServerURL, BilldeskFirstYearCallback } from '../../app/globals/global-api'

export function BilldeskPay(reqmsg) {
    // https://admission.rjcollege.edu.in/demoeazy/?sucesspage=https://admission.rjcollege.edu.in/demoeazy/#/successresponse&failpage=https://admission.rjcollege.edu.in/demoeazy/#/failureresponse
  try {
    var callbackquery = BilldeskFirstYearCallback + "?servername=" + ServerURL
    bdPayment.initialize({
      msg: reqmsg,
      callbackUrl: callbackquery,
      options: {
        enableChildWindowPosting: true,
        enablePaymentRetry: true,
        retry_attempt_count: 2
      }
    });

    // Do something that might trigger an error
  } catch (error) {
    alert('Billdesk library is not loading : '+error)// Only runs when there is an error/exception
  } finally {
    // Code here always runs. Doesn't matter if there was an error or not.
  }

}

//     bdPayment.initialize ({
//         msg :'BDSKUATY|RJCLGTEST112201|NA|300|NA|NA|NA|INR|NA|R|bdskuaty|NA|NA|F|Malad|Mumbai|8097517488|NA|NA|NA|NA|NA|7944313BE3321AD23352FCD61EC0C0972B8EF4D574C374C1D8DE04081A737ADC',
//         // "msg":"BDSKUATY|123456|NA|100.00|XYZ|NA|NA|INR|DIRECT|R|abcd|NA|NA|F|rohan.behera@vaarisolutions.com|9820198201|NA|NA|NA|NA|NA|NA|AB6VN3245B66FE9511DB2A854AAA32ADC563E789CF213CA19E274F18F330G547",
//         "options": {
//          "enableChildWindowPosting": true,
//          "enablePaymentRetry": true,
//          "retry_attempt_count": 2,
//          "txtPayCategory": "NETBANKING"
//          },
//          "callbackUrl": "http://localhost:4201/#/students/fillprofile"
//         });
//         alert("hitting js file")
// }

// "callbackUrl": "https://www.merchant-domain.com/payment_response.jsp"
