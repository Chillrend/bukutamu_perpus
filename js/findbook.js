

function autocomplete(inp, arr) {

    let focus;
    inp.addEventListener("input", function(e) {
        let elem, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        focus = -1;
        elem = document.createElement("DIV");
        elem.setAttribute("id", this.id + "autocomplete-list");
        elem.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(elem);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                //Kasih click listener di variable b, kalo di klik ambil data pake ajax, tros datanya tampilin di detail buku paling atas, PIKIR NDIRI
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                    //TARO AJAX CALL BUAT AMBIL DETAIL BUKU DISINI

                    inp.value = this.getElementsByTagName("input")[0].value;

                    closeAllLists();
                });
                elem.appendChild(b);
            }
        }
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

//Ambil variable ini via AJAX bentuk JSON, pikir ndiri. Modelnya HARUS persis kaya gini, atau bikin method sendiri.
var buku = ["Conway's All the World's Fighting Ships", "Kama Sutra", "The Holy Book", "Bealdor's Secret"];

//AJAX harus dipanggil SETIAP KALI user ngetik satu huruf untuk ganti array, ganti argumen kedua dengan ARRAY yang diambil dari AJAX
//Habis AJAX Request selesai, panggil
autocomplete(document.getElementById("myInput"), buku);