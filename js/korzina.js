$(document).ready(function () { //это функция вызывается при загрузке страницы . используется джекквери

    getStart();

});

function getStart(){
    if (get_cookie('korzina') != null) { 
        
        korzina = JSON.parse(get_cookie('korzina'));
    } else {
        korzina = [];
    }

    
    var items = test();
    console.log(items);

    
    var lists = $('#itemsListTable');

    var fullPrice = 0;
    
    items.forEach(el => {
       
        korzina.forEach(item => {
            
            if(item.id == el.id){
                fullPrice += el.price*item.count;
                lists.append('<tr>\
                                <th scope="row">' + el.id + '</th> \
                                <td>' + el.price + '</td> \
                                <td>' + el.name + '</td> \
                                <td>' + el.desc + '</td> \
                                <td>' + item.count + '</td> \
                                <td><img style="height: 50px; width: auto;" src="' + el.path_img + ' " class="card-img-top" alt="..."></td> \
                            </tr>');
            }
        });
    });


    getCountItemInKorzina();
    $('#fullPrice').text(fullPrice); 
}

var korzina = [
]


function getCountItemInKorzina() {

    countKorzina = $('#countKorzina');

    var x = JSON.parse(get_cookie('korzina'));
    let countItem = 0;
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

function test() {
    let items;
    $.ajax({
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


//Готовая функция из интернета
function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}


function delete_cookie ( cookie_name )
{
  var cookie_date = new Date ( );  // Текущая дата и время
  cookie_date.setTime ( cookie_date.getTime() - 1 );
  document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}
//функция при нажатии на кнопку удаляет куку корзина и обновляет страницу
function clearKorzina(){ 
    delete_cookie('korzina');
    document.location.href = "korzina.html"
}