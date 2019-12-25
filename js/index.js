const member_form = document.getElementById('main_form');

member_form.addEventListener('submit', submit_member_form);

function submit_member_form(event) {
    event.preventDefault();
    const form = document.getElementById('identity_form');
    if(form.value.match('(481)[a-z0-9]{13}')){
        send_to_server(form.value, true);
    }else{
        if(document.getElementById('memberErrorText')) return;

        let p = document.createElement('p');

        p.className = "text-white font-weight-light mb-5";
        p.id = "memberErrorText";
        p.textContent = "Format no. member yang anda masukkan salah";

        member_form.insertBefore(p, member_form.firstChild);

        setTimeout(function () {
            p.remove();
        }, 3000)
    }
}

function send_to_server(data, isMember) {
    if(isMember){
        let xhr = new XMLHttpRequest();
        let params = "no_identitas=" + data;
        xhr.open('POST', 'http://localhost/buku_tamu/php/api/submit_guest_member.php');
        //Send the proper header information along with the request
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200){
                let resp = xhr.responseText;
                resp = JSON.parse(resp);

                if(document.getElementById('memberXhrSuccess')) return;

                let p = document.createElement('p');

                p.className = "text-white font-weight-light mb-5";
                p.id = "memberXhrSuccess";
                p.textContent = resp.message;

                member_form.insertBefore(p, member_form.firstChild);

                let form = document.getElementById('identity_form');
                form.value = "";

                setTimeout(function () {
                    p.remove();
                }, 8000)
            }else if (xhr.readyState === 4 && xhr.status > 400){
                let resp = xhr.responseText;
                resp = JSON.parse(resp);

                if(document.getElementById('memberXhrError')) return;

                let p = document.createElement('p');

                p.className = "text-white font-weight-light mb-5";
                p.id = "memberXhrError";
                p.textContent = resp.message;

                member_form.insertBefore(p, member_form.firstChild);

                setTimeout(function () {
                    p.remove();
                }, 8000)
            }
        };

        xhr.send(params);
    }
}