const initialstate = {
    1:['wr','wn','wb','wq','wk','wb','wn','wr'],
    2:['wp','wp','wp','wp','wp','wp','wp','wp'],
    3:['','','','','','','',''],
    4:['','','','','','','',''],
    5:['','','','','','','',''],
    6:['','','','','','','',''],
    7:['bp','bp','bp','bp','bp','bp','bp','bp'],
    8:['br','bn','bb','bq','bk','bb','bn','br']
}

var currentstate = initialstate

var whiteturn = true;
var storedpiece = null;

function updateboard()
{   
    
}

function movepiece(column,row){
    switch(currentstate[storedpiece["row"]][storedpiece["column"]][1])
    {
        case "r":
            if(storedpiece['row']!=row && storedpiece['column']!=column)
            {
                return
            }
            else if (storedpiece['row']!=row)
            {
                if(storedpiece['row']<row)
                {
                    for(i=storedpiece['row'];i<row;i++)
                    {
                        if (currentstate[i][storedpiece['column']]!='')
                        {
                            return
                        }
                    
                    }
                }
                else(storedpiece['row']>row){
                    for(i=storedpiece['row'];i>row;i++)
                    {
                        if (currentstate[i]!='')
                        {
                            return
                        }
                    
                    }
                }
            }
            else
            {
                for(i=storedpiece['column'];i<column;i++){
                    if (currentstate[i]!='')
                        {
                            return
                        }
                }
            }
            case "n":
                if((Math.abs(storedpiece['row'] - row) == 2 && 
                Math.abs(storedpiece['column'] - column) == 1) || 
                (Math.abs(storedpiece['row'] - row) == 1 ))
                {
                if(currentstate[row][column] !='' && currentstate[storedpiece["row"]] // sjekker at destinasjon ikke er okkupert.
                [storedpiece["column"]][0] == currentstate[row][column][0]){
                    return;
                }}

        case "b":

        case "q":

        case "k":

        case "p":

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

