const initialstate = [
    ['br','bn','bb','bq','bk','bb','bn','br'],
    ['bp','bp','bp','bp','bp','bp','bp','bp'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['wp','wp','wp','wp','wp','wp','wp','wp'],
    ['wr','wn','wb','wq','wk','wb','wn','wr']
]

var currentstate = initialstate

var whiteturn = true;
var storedpiece = {'row':8,'column':8,'stored':false};

const piecedict = {'wr':'♜','wn':'♞','wb':'♝','wq':'♛','wk':'♚','br':'♜','bn':'♞','bb':'♝','bq':'♛','bk':'♚','bp':'♟','wp':'♟','w':'whitePiece','b':'blackPiece'}

function blankSpace(count,y,x)
{
    if (count==true)
    {
        return (`<div id="${y,x}" class="lightSquare" onclick="handleclick(${y},${x})"></div>`)
    }
    else
    {
        return (`<div id="${y,x}" class="darkSquare" onclick="handleclick(${y},${x})"></div>`)
    }
}

function occupiedSpace(white,y,x,piece)
{
    if(white==true)
    {
        return (`<div id="${y,x}" class="lightSquare ${piecedict[piece[0]]}" onclick="handleclick(${y},${x})">${piecedict[piece]}</div>`)
    }
    else
    {
        return(`<div id="${y,x}" class="darkSquare ${piecedict[piece[0]]}" onclick="handleclick(${y},${x})">${piecedict[piece]}</div>`)
    }
}

function updateboard()
{   
    //Vi starter med å fjerne alle children ifra brettet
    document.getElementById('board').innerHTML=''
    //Vi sjekker hver rute i matrisen og bruker count for å se om tallet er delelig med 2 for å vite om det er svart eller hvit rute
    var white = true
    for(y=0;y<8;y++){
        if(y%2==0){
            white = true;
        }
        else{
            white = false;
        }
        for(x=0;x<8;x++){
            console.log(currentstate[y][x])
            if(currentstate[y][x]=='')
            {
                document.getElementById("board").innerHTML+=(blankSpace(white,y,x))
            }
            else
            {
                document.getElementById("board").innerHTML+=(occupiedSpace(white,y,x,currentstate[y][x]))
            }
            if(white == true){
                white=false
            }
            else{
                white=true
            }
        }
    }
}

function movepiece(column,row)
{
    //Sjekk om bruker prøver å flytte til en rute med egen brikke på
    if(whiteturn == true && currentstate[row][column][0] == "w" || whiteturn == false && currentstate[row][column][0] == "b")
    {
        return
    }
    //Finn ut hvilken brikke som skal flyttes
    switch(currentstate[storedpiece["row"]][storedpiece["column"]][1])
    {
        case "r":
            //Tårnet kan bare flyttes i rett linje så om både x og y er forskjellige så flytter vi ikke brikken
            if(storedpiece['row']!=row && storedpiece['column']!=column)
            {
                return
            }
            //Om Y er forskjellig sjekker vi om noe er i veien i samme kolonne
            else if(storedpiece['row']!=row && storedpiece['column']==column)
            {
                if(row>storedpiece['row'])
                {
                    for (i=storedpiece['row']+1;row>i;i++){
                        if(currentstate[i][storedpiece['column']]!='')
                        {
                            return
                        }
                        else{
                            continue
                        }
                    }
                    //om det ikke er noe i veien så flytter vi brikken og oppdaterer brettet
                    currentstate[row][column]=currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']]=''
                    updateboard()
                    if(whiteturn==true){
                        whiteturn=false
                    }
                    else{
                        whiteturn=true
                    }
                }
                else{
                    for (i=storedpiece['row']-1;row<i;i--){
                        if(currentstate[i][storedpiece['column']]!=''){
                            return
                        }
                        else{
                            continue
                        }
                    }
                    //om det ikke er noe i veien så flytter vi brikken
                    currentstate[row][column]=currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']]=''
                    updateboard()
                    if(whiteturn==true){
                        whiteturn=false
                    }
                    else{
                        whiteturn=true
                    }
                }
            }
            //Om X er forskjellig sjekker vi om noe er i veien på samme rad
            else if(storedpiece['row']==row && storedpiece['column']!=column){
                if(column>storedpiece['column'])
                {
                    for (i=storedpiece['column']+1;column>i;i++){
                        if(currentstate['row'][storedpiece[i]]!='')
                        {
                            return
                        }
                        else{
                            continue
                        }
                    }
                    //om det ikke er noe i veien så flytter vi brikken
                    currentstate[row][column]=currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']]=''
                    updateboard()
                    if(whiteturn==true){
                        whiteturn=false
                    }
                    else{
                        whiteturn=true
                    }
                }
                else{
                    for (i=storedpiece['column']-1;column<i;i--){
                        if(currentstate['row'][storedpiece[i]]!=''){
                            return
                        }
                        else{
                            continue
                        }
                    }
                    //om det ikke er noe i veien så flytter vi brikken
                    currentstate[row][column]=currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']]=''
                    updateboard()
                    if(whiteturn==true){
                        whiteturn=false
                    }
                    else{
                        whiteturn=true
                    }
                }
            }
            else
            {
                return
            }
        case "n":
        //sjekker for gyldig knight trekk
            if((Math.abs(storedpiece['row'] - row) == 2 && 
            Math.abs(storedpiece['column'] - column) == 1) || 
            (Math.abs(storedpiece['row'] - row) == 1 && 
            Math.abs(storedpiece['column'] - column) == 2)) {
            // sjekker om kordinate er okkupert av samme brikke eller ikke
            if(currentstate[row][column] !='' && currentstate[storedpiece["row"]] 
            [storedpiece["column"]][0] == currentstate[row][column][0]){
                return;
            }
                // beveger knight til stedet.
                currentstate[row][column] = currentstate[storedpiece["row"]][storedpiece["column"]];
                currentstate[storedpiece["row"]][storedpiece["column"]] = '';
                updateboard()
                if(whiteturn==true){
                    whiteturn=false
                }
                else{
                    whiteturn=true
                }
            } else {
                return;
            }
            break;


        case "b":
              // Sjekker at løper bare går diagonalt
              if (Math.abs(storedpiece['row'] - row) == Math.abs(storedpiece['column'] - column)) {
                // sjekker om noen av egne brikker blokker.
                var rowDirection = storedpiece['row'] < row ? 1 : -1;
                var colDirection = storedpiece['column'] < column ? 1 : -1;
                var checkRow = storedpiece['row'] + rowDirection;
                var checkCol = storedpiece['column'] + colDirection;
                while (checkRow != row) {
                    if (currentstate[checkRow][checkCol] != '') {
                        return;
                    }
                    checkRow += rowDirection;
                    checkCol += colDirection;
                    updateboard()
                }
                    } else {
                        return;
                    }
                    break;

        case "q":

        case "k":

        case "p":
    }
}

function handleclick(row,column)
{
    if (storedpiece['stored']==true)
    {
        movepiece(column,row)
        storedpiece['stored']=false
        console.log(storedpiece)
        console.log(whiteturn)
    }
    else if (whiteturn==true)
    {
        if (currentstate[row][column]!='' && currentstate[row][column][0]=='w')
        {
            storedpiece = {"column":column,"row":row,"stored":true}
            console.log(storedpiece)
        }
        else{
            storedpiece = {"column":column,"row":row,"stored":false}
        }
    }
    else
    {
        if (currentstate[row][column]!=''&& currentstate[row][column][0]=='b')
        {
            storedpiece = {"column":column,"row":row,"stored":true}
            console.log(storedpiece)
        }
        else{
            storedpiece = {"column":column,"row":row,"stored":false}
        }
    }
}

function resetboard(){
    currentstate = initialstate;
    updateboard();
}

