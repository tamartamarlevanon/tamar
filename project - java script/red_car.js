let mycars = new Array;
let the_board;
let aa;
let ans;
let flag;
let red_car1;
let flagAcsses = true;
//מחלקה של מכונית
class car {
    constructor(id, boardTop, boardLeft, along, across, sumSquares, color) {
        this.id = id;
        this.boardTop = boardTop;
        this.boardLeft = boardLeft;
        this.along = along;
        this.across = across;
        this.sumSquares = sumSquares;
        this.color = color;

    }

}

// מחלקה  של מכונית אדומה שיורשת ממכונית
class red_car extends car {

    constructor(id, boardTop, boardLeft, along, across, sumSquares, color) {
        super(id, boardTop, boardLeft, along, across, sumSquares, color)
    }

    check_win = (pos) => {
        pos = parseInt(pos)
        if (pos == the_board.exitLeft)
            this.goOut();
    }

    //פונקציה שמגיעים אליה כשהמכונית האדומה יוצאת
    goOut = () => {

        alert("wow!!!!! you did it!")
    }


}


//מחלקת הלוח
class board {
    constructor(cars, slotsize, sumslot, exitLeft) {
        this.cars = cars;
        this.slotsize = slotsize;
        this.sumslot = sumslot;
        this.exitLeft = exitLeft;
    }
    get_car_by_id = (id) => {
        this.cars.forEach((item) => {
            if (item.id == id)
                aa = item;



        })
        return aa;
    }
    place_is_avalible = (top, left) => {
        flag = true
        if (top < 100 || top > 600 || left > 1100 || left < 600)
            flag = false;
        console.log(this.cars.length)
        console.log(this.cars)
        this.cars.forEach((item) => {
            console.log(item.color + "*****")

            if (item.boardTop == top && item.boardLeft == left)
                flag = false
            let t = item.boardTop
            t = parseInt(t) + 100;


            let t2 = item.boardTop
            t2 = parseInt(t2) + 200;

            let l = item.boardLeft
            l = parseInt(l) + 100;


            let l2 = item.boardLeft
            l2 = parseInt(l2) + 200;

            if (item.along == "1") {
                if (item.sumSquares == "2") {
                    if (t == top && item.boardLeft == left)
                        flag = false;

                }
                else if (item.sumSquares == "3") {
                    if ((t == top || t2 == top) && item.boardLeft == left)
                        flag = false;

                }
            }
            else if (item.across == "1") {
                if (item.sumSquares == "2") {
                    if (item.boardTop == top && l == left)
                        flag = false;
                }
                else if (item.sumSquares == "3") {
                    if ((l == left || l2 == left) && item.boardTop == top)
                        flag = false;
                }
            }

        })
        return flag;


    }
    set_car_place = (selected_car_object, t, l) => {

        selected_car_object.boardTop = t;
        selected_car_object.boardLeft = l;


    }



}


//בודקת אם המשתמש מורשה ואם כן היא מפעילה את ביגין גיים(שטוען את הלוח)
okUser = (userList) => {
    let name = document.getElementById("enterName").value
    let password = document.getElementById("password").value
    userList.forEach(item => {
        if (name === item.name && password === item.password) {

            console.log("ok")
            fetch_boared()
            
        }
    });
    if (flagAcsses)
      alert(" משתמש לא מורשה")
}

//פונקציה שמביאה את הגיסון של המשתמשים ושולחת לאוקי יוזר
function start() {
    fetch("red_car_users.json")


        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log("carArray")
            okUser(data)
        })
        .catch(err => {
            alert(err);
        })
}
fetch_game = () => {
    fetch("red_car_boared.json")


        .then(res => {
            return res.json();
        })
        .then(data1 => {
            console.log("carArray")
            beginGame(data1)
        })
        .catch(err => {
            alert(err);
        })
        
}
// // new_game = () => {
// //     let b2 = document.getElementsByTagName("body")[0]
// //     let r_cars = document.getElementsByClassName("car")
// //     for (let i = 0; i < r_cars.length; i++) {
// //         b2.removeChild(r_cars[i])
// //     }

