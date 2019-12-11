$(function () {
    loadItems(0);
    intializePagination();
});

function loadItems(page) {
    var startingIndex = page * 5;
    $("#tbl-items tbody tr").remove();

    for (var i = startingIndex; i < startingIndex + 5; i++) {
        if (i > items.length-1) {
            break;
        }
        var html = '<tr>' +
            '<td>' + items[i].code + '</td>' +
            '<td>' + items[i].description + '</td>' +
            '<td>' + items[i].qtyOnHand + '</td>' +
            '<td>' + items[i].unitPrice + '</td>' +
            '<td>' + '<i class="fa fa-trash" aria-hidden="true"></i>' + '</td>' +
            '</tr>';
        $("#tbl-items tbody").append(html);
    }
}

function intializePagination() {

    var totalPages = parseInt(items.length / 5 + (((items.length % 5) != 0 ? 1 : 0)));
    // console.log("total pages : " + totalPages);
    $(".page-item").remove();

    var html = '<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>';

    for (var i = 0; i < totalPages; i++) {
        html += '<li class="page-item"><a class="page-link" href="javascript:void(0)">' + (i + 1) + '</a></li>';
    }

    html += '<li class="page-item"><a class="page-link" href="#">&raquo;</a></li>';

    $(".card-footer .pagination").html(html);

    $(".card-footer .pagination .page-item:first-child").click(function () {
        loadItems(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadItems(totalPages - 1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if (number) {
            loadItems(number - 1);
        }
    })


}

$("#item-code,#item-description,#qty,#unitPrice").keyup(function () {
    $(this).removeClass("invalid");
});

$("#add-item").click(function () {

    var itemCode = $("#item-code").val();
    var itemDescription = $("#item-description").val();
    var qty = $("#qty").val();
    var unitPrice = $("#unitPrice").val();

    console.log(itemCode);
    console.log(itemDescription);
    console.log(qty);
    console.log(unitPrice);

    var validate = true;
    if (itemCode.trim().length == 0 || itemDescription.trim().length == 0 || qty.trim().length == 0 || unitPrice.trim().length==0 ) {
        alert("You have empty fields!");
        $("#item-code").addClass("invalid");
        $("#item-description").addClass("invalid");
        $("#qty").addClass("invalid");
        $("#unitPrice").addClass("invalid");
        validate = false;
        return;
    }
    if (!customerName.match("^[A-Za-z][A-Za-z. ]+$")) {
        alert("invalid customer name");
        $("#customer-name").addClass("invalid");
        $("#customer-name").select();
        validate = false;
        return;
    }
    if (!validate) {
        return;
    }
    customers.push({
        id: customerId,
        name: customerName,
        address: customerAddress
    });
    // loadCustomers(0);

    if (customers.length <= 5) {
        loadCustomers(0);
    }
    intializePagination();
    alert("Mission successfull");
    $("#customer-id,#customer-name, #customer-address ").val("");

});

$("#btn-clear").click(function () {
    $("#customer-id,#customer-name, #customer-address ").val("");
    $("#customer-id , #customer-name , #customer-address").removeClass("invalid");
});

$("#tbl-students tbody").on('click','tr td i ',function () {
    // console.log($(this).parent().parent().children().first().text());
    var id = $(this).parent().parent().children().first().text();
    for (var i=0;i<customers.length;i++){
        if(id==customers[i].id){
            console.log("======================");
            console.log(id);
            console.log(customers[i].id);
            customers.splice(i,1);
        }
    }

    // customers.splice(customers.indexOf('C002'),1);
    intializePagination()
    if(customers.length<=5){
        loadCustomers(0);
    }
    alert("Delete pressed!");
});
