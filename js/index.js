const member_form = document.getElementById('main_form');
const guest_form = document.getElementById('guest_form');

member_form.addEventListener('submit', submit_member_form);
guest_form.addEventListener('submit', submit_guest);

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

function submit_guest(event) {
    event.preventDefault();
    const name = document.getElementById('name');
    const addr = document.getElementById('address');

    let obj = {'name': name.value, 'address': addr.value};

    if(name.value.length > 2 && addr.value.length > 5){
        send_to_server(obj, false);
    }else{
        if(document.getElementById('memberErrorText')) return;

        let p = document.createElement('p');

        p.className = "text-white font-weight-light mb-5";
        p.id = "memberErrorText";
        p.textContent = "Silahkan masukkan Nama lengkap dan Alamat Lengkap Anda";

        guest_form.insertBefore(p, guest_form.firstChild);

        setTimeout(function () {
            p.remove();
        }, 3000)
    }
}

function send_to_server(data, isMember) {
    var xhr = new XMLHttpRequest();
    if(isMember){
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

                guest_from.insertBefore(p, member_form.firstChild);

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
    }else{
        let params = "name=" + data.name + "&address=" + data.address +"";
        xhr.open('POST', 'http://localhost/buku_tamu/php/api/submit_guest_regular.php');
        //Send the proper header information along with the request
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200){
                let resp = xhr.responseText;
                resp = JSON.parse(resp);

                if(document.getElementById('guestXhrSuccess')) return;

                let p = document.createElement('p');

                p.className = "text-white font-weight-light mb-5";
                p.id = "guestXhrSuccess";
                p.textContent = resp.message;

                guest_form.insertBefore(p, guest_form.firstChild);

                let name_form = document.getElementById('name');
                let addr_form = document.getElementById('address');
                name_form.value = "";
                addr_form.value = "";

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

                guest_form.insertBefore(p, guest_form.firstChild);

                setTimeout(function () {
                    p.remove();
                }, 8000)
            }
        };

        xhr.send(params);
    }
}