//     fetch_game();

// }

//מקבל את אוביקט הלוח מהגיסון

fetch_boared = () => {
    flagAcsses=false;
    if (localStorage.boared_state == undefined) {
        

        fetch_game();

    }
    else {
        let storageB = localStorage.boared_state
        let storageC = JSON.parse(storageB)
        let d = localStorage.date1
        alert("ברוך שובך מהמקום אשר הפסקת בו בתאריך:" + d)
        beginGame(storageC)

    }
}
//מתחילים לשחק-מימוש לוח ומכוניות
function beginGame(bo) {


    //ביטול הכפתור

    console.log("נכנס לbegingame")
    let a = document.getElementById("enterName")
    a.style.setProperty("display", "none")
    let b = document.getElementById("password")
    b.style.setProperty("display", "none")
    let c = document.getElementsByTagName("button")[0]
    c.style.setProperty("display", "none")
    let n = document.getElementsByTagName("br")[0];
    n.style.setProperty("display", "none")
    let n1 = document.getElementsByTagName("br")[1];
    n1.style.setProperty("display", "none")
    let n2 = document.getElementsByTagName("br")[2];
    n2.style.setProperty("display", "none")
    let n3 = document.getElementsByTagName("br")[3];
    n3.style.setProperty("display", "none")





    set_selected = (carItem) => {
        let carsBtn = document.getElementsByClassName("car");
        for (let i = 0; i < carsBtn.length; i++)
            carsBtn[i].classList.remove("selected");

        let carBtn = document.getElementById(carItem.id);
        carBtn.classList.add("selected");



    }
    // //אדומה  מימוש המכוניות
    red_car1 = new red_car(bo.cars[0].id, bo.cars[0].boardTop, bo.cars[0].boardLeft,
        bo.cars[0].along
        , bo.cars[0].across, bo.cars[0].sumSquares, bo.cars[0].color)
    console.log(red_car1)


    //מימוש המכוניות בלולאה 





    var carArray = bo.cars

    carArray.forEach((item, index) => {
        let trayCar = new car(item.id, item.boardTop, item.boardLeft,
            item.along
            , item.across, item.sumSquares, item.color)
        mycars[index] = trayCar;
        console.log(mycars[index])
        let theCar = document.createElement("button")
        let p = document.getElementsByTagName("body")[0];
        p.appendChild(theCar)
        theCar.classList.add("car");
        var car_id = trayCar.id;
        theCar.setAttribute("id", car_id);

        theCar.onclick = () => set_selected(theCar);

        theCar.style.setProperty("background-color", item.color)

        if (item.along == 1) {

            let height1 = parseInt(item.sumSquares) * 100;
            height1 = height1 + 'px';
            theCar.style.setProperty("height", height1);
            theCar.style.setProperty("width", "100px");
        }

        else {
            let width1 = parseInt(item.sumSquares) * 100;
            width1 = width1 + 'px';
            theCar.style.setProperty("height", "100px");
            theCar.style.setProperty("width", width1);
        }

        let left1 = parseInt(item.boardLeft);
        left1 = left1 + 'px'

        theCar.style.setProperty("left", left1)

        let top1 = parseInt(item.boardTop);
        top1 = top1 + 'px'
        theCar.style.setProperty("top", top1)

    });

    //מימוש הלוח

    the_board = new board([red_car1, mycars[1], mycars[2],
        mycars[3], mycars[4], mycars[5], mycars[6], mycars[7], mycars[8],
        mycars[9], mycars[10], mycars[11]], bo.slotsize, bo.sumslot, bo.exitLeft)
    console.log(the_board)
    let drawBoard = document.getElementById("board")
    drawBoard.style.setProperty("background-color", "gray");
    let size = parseInt(bo.slotsize) * parseInt(bo.sumslot);
    size = size + 'px'
    drawBoard.style.setProperty("height", size);
    drawBoard.style.setProperty("width", size);
    drawBoard.style.setProperty("left", "593px");
    drawBoard.style.setProperty("top", "93px");

    //תמונה של מקום הסיום
    let img_end = document.getElementById("img_end")
    img_end.setAttribute("id", "img_out");
    let end_place = document.getElementById("end_place")
    document.getElementById("img_out").src = "imgg.png";
    img_end.style.setProperty("height", "100px");
    img_end.style.setProperty("width", "50px");
    end_place.style.setProperty("left", "1200px");
    end_place.style.setProperty("top", "300px");




}

