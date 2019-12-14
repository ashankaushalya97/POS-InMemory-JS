$(function () {
    generateId();
    loadCustomers();
    loadItems();
})

function generateId() {
    var id = 0;

    if(orders.length>0){
        id = parseInt(orders[orders.length-1].id.substr(3,2));
        // console.log(id);
    }
    var oid = null;
    if(0<id && id<10){
        oid = "OD00"+(id+1);
        // console.log(oid);
    }else if(10<id && id<100){
        oid = "OD0"+(id+1);
        // console.log(oid);
    }else if(100<id && id<1000){
        oid = "OD"+(id+1);
        // console.log(oid);
    }
    $("#order-id").val(oid);

    $("#order-date").val(new Date().toLocaleDateString())
}

function loadCustomers(){
    $("#cmbCustomer option").remove();

    var html=" <option >Select Customer ID</option>";
    for(var i=0;i<customers.length;i++){
        html+=" <option >"+customers[i].id+"</option>";
    }

    $("#cmbCustomer").append(html);
}
function loadItems(){
    $("#cmbItem option").remove();

    var html=" <option >Select Item Code</option>";
    for(var i=0;i<items.length;i++){
        html+=" <option >"+items[i].code+"</option>";
    }

    $("#cmbItem").append(html);
}

$("select#cmbCustomer").change(function () {
    var id = $(this).children("option:selected").text();
    var found=false;
    for(var i=0;i<customers.length;i++){
        if(customers[i].id==id){
            // alert(customers[i].name);
            $("#customer-name-order").val(customers[i].name);
            found=true;
        }
    }
    if(!found){
        $("#customer-name-order").val("");
    }

});
$("select#cmbItem").change(function () {
    var id = $(this).children("option:selected").text();
    var found=false;
    for(var i=0;i<items.length;i++){
        if(items[i].code==id){
            // alert(customers[i].name);
            $("#item-desc-order").val(items[i].description);
            $("#qtyOnHand-order").val(items[i].qtyOnHand);
            $("#unit-price-order").val(items[i].unitPrice);
            found=true;
        }
    }
    if(!found){
        $("#item-desc-order").val("");
        $("#qtyOnHand-order").val("");
        $("#unit-price-order").val("");
    }

});

