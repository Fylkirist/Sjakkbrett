const initialstate = [
    ['wr','wn','wb','wq','wk','wb','wn','wr'],
    ['wp','wp','wp','wp','wp','wp','wp','wp'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['bp','bp','bp','bp','bp','bp','bp','bp'],
    ['br','bn','bb','bq','bk','bb','bn','br']
]

var currentstate = initialstate

var whiteturn = true;
var storedpiece = null;

function updateboard()
{   
    
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
                    //om det ikke er noe i veien så flytter vi brikken
                    currentstate[row][column]=currentstate[storedpiece['row']][storedpiece['column']]
                    currentstate[storedpiece['row']][storedpiece['column']]=''
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
            } else {
                return;
            }
            break;


        case "b":

        case "q":

        case "k":

        case "p":
        
        if (whiteturn==true){
            whiteturn=false
        }
        else{
            whiteturn=true
        }
    }
}

function handleclick(column,row)
{
    if (storedpiece!=null){
        movepiece(column,row)
    }
    if (whiteturn==true){
        if (currentstate[row][column]!='' && currentstate[row][column][0]=='w')
        {
            storedpiece = {"column":column,"row":row}
        }
        else{
            storedpiece = null
        }
    }
    else{
        if (currentstate[row][column]!=''&& currentstate[row][column][0]=='b')
        {
            storedpiece = {"column":column,"row":row}
        }
        else{
            storedpiece = null
        }
    }
}

