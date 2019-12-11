$(function () {
    loadCustomers(0);
    intializePagination();
})

function loadCustomers(page) {
    var startingIndex = page*5;
    $("#tbl-students tbody tr").remove();

    for (var i=startingIndex;i<startingIndex+5;i++){
        if(i>customers.length) break;
    var html = '<tr>'+
        '<td>'+customers[i].id+'</td>'+
        '<td>'+customers[i].name+'</td>'+
        '<td>'+customers[i].address+'</td>'+
        '<td>'+'<i class="fa fa-trash" aria-hidden="true"></i>'+'</td>'+
        '</tr>';
    $("#tbl-students tbody").append(html);
    }
}

function intializePagination() {

    var totalPages = parseInt(customers.length/5 + (((customers.length % 5) !=0 ? 1:0)));
    console.log("total pages : "+totalPages);
    $(".page-item").remove();

    var html = '<li class="page-item"><a class="page-link" href="javascript:void(0)">&laquo;</a></li>';

    for (var i=0;i<totalPages;i++){
        html+='<li class="page-item"><a class="page-link" href="javascript:void(0)">'+(i+1)+'</a></li>';
    }

    html+='<li class="page-item"><a class="page-link" href="#">&raquo;</a></li>';

    $(".card-footer .pagination").html(html);

    $(".card-footer .pagination .page-item:first-child").click(function () {
        loadCustomers(0);
    });

    $(".card-footer .pagination .page-item:last-child").click(function () {
        loadCustomers(totalPages-1);
    });

    $(".card-footer .pagination .page-item").click(function () {
        var number = parseInt($(this).find("a").text());
        if(number){
            loadCustomers(number-1);
        }
    })


}

    $("#customer-id , #customer-name , #customer-address").keyup(function () {
        $(this).removeClass("invalid");
    })

    $("#add-customer").click(function () {
        alert("add button");

        var customerId = $("#customer-id").val();
        var customerName = $("#customer-name").val();
        var customerAddress = $("#customer-address").val();

        console.log(customerId);
        console.log(customerName);
        console.log(customerAddress);

        var validate =true;
        if(customerAddress.trim().length==0 || customerId.trim().length==0 || customerName.trim().length==0){
            alert("You have empty fields!");
            $("#customer-id").addClass("invalid");
            $("#customer-name").addClass("invalid");
            $("#customer-address").addClass("invalid");
            validate=false;
            return;
        }
        if(!customerName.match("^[A-Za-z][A-Za-z. ]+$")){
            alert("invalid customer name");
            $("#customer-name").addClass("invalid");
            $("#customer-name").select();
            validate=false;
            return;
        }
        if (!validate){
            return;
        }
        customers.push({
           id:customerId,
           name:customerName,
           address: customerAddress
        });
        // loadCustomers(0);

        if(customers.length<=5){
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
