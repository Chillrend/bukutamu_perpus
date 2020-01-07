

function autocomplete(inp) {

    var focus;
    inp.addEventListener("input", function(e) {
        var elem, b, i, val = this.value;
        var elemid = this.id;
        closeAllLists();
        if (val.length < 3) { return false;}

        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);

                focus = -1;
                elem = document.createElement("DIV");
                elem.setAttribute("id", e.target.id + "autocomplete-list");
                elem.setAttribute("class", "autocomplete-items");

                var dom = document.getElementById(e.target.id);
                dom.parentNode.appendChild(elem);
                for (i = 0; i < myObj.length; i++) {
                    
                        //Kasih click listener di variabl e b, kalo di klik ambil data pake ajax, tros datanya tampilin di detail buku paling atas, PIKIR NDIRI
                        b = document.createElement("DIV");
                        b.innerHTML = "<i>" + myObj[i]['title'] + "</i>";
                        b.innerHTML += "<input type='hidden' value='" + myObj[i]['id'] + "'>";
                        b.addEventListener("click", function(e) {
                            //TARO AJAX CALL BUAT AMBIL DETAIL BUKU DISINI
                            console.log(this.getElementsByTagName("i"))
                            inp.value = this.getElementsByTagName("i")[0].innerHTML;
                            let id = this.getElementsByTagName("input")[0].value; 
                            console.log(id);

                            closeAllLists();

                            let xhr = new XMLHttpRequest();
                            xhr.open("POST", "php/api/readbooktable.php");
                            xhr.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    console.log(this.responseText);
                                    let myObj = JSON.parse(this.responseText);
                                    document.getElementById("vtitle").innerHTML = myObj[0]['title'];
                                    document.getElementById("vwriter").innerHTML = myObj[0]['writer'];
                                    document.getElementById("vyear").innerHTML = myObj[0]['pub_year'];
                                    document.getElementById("visbn").innerHTML = myObj[0]['isbn_issn'];
                                    document.getElementById("vgenre").innerHTML = myObj[0]['genre'];
                                    document.getElementById("vlocation").innerHTML = myObj[0]['location'];
                                    document.getElementById("vimage").src = "img/cover/" + myObj[0]['image'];   
                                }
                            }
                            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            let params = "id=" + id;
                            xhr.send(params);
                        });
                        elem.appendChild(b);
                }
            }
        }

        xmlhttp.open("POST", "php/api/readbook.php", true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let params = "search=" + val; 
        xmlhttp.send(params);

    });

    inp.addEventListener("keydown", function(e) {
        //ambil elemen yang trigger event
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            //KEYCODE 40 = DOWN BTN
            focus++;

            addActive(x);
        } else if (e.keyCode == 38) { //up
            //KEYCODE 38 = UP BTN
            focus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            //KEYCODE 13 = ENTER BTN

            //prevent the form from submitting
            e.preventDefault();
            if (currentFocus > -1) {
                /*klik autocomplete nya*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        //add active class
        if (!x) return false;

        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);

        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        //remove active class
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        // Tutup semua list item kecuali yang dikasih lewat arg
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*Dismiss autocomplete ketika klik dimana aja*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

//AJAX harus dipanggil SETIAP KALI user ngetik satu huruf untuk ganti array, ganti argumen kedua dengan ARRAY yang diambil dari AJAX
//Habis AJAX Request selesai, panggil
autocomplete(document.getElementById("myInput"));