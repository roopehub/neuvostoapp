(function(){
'use strict'; 

$(document).on('ready', function() {
 
var battletags = ["RobTheHatter-2816","MixeeD-2884", "Noa-2638", "BattlePants-23584", "UncleSKAM-2913", "Steak-21636", "RebelByte-2844", "Scytze-2484", "BR22ZNIK-2363", "Forssakengod-2172", "Santeri-2991"], accounts = [];    
    
function Person(name, rank, avatar, rankimg, played, winpercent) {
    this.name = name;
    this.rank = rank;
    this.avatar = avatar;
    this.rankimg = rankimg;
    this.played = played;
    this.winpercent = winpercent;
}
    
    function removeLoading() {
       $(".loader").hide();
    }
    
    function showSlowInfoToast() {
          $(".slowbroInfoToast").delay(5000).slideDown(2000).delay(4000).slideUp(1000);
    }
    
    /*give the three*/
    function victoriousTopThree() {
        var myTable = document.getElementById('resultTable');
        
        for(let i=1 ; i < 4 ; i++) {
            console.log(i);
            switch(i) {
                case 1:
                    myTable.rows[i].style.color = "#baa400";
                    myTable.rows[i].style.fontSize = "35px";
                break;
                case 2:
                    myTable.rows[i].style.color = "#7f8082";
                break;
                case 3:
                    myTable.rows[i].style.color = "#995a23";
                default:
                    console.log("crowned all the victors");
            }
        }
    }
        
    var printPlayers = function(){
        removeLoading();
        
        var sortAccounts = function() {
            accounts.sort(function(a, b) {
            return b.rank - a.rank;
            });
        }
        
        sortAccounts();
        
        $.each(accounts, function(ind, player){
              $("#resultTable > tbody").append(
                "<tr>" +
                  "<td><img src=" + player.avatar + " class='avatar'></td>" +
                  "<td><h2>" + (ind+1) + ". " + "</h2></td>" +
                  "<td><h3>" + player.name + "</h3><td>" +
                  "<td><h4 id='rank'>" + player.rank + "</h4></td>" +
                  "<td><img src=" + player.rankimg + " class='rankimg'/></td>" +
                  "<td><h3>" + player.played + "</h3></td>" +
                  "<td><h3>" + player.winpercent + "%</h3></td>" +
                  "</tr>" 
                )
        });
        
        victoriousTopThree();
    };
 
/* start of the script */
function getAjax(printPlayers) {
    /*the ajax call that is called upon each item in the battletags -list*/
    function getInfo(battletag) {
        $.get('https://api.lootbox.eu/pc/eu/'+ battletag +'/profile', function(data, status) {
                console.log("status for " + battletag + " is: " + status);
            if(data){
                console.log(data);
                var played_games = data.data.games.competitive.played ? data.data.games.competitive.played : 0 ;
                var winpercent = played_games > 0 ? Number((data.data.games.competitive.wins / played_games) * 100).toFixed(2) : 0 ;
                    if(Number(data.data.competitive.rank) > 0) {
                    var newPerson = new Person(data.data.username, Number(data.data.competitive.rank),
                                               data.data.avatar, data.data.competitive.rank_img, played_games, winpercent );
                } 
                else {
                    var newPerson = new Person(data.data.username, Number(data.data.competitive.rank),
                                               data.data.avatar, "https://imgflip.com/s/meme/Derp.jpg", played_games, winpercent);
                }
                accounts.push(newPerson);
            }
               
        }).fail(function(req, error){
            $('.error-toast').append("<p style='color red'>There was error while Ajax call" + error + " :(");
            $('.error-toast').show().delay(2000).hide();
        });
    } 
    
    //show the info toast 
    showSlowInfoToast();
    
    /*do a ajax call to each item in battletags -list*/
    $.each(battletags, function(ind, battletag) {
        getInfo(battletag); 
    });
}

/*wait until all Ajax calls are made then print the results*/
$( document ).ajaxStop(function() {
  printPlayers();
});    

/* Trigger the script */
getAjax();
    
}); 

})();
