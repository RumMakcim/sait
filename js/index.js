//это функция вызывается при загрузке страницы . используется джекквери
$(document).ready(function () {

    
    var items = test();
    console.log(items);

    
    var lists = $('#itemsList');

    
    items.forEach(el => {
        lists.append('  <div class="col-3"> \
                            <div class="card" style="width: 18rem;"> \
                            <img style="height: 200px" src="' + el.path_img + ' " class="card-img-top" alt="..."> \
                                <div class="card-body"> \
                                    <h5 class="card-title">' + el.name + ' </h5> \
                                    <p class="card-text">' + el.desc + ' </p> \
                                    <p class="card-text">' + el.price + ' </p> \
                                    <input type="button" class="btn btn-primary" value="Добавить в корзину" onclick="addKorzina(' + el.id + ')"> \
                                </div> \
                            </div> \
                        </div>');
    }); 

    if (get_cookie('korzina') != null) { 
      
        korzina = JSON.parse(get_cookie('korzina'));
    } else {
        korzina = [];
    }
    getCountItemInKorzina();

});

var korzina = [
]

function test() {
    let items;
    //аякс используется для неблокирующего запроса 
    $.ajax({
        //
        url: 'http://127.0.0.1:7000/api/users',
        type: 'GET', 
        async: false,
        success: function (response) {
            console.log(response);
            items = response.results;
        }
    });
    return items;
};


function addKorzina(id) {

    var flag = false; 
    korzina.forEach(el => {
        if (el.id === id) {
            el.count++;
            flag = true;
        }
    });
  
    if (!flag) {
        korzina.push({
            id: id,
            count: 1,
        })
    }
    document.cookie = "korzina=" + JSON.stringify(korzina) + ""; 
    getCountItemInKorzina();
};

function getCountItemInKorzina() {
    
    countKorzina = $('#countKorzina');

    var x = JSON.parse(get_cookie('korzina'));
    var countItem = 0;
    x.forEach(el => {
        console.log(el);
        countItem += el.count
    });
    console.log(countItem);
    if (countItem > 0)
        countKorzina.text("(" + countItem + ")")
    else {
        countKorzina.text("")
    }
}

//Готовая функция из интернета 
function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}

function seeSun() {
    $("#sun").toggleClass('d-none');
}