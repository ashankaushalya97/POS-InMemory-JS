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
    if (!qty.match("^[0-9]+$")) {
        alert("invalid qty");
        $("#item-code").addClass("invalid");
        $("#item-code").select();
        validate = false;
        return;
    }
    if (!unitPrice.match("^[0-9]+$")) {
        alert("invalid qty");
        $("#customer-name").addClass("invalid");
        $("#customer-name").select();
        validate = false;
        return;
    }
    if (!validate) {
        return;
    }
    items.push({
        code: itemCode,
        description: itemDescription,
        qtyOnHand: qty,
        unitPrice: unitPrice
    });
    // loadCustomers(0);

    if (items.length <= 5) {
        loadItems(0);
    }
    intializePagination();
    alert("Mission successfull");
    $("#item-code,#item-description,#qty,#unitPrice").val("");

});

$("#btn-clear").click(function () {
    $("#item-code,#item-description,#qty,#unitPrice ").val("");
    $("#item-code,#item-description,#qty,#unitPrice").removeClass("invalid");
});

$("#tbl-items tbody").on('click','tr td i ',function () {
    console.log($(this).parent().parent().children().first().text());
    var id = $(this).parent().parent().children().first().text();
    for (var i=0;i<items.length;i++){
        if(id==items[i].code){
            console.log("======================");
            console.log(id);
            console.log(items[i].code);
            items.splice(i,1);
        }
    }

    // customers.splice(customers.indexOf('C002'),1);
    intializePagination()
    if(items.length<=5){
        loadItems(0);
    }
    alert("Delete pressed!");
});
