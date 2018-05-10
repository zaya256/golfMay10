let numplayers = 4;
let allcourses;
let selcourse;


loadDoc();

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            allcourses = JSON.parse(this.responseText);
            console.log(allcourses);
            for (let i = 0; i < allcourses.courses.length; i++){
                $(".courseDropdown").append("<option value='"+ allcourses.courses[i].id +"'>" +
                    allcourses.courses[i].name +
                    "</option>");
            }
        }
    };

    xhttp.open("GET", "https://uxcobra.com/golfapi/courses.txt", true);
    xhttp.send();


}

function getCourse(courseid) {
    $(".teeDropdown").html('');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            selcourse = JSON.parse(this.responseText);
            console.log(selcourse);
            let holeonetees = selcourse.data.holes[0].teeBoxes;
            for (let i = 0; i < holeonetees.length; i++){
                $(".teeDropdown").append("<option value='"+ i +"'>"+ holeonetees[i].teeType +"</option>");
            }
        }
    };

    xhttp.open("GET", "https://uxcobra.com/golfapi/course" + courseid + ".txt", true);
    xhttp.send();

}

//uunii daraa createcard hiigeed, add remove players hiigeerei.
function setTee(teeindex){
    $(".right").html("");
    //it gets fresh set of holes each time deerh n

    let mycourse = selcourse.data.holes;
    for(let i = 0; i < mycourse.length; i++){
        $(".right").append("<div class='column' id='c" + i +"'>"+
            "<div class='cheader'>" + (i+1) + "</div>" +
            "<div class='yds'>YARDS:"+ mycourse[i].teeBoxes[teeindex].yards +"</div>" +
            "<div class='yds'>PAR:"+ mycourse[i].teeBoxes[teeindex].par +"</div>" +
            "<div class='yds'>HCP:"+ mycourse[i].teeBoxes[teeindex].hcp +"</div>" +
            "</div>");

    }
//hcp handicap, par 2iig nemeerei odoo
    buildCard();
}

function buildCard() {
    for (let p = 1; p <= numplayers; p++){
        $(".left").append("<div class='playa"+ p +"'><span onclick='delPlayer("+ p +")' class='fa fa-trash'></span><span contenteditable=\"true\" >player" + p +"</span></div>");
        //ene  derh n 18 hole uusgene
        for(let h = 0; h < selcourse.data.holes.length; h++){
            $("#c" + h).append("<input id='p" + p +"h"+ h +"' type='text' class='holeinput playa"+ p +"'>");


        }
    }

}

function delPlayer(incPlayer){
    $(".playa" + incPlayer).remove();
}



//total gesen column hiine odoo. hamgiin bar tald col uusgeed.


//google map nemj bolno
//google font
//deletelehed fontawesomees use


let numberofholes = 18;

function addScore(myval) {
    console.log(myval);
    let tempscore = 0;
    for (let i = 0; i <= numberofholes; i++) {
        let invalue = Number($("#p" + myval + "h" + i).val());
        tempscore += invalue;
    }

    $(".total" + myval).html(tempscore);
}













