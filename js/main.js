'use strict'; 

$(document).on('ready', function() {
 
var battletags = ["RobTheHatter-2816","MixeeD-2884", "BattlePants-23584", "UncleSKAM-2913", "Scytze-2484", "BR22ZNIK-2363"], accounts = [];    
    
function Person(name, rank, avatar, rankimg) {
    this.name = name;
    this.rank = rank;
    this.avatar = avatar;
    this.rankimg = rankimg;
}
    
    function removeLoading() {
       $(".loader").hide();
    }
    
    function victoriousTopThree() {
        var myTable = document.getElementById('resultTable');
        var winner =  myTable.rows[1];
        var second =  myTable.rows[2];
        var third =  myTable.rows[3];
        winner.style.color = "#baa400";
        winner.style.fontSize = "35px";
        
        second.style.color = "#c9c3bd";
        second.style.fontSize = "30px";
        
        third.style.color = "#995a23";
        third.style.fontSize = "25px";
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
                "<tr> <td><img src=" + player.avatar + " class='avatar'></td> <td><h2>" + (ind+1) + ". " + "</h2></td> <td><h3>" + player.name + "</h3><td> <td><h4 id='rank'>" + player.rank + "</h4></td> <td><img src=" + player.rankimg + " class='rankimg'></td> </tr>" 
                )
        });
        
        victoriousTopThree();
    };
    
function getAjax(printPlayers) {
    
    function getInfo(battletag) {
        $.get('https://api.lootbox.eu/pc/eu/'+ battletag +'/profile', function(data, status) {
                console.log("status for " + battletag + " is: " + status);
            if(data){
                if(data.data.competitive.rank > 0) {
                    var newPerson = new Person(data.data.username, Number(data.data.competitive.rank), data.data.avatar, data.data.competitive.rank_img);
                } else {
                    var newPerson = new Person(data.data.username, Number(data.data.competitive.rank),  data.data.avatar, "https://static-cdn.jtvnw.net/jtv_user_pictures/arandomderp-profile_image-26296c81ee70cb4f-300x300.png");
                }
                accounts.push(newPerson);
            }
               
        }).fail(function(req, error){
            $('.error-toast').append("<p style='color red'>There was error while Ajax call" + error + " :(");
            $('.error-toast').show().delay(2000).hide();
        });
    } 
    
    $.each(battletags, function(ind, battletag) {
        getInfo(battletag); 
    });
}
    
$( document ).ajaxStop(function() {
  printPlayers();
});    

    
getAjax();
    
    
}); 

