$(function () {
    generateId();
    loadCustomers();
})

function generateId() {
    var id = 0;

    if(orders.length>0){
        id = parseInt(orders[orders.length-1].id.substr(3,2));
        console.log(id);;
    }
    var oid = null;
    if(0<id && id<10){
        oid = "OD00"+(id+1);
        console.log(oid);
    }else if(10<id && id<100){
        oid = "OD0"+(id+1);
        console.log(oid);
    }else if(100<id && id<1000){
        oid = "OD"+(id+1);
        console.log(oid);
    }
    $("#order-id").val(oid);

    $("#order-date").val(new Date().toLocaleDateString())
}

function loadCustomers(){
    $("#cmbCustomer option").remove();

    var html=" <option value=\"+47\">Select Customer ID</option>";
    for(var i=0;i<customers.length;i++){
        html+=" <option value=\"+47\">"+customers[i].id+"</option>";
    }

    $("#cmbCustomer").append(html);
}

$("#cmbCustomer").click(function () {
    alert("selected!");
    console.log($(this).children());
});

