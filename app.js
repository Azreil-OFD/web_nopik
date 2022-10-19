let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
document.getElementById('date').valueAsDate = new Date();
tg.expand(); //расширяем на все окно

tg.MainButton.text = "Показать расписание"; //изменяем текст кнопки
tg.MainButton.color = "#143F6B"; //изменяем цвет бэкграунда кнопки
tg.MainButton.setParams({"color": "#143F6B"}); //так изменяются все параметры
tg.MainButton.show()

var day = true;

Telegram.WebApp.onEvent('mainButtonClicked', function(){
    var group = document.getElementById('group').value
    var date = document.getElementById('date').value
    if (group != "") {
        document.getElementById('forms').innerHTML = "тут будет расписание<br/>Для группы:" + group + "<br/>На " + date;
        if (day) {
            document.getElementById('forms').innerHTML += 'на день'
        } else {
            document.getElementById('forms').innerHTML += 'на неделю'
        }
    }

});

var dayAndWeek = document.getElementById('dayAndWeek');

dayAndWeek.onclick = function() {
    
    day = document.getElementById('dayAndWeek').checked

    
}
 
