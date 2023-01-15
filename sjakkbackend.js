var currentstate = [
    ['br','bn','bb','bq','bk','bb','bn','br'],
    ['bp','bp','bp','bp','bp','bp','bp','bp'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['wp','wp','wp','wp','wp','wp','wp','wp'],
    ['wr','wn','wb','wq','wk','wb','wn','wr']
]

var moveorder = []
var statearray = []
var whiteturn = true;
var storedpiece = {'row':8,'column':8,'stored':false};

const piecedict = {'wr':'♜','wn':'♞','wb':'♝','wq':'♛','wk':'♚','br':'♜','bn':'♞','bb':'♝','bq':'♛','bk':'♚','bp':'♟','wp':'♟','w':'whitePiece','b':'blackPiece'}

function blankSpace(white,y,x)
{
    if (white==true)
    {
        return (`<div id="${y},${x}" class="lightSquare" onclick="handleclick(${y},${x})"></div>`)
    }
    else
    {
        return (`<div id="${y},${x}" class="darkSquare" onclick="handleclick(${y},${x})"></div>`)
    }
}

function occupiedSpace(white,y,x,piece)
{
    if(white==true)
    {
        return (`<div id="${y},${x}" class="lightSquare ${piecedict[piece[0]]}" onclick="handleclick(${y},${x})">${piecedict[piece]}</div>`)
    }
    else
    {
        return(`<div id="${y},${x}" class="darkSquare ${piecedict[piece[0]]}" onclick="handleclick(${y},${x})">${piecedict[piece]}</div>`)
    }
}

const thing=['a','b','c','d','e','f','g','h']

function updatemoveorder()
{
    let newArray = []
    for (let i = 0; i < currentstate.length; i++) 
    {
    newArray.push(currentstate[i].slice());
    }
    statearray.push(newArray);
    document.getElementById('move-order').innerHTML+=`<div id="move${moveorder.length-1}" onclick="restoreposition(${moveorder.length})" class="movelistitem" >${moveorder.length}. ${thing[moveorder[moveorder.length-1][1]]}${8-moveorder[moveorder.length-1][0]}->${thing[moveorder[moveorder.length-1][3]]}${8-moveorder[moveorder.length-1][2]}</div>`
    console.log(statearray)
}

function updateboard()
{   
    //Vi starter med å fjerne alle children ifra brettet
    document.getElementById('board').innerHTML=''
    var white = true
    let whiteking = false
    let blackking = false
    for(y=0;y<8;y++){
        if(y%2==0){
            white = true;
        }
        else{
            white = false;
        }
        //Vi sjekker innholdet i hver rute i matrisen og lager et html element
        for(x=0;x<8;x++)
        {
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
            if (currentstate[y][x]=="wk")
            {
                whiteking=true
            }
            else if(currentstate[y][x]=="bk")
            {
                blackking=true
            }
        }
    }
    if(blackking==false){
        alert('White wins!')
    }
    else if(whiteking==false){
        alert('Black wins!')
    }
}
function hasPieceMoved(piece) {
    for (let i = 0; i < moveorder.length; i++) {
        if (moveorder[i][0] === piece[0] && moveorder[i][1] === piece[1]) 
        {
            return true;
        }
    }
    return false;
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
                    for (i=storedpiece['row']+1;row>i;i++)
                    {
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
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
                }
                else
                {
                    for (i=storedpiece['row']-1;row<i;i--)
                    {
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
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
                }
            }
            //Om X er forskjellig sjekker vi om noe er i veien på samme rad
            else if(storedpiece['row']==row && storedpiece['column']!=column)
            {
                if(column>storedpiece['column'])
                {
                    for (i=storedpiece['column']+1;column>i;i++)
                    {
                        if(currentstate[storedpiece['row']][i]!='')
                        {
                            return
                        }
                        else
                        {
                            continue
                        }
                    }
                    //om det ikke er noe i veien så flytter vi brikken
                    currentstate[row][column]=currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']]=''
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
                }
                else{
                    for (i=storedpiece['column']-1;column<i;i--)
                    {
                        if(currentstate[storedpiece['row']][i]!='')
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
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
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
            [storedpiece["column"]][0] == currentstate[row][column][0])
            {
                return;
            }
                // beveger knight til stedet.
                currentstate[row][column] = currentstate[storedpiece["row"]][storedpiece["column"]];
                currentstate[storedpiece["row"]][storedpiece["column"]] = '';
                moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                updatemoveorder()
                whiteturn=!whiteturn
            } else {
                return;
            }
            break;


        case "b":
              // Sjekker at løper bare går diagonalt
            if (Math.abs(storedpiece['row'] - row) == Math.abs(storedpiece['column'] - column)) 
            {
                // sjekker om noen av egne brikker blokker.
                var rowDirection = storedpiece['row'] < row ? 1 : -1;
                var colDirection = storedpiece['column'] < column ? 1 : -1;
                var checkRow = storedpiece['row'] + rowDirection;
                var checkCol = storedpiece['column'] + colDirection;
                while (checkRow != row) {
                    if (currentstate[checkRow][checkCol] != '') 
                    {
                        return;
                    }
                    checkRow += rowDirection;
                    checkCol += colDirection;
                    }
                currentstate[row][column] = currentstate[storedpiece['row']][storedpiece['column']]
                currentstate[storedpiece['row']][storedpiece['column']] = ''
                moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                updatemoveorder()
                whiteturn=!whiteturn
                
                } 
            else 
            {
                return;
            }
            break;

        case "q":
            // Dronning kan bevege seg diagonalt og vertical og horisontalt, så sjekker om det er valid som gjort på rook og bishop
            if (storedpiece['row'] == row || storedpiece['column'] == column) 
            {
                // sjekker om noe blokker horisontalt eller vertikalt
                if (storedpiece['row'] == row) { // dronning beveger seg horisontalt.
                    var start = storedpiece['column'] < column ? storedpiece['column'] : column;
                    var end = storedpiece['column'] > column ? storedpiece['column'] : column;
                    for (var i = start + 1; i < end; i++) 
                    {
                        if (currentstate[row][i] != '') 
                        {
                            return;
                        }
                    }
                    currentstate[row][column] = currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']] = ''
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
                }
                else
                { // dronning beveger seg vertikal
                    var start = storedpiece['row'] < row ? storedpiece['row'] : row;
                    var end = storedpiece['row'] > row ? storedpiece['row'] : row;
                    for (var i = start + 1; i < end; i++) {
                        if (currentstate[i][column] != '') 
                        {
                            return;
                        }
                    }
                    currentstate[row][column] = currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']] = ''
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
                }
            }
                else if (Math.abs(storedpiece['row'] - row) == Math.abs(storedpiece['column'] - column))
                {
                    // sjekker om noe
                    var rowDirection = storedpiece['row'] < row ? 1 : -1;
                    var colDirection = storedpiece['column'] < column ? 1 : -1;
                        var checkRow = storedpiece['row'] + rowDirection;
                        var checkCol = storedpiece['column'] + colDirection;
                        while (checkRow != row) 
                        {
                            if (currentstate[checkRow][checkCol] != '') 
                            {
                                return;
                            }
                            checkRow += rowDirection;
                            checkCol += colDirection;
                        }
                        currentstate[row][column] = currentstate[storedpiece['row']][storedpiece['column']]
                        currentstate[storedpiece['row']][storedpiece['column']] = ''
                        moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                        updatemoveorder()
                        whiteturn=!whiteturn
                }
                else 
                {
                    return;
                }
                break;

        case "k":
            //Kongen kan bare bevege seg en rute normalt
            if(Math.abs(storedpiece['row']-row)>1 || Math.abs(storedpiece['column']-column)>1)
            {
                //Sjekk om spilleren prøver å rokkere
                if(storedpiece['column'] - column === -2) {
                    if(!hasPieceMoved(storedpiece) && !hasPieceMoved([storedpiece['row'], storedpiece['column'] + 3])) 
                    {
                        currentstate[storedpiece['row']][storedpiece['column'] + 1] = currentstate[storedpiece['row']][storedpiece['column'] + 3];
                        currentstate[storedpiece['row']][storedpiece['column'] + 3] = "";
                        currentstate[storedpiece['row']][column] = currentstate[storedpiece['row']][storedpiece['column']];
                        currentstate[storedpiece['row']][storedpiece['column']] = "";
                        moveorder.push([storedpiece['row'],storedpiece['column'],storedpiece['row'],column]);
                        updatemoveorder()
                        whiteturn = !whiteturn;
                    }
                }
                else if(storedpiece['column'] - column === 2) {
                    if(!hasPieceMoved(storedpiece) && !hasPieceMoved([storedpiece['row'], storedpiece['column'] - 4])) 
                    {
                        currentstate[storedpiece['row']][storedpiece['column'] - 1] = currentstate[storedpiece['row']][storedpiece['column'] - 4];
                        currentstate[storedpiece['row']][storedpiece['column'] - 4] = "";
                        currentstate[storedpiece['row']][column] = currentstate[storedpiece['row']][storedpiece['column']];
                        currentstate[storedpiece['row']][storedpiece['column']] = "";
                        moveorder.push([storedpiece['row'],storedpiece['column'],storedpiece['row'],column]);
                        updatemoveorder()
                        whiteturn = !whiteturn;
                    }
                }
            }
            else
            {
                currentstate[row][column] = currentstate[storedpiece['row']][storedpiece['column']]
                currentstate[storedpiece['row']][storedpiece['column']] = ''
                moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                updatemoveorder()
                whiteturn=!whiteturn
            }
        case "p":
            if(currentstate[storedpiece['row']][storedpiece['column']][0]=='w')
            {
                if(storedpiece['row']-row==1 && currentstate[row][column]=='' && storedpiece['column']==column || storedpiece['row']==6 && storedpiece['row']-row==2 && currentstate[row][column]=='' && currentstate[row+1][column]=='' && storedpiece['column']==column)
                {
                    currentstate[row][column] = currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']] = ''
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
                    if(row==0)
                    {
                        currentstate[row][column]="wq"
                    }
                }
                else if(Math.abs(storedpiece['row']-row)==1 && Math.abs(storedpiece['column']-column)==1 && currentstate[row][column]!='')
                {
                    currentstate[row][column] = currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']] = ''
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
                    if(row==0)
                    {
                        currentstate[row][column]="wq"
                    }
                }
                else
                {
                    return
                }
            }
            else
            {
                if(storedpiece['row']-row==-1 && currentstate[row][column]=='' && storedpiece['column']==column || storedpiece['row']==1 && row==3 && currentstate[row][column]=='' && currentstate[row-1][column]=='' && storedpiece['column']==column)
                {
                    currentstate[row][column] = currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']] = ''
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
                    if(row==7)
                    {
                        currentstate[row][column]="bq"
                    }
                }
                else if(Math.abs(storedpiece['row']-row)==1 && Math.abs(storedpiece['column']-column)==1 && currentstate[row][column]!='')
                {
                    currentstate[row][column] = currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']] = ''
                    moveorder.push([storedpiece['row'],storedpiece['column'],row,column])
                    updatemoveorder()
                    whiteturn=!whiteturn
                    if(row==7)
                    {
                        currentstate[row][column]="bq"
                    }
                }
                else
                {
                    return
                }
            }
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
        console.log(moveorder)
        updateboard()
    }
    else if (whiteturn==true)
    {
        if (currentstate[row][column]!='' && currentstate[row][column][0]=='w')
        {
            storedpiece = {"column":column,"row":row,"stored":true}
            console.log(storedpiece)
            document.getElementById(`${row},${column}`).style.backgroundColor="green"
        }
        else{
            updateboard()
            storedpiece = {"column":column,"row":row,"stored":false}
        }
    }
    else
    {
        if (currentstate[row][column]!=''&& currentstate[row][column][0]=='b')
        {
            storedpiece = {"column":column,"row":row,"stored":true}
            console.log(storedpiece)
            document.getElementById(`${row},${column}`).style.backgroundColor="green"
        }
        else{
            updateboard()
            storedpiece = {"column":column,"row":row,"stored":false}
        }
    }
}

function resetboard()
{
    currentstate = [
        ['br','bn','bb','bq','bk','bb','bn','br'],
        ['bp','bp','bp','bp','bp','bp','bp','bp'],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['','','','','','','',''],
        ['wp','wp','wp','wp','wp','wp','wp','wp'],
        ['wr','wn','wb','wq','wk','wb','wn','wr']
    ]
    moveorder=[]
    whiteturn=true
    document.getElementById('move-order').innerHTML='<div>Move order:</div>'
    updateboard();
}

function restoreposition(position)
{
    console.log(statearray[position-1].slice())
    while(moveorder.length>position)
    {
        document.getElementById(`move${moveorder.length-1}`).remove()
        moveorder.pop()
        statearray.pop()
    }
    currentstate=statearray[statearray.length-1].slice()
    if(position%2!=0)
    {
        whiteturn=false
    }
    else
    {
        whiteturn=true
    }
    updateboard()
}


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