let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
document.getElementById("date").valueAsDate = new Date();
tg.expand(); //расширяем на все окно

tg.MainButton.text = "Показать расписание"; //изменяем текст кнопки
tg.MainButton.color = "#143F6B"; //изменяем цвет бэкграунда кнопки
tg.MainButton.setParams({ color: "#143F6B" }); //так изменяются все параметры
tg.MainButton.show();

var day = true;
var dayPicker = () => {
    const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };

  var dates  = new Date(date.value);
  fetch("http://92.255.107.234:5000/schedule/"+ group.value +"/"+dates.toLocaleDateString('ru')+"/day", myInit).then(
    (response) => {

      response.json().then((e) => {
        var tables = ""
        var count = 0
        e['data'].forEach(element => {
            tables += "\
            <tr>\
                <th scope=\"row\">"+count+"</th>\
                <td>"+ element['m:UF_ID_SUBJECT'] +"</td>\
                <td>"+ element['m:UF_ID_TEACHER'] +"</td>\
                <td>"+ element['m:UF_LECTURE'] +"</td>\
            </tr>\
            "
            count ++
        });;
        
        document.getElementById("forms").innerHTML = "\
        <table class=\"table table-striped table-dark\">\
                <thead>\
                    <tr>\
                    <th scope=\"col\">Пара</th>\
                    <th scope=\"col\">Наименование</th>\
                    <th scope=\"col\">Преподаватель</th>\
                    <th scope=\"col\">кабинет</th>\
                    </tr>\
                </thead>\
                <tbody>\
        " + tables + "</tbody> </table>"
    
      })
    }
  );
}
Telegram.WebApp.onEvent("mainButtonClicked", function () {
  var group = document.getElementById("group").value;
  var date = document.getElementById("date").value;
  if (group != "") {
    if (day) {

      dayPicker()

    } else {
      document.getElementById("forms").innerHTML += "на неделю";
    }
  }
});

var dayAndWeek = document.getElementById("dayAndWeek");




dayAndWeek.onclick = function () {
  day = document.getElementById("dayAndWeek").checked;
  dayPicker()
};
