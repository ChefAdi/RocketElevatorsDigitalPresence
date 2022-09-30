window.onload = () => elevatorUnitPrice()
 
let buildingType;
console.log("hello");

$("#typeOfBuilding").change(pick)

function pick() {
    if ($("#typeOfBuilding").val() === "residential") {
       buildingType = "residential"
       document.getElementById ("elevator").reset();
       document.getElementById ("results").reset();
       
        $("#noOfApartment").css("display", "block");
        $("#noOfBase").css("display", "block");
        $("#noOfFloor").css("display", "block");
        $("#noOfPark").css("display", "none");
        $("#noOfBusiness").css("display", "none");
        $("#noOfEle").css("display", "none");
        $("#noOfOccupents").css("display", "none");
       
        

    }else if ($("#typeOfBuilding").val() === "commercial") {
        buildingType = "commercial"
        document.getElementById ("elevator").reset ();
        document.getElementById ("results").reset();
        $("#noOfApartment").css("display", "none");
        $("#noOfFloor").css("display", "block");
        $("#noOfBase").css("display", "block");
        $("#noOfBusiness").css("display", "block");
        $("#noOfPark").css("display", "block");
        $("#noOfEle").css("display", "block");
        $("#noOfOccupents").css("display", "none");
        
      

    }else if ($("#typeOfBuilding").val() === "corporate") {
        buildingType = "corporate"
        document.getElementById ("elevator").reset ();
        document.getElementById ("results").reset();
        $("#noOfApartment").css("display", "none");
        $("#noOfFloor").css("display", "block");
        $("#noOfBase").css("display", "block");
        $("#noOfBusiness").css("display", "none");
        $("#noOfPark").css("display", "block");
        $("#noOfEle").css("display", "none");
        $("#noOfOccupents").css("display", "block");
       
        

    }else if ($("#typeOfBuilding").val() === "hybrid") {
        buildingType = "hybrid"
        document.getElementById ("elevator").reset ();
        document.getElementById ("results").reset();
        $("#noOfApartment").css("display", "none");
        $("#noOfFloor").css("display", "block");
        $("#noOfBase").css("display", "block");
        $("#noOfBusiness").css("display", "block");
        $("#noOfPark").css("display", "block");
        $("#noOfEle").css("display", "none");
        $("#noOfOccupents").css("display", "block");
        $("#business-hours").css("display", "block");
        
    }

    $("#noOfApartment").on("input", update)
    $("#noOfFloor").on("input", update)
    $("#noOfBase").on("input", update)
    $("#noOfEle").on("input", update)
    $("#noOfOccupents").on("input", update)
}

let outputValues = {
    "elevatorsRequired": 0,
    "columnsRequired": 0,
    "unitPrice": 0,
    "installationCosts:": 0,
    "finalPrice": 0
}

let cages;

let liftCage = {
    "standard": 7565,
    "premium": 12345,
    "excelium": 15400
}


let installFees = {
    "standard": .10,
    "premium": .13,
    "excelium": .16
}

function update(that) {
    
    elevatorsNeeded()
    elevatorUnitPrice()
    displayResults()
}

function elevatorsNeeded() {
   
    
    
    if (buildingType === "residential") {
        
        
        let numOfApts = $("#numofapt").val()

        let numOfFloors = $("#numoffloors").val()
        
        if (numOfApts <= 0 || numOfFloors <= 0) {
            return; 
        }
       
        let avgDoorsPerFloor = Math.ceil(numOfApts / numOfFloors) 
        
        let elevatorShaftsRequired = Math.ceil(avgDoorsPerFloor / 6)
        
        let columnsRequired = Math.ceil(numOfFloors / 20) 

        outputValues.elevatorsRequired = elevatorShaftsRequired * columnsRequired
        

    } else if (buildingType === "commercial") {
        
            let elevatorNum = $("#numofelev").val()
        
        if (elevatorNum <= 0) {
            return; 
        }

        
        
        outputValues.elevatorsRequired = elevatorNum
    

    } else if (buildingType === "corporate" || buildingType === "hybrid") {
       
        let occupantsPerFloor = $("#maxocc").val()
        
        let numOfFloors = $("#numoffloors").val()
        
        let numOfBasements = $("#numofbase").val()

        
        if (occupantsPerFloor <= 0 || numOfFloors <= 0 || numOfBasements <= 0) {
            return; 
        }

        
        let totalNumOfOccupants = occupantsPerFloor * (Number(numOfFloors) + Number(numOfBasements))
        
        let elevatorShaftsRequired = Math.ceil(totalNumOfOccupants / 1000)
        
        let columnsRequired = Math.ceil((Number(numOfFloors) + Number(numOfBasements)) / 20)
       
        let elevatorsPerColumn = Math.ceil(elevatorShaftsRequired / columnsRequired)
       
        outputValues.elevatorsRequired = elevatorsPerColumn * columnsRequired
       
    }
}

function elevatorUnitPrice() {
  
    $("input[name=liftCage]").each(function () {
       if ($(this).is(':checked')) {
           cage = $(this).val()
        
       }
    })
}

function displayResults() {
    
     
    // Display the recommended number of elevators
    $("#elevatorNum").val(outputValues.elevatorsRequired)

    // Display the unit price of an elevator
    $('#unitPrice').val(`$${liftCage[cage].toLocaleString(undefined, { minimumFractionDigits: 2 })}`)

    // Display the total price of the elevators
    $("#totalPriceElevators").val(`$${(outputValues.elevatorsRequired * liftCage[cage]).toLocaleString(undefined, { minimumFractionDigits: 2 })}`)

    // Display the installation fees
    let totalPrice = outputValues.elevatorsRequired * liftCage[cage]
    $("#installFees").val(`$${(totalPrice * installFees[cage]).toLocaleString(undefined, { minimumFractionDigits: 2 })}`)

    // Display the final total price including fees
    let installFee = totalPrice * installFees[cage]
    $("#totalPrice").val(`$${(totalPrice + installFee).toLocaleString(undefined, { minimumFractionDigits: 2 })}`)
}

