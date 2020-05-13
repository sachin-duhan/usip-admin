import { ToastrService } from 'ngx-toastr';
export class http_handler {
    constructor(private toast: ToastrService) { }
    handle_response(res) {
        if (res.success != undefined || res.success != null) {
            this.toast.warning(res.message);
        }
        return res.body
    }
}