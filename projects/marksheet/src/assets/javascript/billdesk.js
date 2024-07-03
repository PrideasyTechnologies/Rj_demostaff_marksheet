import {ServerURL, BilldeskFormPaymentCallback, atkt_formcallback} from '../../app/globals/global-api'

export function BilldeskPay(reqmsg, myurl, modulename) {

    //RJCOLGASC|5E7B2226D41D11EC86D02CEA7FABC08D|NA|1|NA|NA|NA|INR|NA|R|rjcolgasc|NA|NA|F|2022|HNDVDYPRCHRSMT|103|918566627982|9999|1|42178|NA|B103277447AFEE4266878F9F4502AD4147EE74E508A99211DB8BB811E16C2966"
    //BDSKUATY|RJCLGTEST112201|NA|300|NA|NA|NA|INR|NA|R|bdskuaty|NA|NA|F|Malad|Mumbai|8097517488|NA|NA|NA|NA|NA|7944313BE3321AD23352FCD61EC0C0972B8EF4D574C374C1D8DE04081A737ADC',
    //http://www.eazyinstitute.com:8034/students

    let x = window.location.host + myurl;

    //+ Atkt-students?billdeskstatus="+sMessage+"receiptid="+_billdesk.AdditionalInfo7+"student="+_billdesk.AdditionalInfo4

    let callbackquery = ""
     if (modulename = "ATKT") {
         callbackquery = atkt_formcallback + "?servername=" + ServerURL
     }   else{
         // callbackquery = atkt_formcallback + "?servername=" + ServerURL
     }

    console.log('url', callbackquery)
    //console.log("reqmsg:", reqmsg)

    bdPayment.initialize({
        msg: reqmsg,
        callbackUrl: callbackquery,
        options: {
            enableChildWindowPosting: true,
            enablePaymentRetry: true,
            retry_attempt_count: 2
            //txtPayCategory: "CREDIT"
        }
    });

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
