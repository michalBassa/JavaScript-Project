//לוגיקת המשחק

//בעת כל טעינת דף היטמל תיפתח הפונקציה של הדף הנוכחי לפי הידי של הדף
window.onload = function () {
    switch (document.querySelector("body").id) {
        case "homePage":
            home_page_main();
            break;
        case "bodyGame":
            start_game_main();
            break;
    }
}
//פונקציות דף הבית
function home_page_main() {
    document.getElementById("level1").addEventListener("click", chooseLevelFun);
    document.getElementById("level2").addEventListener("click", chooseLevelFun);
}
//פונקצית בחירת הרמה התאמה של כמות כרטיסים ושמירה בזיכרון
function chooseLevelFun() {
    level = event.target.value
    event.target.style.backgroundColor = "lightblue";
    document.getElementById("level1").removeEventListener("click", chooseLevelFun);
    document.getElementById("level2").removeEventListener("click", chooseLevelFun);
    if (level == "level1") {
        levelCard = 8;
    }
    else if (level == "level2") {
        levelCard = 12;
    }
    level_str = JSON.stringify(levelCard);
    localStorage.setItem("countCard", level_str);
    enterName()
}
//פונקציה שמירת שמות השחקנים בזיכרון
function enterName() {
    name1 = document.getElementById("name1").value;
    name2 = document.getElementById("name2").value;
    //localStorageשמירת השמות של השחקנים הנוכחים ב 
    data_str = JSON.stringify(name1);
    localStorage.setItem("currentName1", data_str);
    data_str = JSON.stringify(name2);
    localStorage.setItem("currentName2", data_str);
}
//פונקציות של דף המשחק
function start_game_main() {
    //localStorageשלפנו את שמות השחקנים וכן את רמת המשחק מה
    name1 = localStorage.getItem("currentName1");
    name2 = localStorage.getItem("currentName2");
    levelCard = localStorage.getItem("countCard");
    name = name1;
    //לכל כרטיס-תמונה הגרלנו 2 מקומות שונים במערך הכרטיסים
    for (let i = 0; i < levelCard; i++) {
        place1 = Math.floor(Math.random() * (levelCard * 2));
        place2 = Math.floor(Math.random() * (levelCard * 2));
        while (arrCards[place1] != " ") { place1 = Math.floor(Math.random() * (levelCard * 2)); }
        while (arrCards[place2] != " " || place2 == place1) { place2 = Math.floor(Math.random() * (levelCard * 2)); }
        arrCards[place1] = arrPicture[i];
        arrCards[place2] = arrPicture[i];
    }

    //הכנת כרטיסים מוסתרים בלוח המשחק
    //כל כרטיס מסתיר תמונה לפי ההידי שלו במערך הכרטיסים
    for (let i = 0; i < levelCard * 2; i++) {
        card = document.createElement("img");
        card.setAttribute("src", "picture/qestion.jpg")
        card.setAttribute("id", i);
        card.setAttribute("class", card);
        card.addEventListener("click", changeCard);
        document.getElementById("board").appendChild(card);
    }
    arrHelp = document.querySelectorAll("img");
    document.getElementById("titleForCurentPlayer").innerHTML = "now " + name + " play"
    document.getElementById("pDatails").innerHTML = name1 + "you win :" + countPoint1 + " numbers" + "<br>" + name2 + "you win :" + countPoint2 + " numbers"

    beginTimer()
}
//הפיכת קלף נבחר והצגתו למשתמש
//אם הקלף המורם הינו הכרטיס השני - שליחה לפונקצית הבדיקה
function changeCard() {
    pressCount++;
    event.target.src = arrCards[event.target.id];
    if (pressCount == 1)
        firstCard = event.target.src;
    else {
        secondCard = event.target.src;
        pressCount = 0;
        check();
    }
}
//פונקציה הבודקת האם הכרטיסים הים זוג-התמונות זהות
//אם כן השארתם גלויות בלוח המשחק
//אחרת הפיכתם לאחר כמה שניות
function check() {

    if (firstCard == secondCard) {
        vPair.play();
        player == 1 ? countPoint1++ : countPoint2++;
        document.getElementById("pDatails").innerHTML = name1 + "you win :" + countPoint1 + "numbers" + "<br>" + name2 + "you win :" + countPoint2 + "numbers"
        if (countPoint1 + countPoint2 == levelCard)
            finish();
        for (let i = 0; i < arrHelp.length; i++) {
            if (arrHelp[i].src == firstCard || arrHelp[i].src == secondCard)
                arrHelp[i].removeEventListener("click", changeCard);
        }
        //  arrHelp[returenIndex(firstCard)].removeEventListener("click", changeCard);
        //  arrHelp[returenIndex(secondCard)].removeEventListener("click", changeCard);

    }
    else {
        if (player == 1) {
            player = 2,
                name = name2
        }
        else {
            player = 1,
                name = name1
        }

        vHome.play();
        timeWiting = setTimeout("backCard()", 900)

    }
}
//פונקציה המקבלת כתובת תמונה ומחזירה את ההינקס במערך העזר
function  returenIndex(address) {
    return  (arrHelp.findIndex(img=>img.src==address))
}

