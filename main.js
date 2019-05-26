$(document).ready(function(){
  var player = $("#template_player").html();
  var template_player_function = Handlebars.compile(player);

  $("button").click(function(){

    $(".container").empty();

    var numero_card = $(".input").val();

    if(numero_card <= 50){
      $.ajax({
        url: "https://www.boolean.careers/api/array/basket",
        method: "GET",
        data: {
          "n": numero_card
        },
        success: function (data, stato) {

          var context;
          for (var i = 0; i < numero_card; i++) {
            context = {
              "codice": data.response[i].playerCode,
              "punti": data.response[i].points,
              "rimbalzi": data.response[i].rebounds,
              "falli": data.response[i].fouls,
              "duepunti": data.response[i].twoPoints,
              "trepunti": data.response[i].threePoints,
            };
            var html = template_player_function(context);

            $(".container").append(html);
          }
        },
        error: function () {
          alert("E' avvenuto un errore. Inserisci un numero corretto");
        }
      });
    } else {
      alert("Hai inserito un numero sbagliato");
    }
    $(".input").val("");
  });
});