up = () => {

    let selected_car = document.getElementsByClassName('selected')[0];
    let selected_car_object = the_board.get_car_by_id(selected_car.id);

    if (selected_car_object.along == "1") {
        let top = selected_car.style.top;
        top = parseInt(top)
        top = parseInt(top) - 100
        let left = selected_car.style.left;
        left = parseInt(left);
        //לבדוק אם המקום פנוי
        let is_avalible = the_board.place_is_avalible(top, left)
        if (is_avalible) {
            the_board.set_car_place(selected_car_object, top.toString(), left.toString())
            top = top + "px"
            selected_car.style.top = top
            console.log(top)

        }
    }

}

down = () => {

    let selected_car = document.getElementsByClassName('selected')[0];
    let selected_car_object = the_board.get_car_by_id(selected_car.id)
    if (selected_car_object.along == "1") {
        let top = selected_car.style.top;
        let left = selected_car.style.left;
        left = parseInt(left);
        top = parseInt(top)
        top = parseInt(top) + (100 * parseInt(selected_car_object.sumSquares))
        //לבדוק אם המקום פנוי
        let is_avalible = the_board.place_is_avalible(top, left)
        if (is_avalible) {
            let top1 = selected_car_object.boardTop
            top1 = parseInt(top1) + 100;
            the_board.set_car_place(selected_car_object, top1.toString(), left.toString())
            top1 = top1 + "px"
            selected_car.style.top = top1
            console.log(top1)
        }
    }


}


right = () => {

    let selected_car = document.getElementsByClassName('selected')[0];
    let selected_car_object = the_board.get_car_by_id(selected_car.id)
    if (selected_car_object.across == "1") {
        let left = selected_car.style.left;

        left = parseInt(left)
        left = parseInt(left) + (100 * parseInt(selected_car_object.sumSquares))
        let top = selected_car_object.boardTop
        top = parseInt(top)
        //לבדוק אם המקום פנוי
        let is_avalible = the_board.place_is_avalible(top, left)
        if (is_avalible) {
            let left1 = selected_car_object.boardLeft
            left1 = parseInt(left1) + 100;
            the_board.set_car_place(selected_car_object, top.toString(), left1.toString())
            left1 = left1 + "px"
            selected_car.style.left = left1
            console.log(left1)
            if (selected_car_object.id === "111")
                red_car1.check_win(selected_car_object.boardLeft);
        }
    }


}

left = () => {

    let selected_car = document.getElementsByClassName('selected')[0];
    let selected_car_object = the_board.get_car_by_id(selected_car.id)
    if (selected_car_object.across == "1") {
        let left = selected_car.style.left;
        left = parseInt(left) - 100
        let top = selected_car_object.boardTop
        //לבדוק אם המקום פנוי
        let is_avalible = the_board.place_is_avalible(top, left)
        if (is_avalible) {
            the_board.set_car_place(selected_car_object, top.toString(), left.toString());
            left = left + "px"
            selected_car.style.left = left


        }
    }
}
storage = () => {
    let b = JSON.stringify(the_board)
    localStorage.setItem("boared_state", b);
    let date = new Date();
    localStorage.setItem("date1", date);

}