function backCard() {
    for (let i = 0; i < arrHelp.length; i++) {
        if (arrHelp[i].src == firstCard || arrHelp[i].src == secondCard)
            arrHelp[i].src = "picture/qestion.jpg";
    }
    // arrHelp[returenIndex(firstCard)].src="picture/qestion.jpg";
    // arrHelp[returenIndex(secondCard)].src="picture/qestion.jpg";

    document.getElementById("titleForCurentPlayer").innerHTML = "now " + name + " play"
}
//פונקצית סיום המדפיסה את המנצח
//שולחת נתונים לפונקצית עידכון בזיכרון
//וכן מוסיפה כפתור שבעת מעבר עליו מוצגים כל שחקני המשחק לפי מספר השיאים שלהם
function finish() {
    if (countPoint1 > countPoint2) {
        document.getElementById("titleForCurentPlayer").innerHTML = "***********" + name1 + "************";
    }
    else if (countPoint2 > countPoint1) {
        document.getElementById("titleForCurentPlayer").innerHTML = "***********" + name2 + "************";
    }
    else {
        document.getElementById("titleForCurentPlayer").innerHTML = "***********" + name1 + "&" + name2 + "***********";
    }
    document.getElementById("board").innerHTML= " "
    //פונציה מקבלת ערכים
    update_score(name1, countPoint1)
    update_score(name2, countPoint2)

    let toSeeScore=document.createElement("button");
    toSeeScore.setAttribute("id","idToSeeScore");
    toSeeScore.innerHTML="toSeeMoveOMe"
    document.getElementById("board").appendChild(toSeeScore);
    toSeeScore.addEventListener("mouseover",p=>{
    data_str = localStorage.getItem("high_score");
    data = JSON.parse(data_str);
   data.sort((p1,p2)=> p1.score-p2.score);
    data.reverse();
    data.forEach((person, number) => {
        document.querySelector("#board").innerHTML += `
        <div>
            ${number + 1}.
            <strong>name: </strong> ${person.name},
            <strong>score: </strong> ${person.score}
        </div>
        `;
    });
    })

}
//פונקצית עידכון נקודות בזיכרון
//הפונקציה מקבלת שם ונקודות
//שולפת את השחקן מהזיכרון 
//אם הוא קיים מעדכת את השיא שלו-רק אם מספר הנקודות העכשוי גדול
//אם לא מכניסה אותו לזיכרון
function update_score(name, current_score) {

    data_str = localStorage.getItem("high_score");
    data;
    if (!data_str) {
        data = [];
    } else {
        data = JSON.parse(data_str);
    }
    user_data_index = data.findIndex(obj => obj.name == name);

    if (user_data_index > -1) {
        old_user_data = data[user_data_index];
        // נבדוק האם השיא הנוכחי גדול מהקיים
        if (current_score > old_user_data.score) {
            old_user_data.score = current_score;
            data[user_data_index] = old_user_data;
            document.getElementById("board").innerHTML+= name + " your score : " + current_score + " you go up!!!!"+"<br>"
        }
        else{
            document.getElementById("board").innerHTML += name + " your score to current play : " + current_score + " is less from prev play score : " + old_user_data.score+"<br>"
        }

    } else {
        //אם לא קיים מכינה לו אובייקט חדש לזיכרון
        document.getElementById("board").innerHTML += name + " your score : " + current_score + "  this good start!!!"+"<br>"
        const person = {
            name: name,
            score: current_score,
        };
        data.push(person);
    }
    // שמירת המערך המעודכן לזיכרון
    data_str = JSON.stringify(data);
    localStorage.setItem("high_score", data_str);
}
//טיימר 
function beginTimer() {
    timeTimer = setInterval("movesTimer()", 1000)
}
function movesTimer() {
    if (minuts > 0) {
        document.getElementById("pTimer").innerHTML = minuts;
        minuts--;
    }
    else {
        clearInterval(timeTimer)
        document.getElementById("pTimer").innerHTML = "time is over"
        //finish()
    }
}


