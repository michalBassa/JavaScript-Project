//נתוני המשחק
let levelCard = 0;
let timeWiting;
let timeTimer;
let minuts = 120;
let name1,name2,name;
let player=1;
let place1=-1,place2=-1;
let data;
let data_str;
let user_data_index;
let old_user_data;
let card;
let level;
let firstCard, secondCard, pressCount = 0;
let countPoint1 = 0, countPoint2 = 0;
//מערך תמונות
let arrPicture = ["picture/img1.jpg", "picture/img2.jpg", "picture/img3.jpg"
    , "picture/img4.jpg", "picture/img5.jpg", "picture/img6.jpg", "picture/img7.jpg",
    "picture/img8.jpg", "picture/img9.jpg", "picture/img10.jpg", "picture/img11.jpg","picture/img12.jpg"];

let arrCards = [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "];
let arrHelp=[];


let vPair = new Audio("music/מציאת זוג.WAV ")
let vHome = new Audio("music/לא זוג.WAV");

