$(function () {
    generateId();
    loadCustomers();
    loadItems();
});

function generateId() {
    var id = 0;

    if (orders.length > 0) {
        id = parseInt(orders[orders.length - 1].id.substr(3, 2));
        // console.log(id);
    }
    var oid = null;
    if (0 < id && id < 10) {
        oid = "OD00" + (id + 1);
        // console.log(oid);
    } else if (10 < id && id < 100) {
        oid = "OD0" + (id + 1);
        // console.log(oid);
    } else if (100 < id && id < 1000) {
        oid = "OD" + (id + 1);
        // console.log(oid);
    }
    $("#order-id").val(oid);

    $("#order-date").val(new Date().toLocaleDateString())
}

function loadCustomers() {
    $("#cmbCustomer option").remove();

    var html = " <option value='default' >Select Customer ID</option>";
    for (var i = 0; i < customers.length; i++) {
        html += " <option >" + customers[i].id + "</option>";
    }

    $("#cmbCustomer").append(html);
}

function loadItems() {
    $("#cmbItem option").remove();

    var html = " <option value='default'>Select Item Code</option>";
    for (var i = 0; i < items.length; i++) {
        html += " <option >" + items[i].code + "</option>";
    }

    $("#cmbItem").append(html);
}

$("select#cmbCustomer").change(function () {
    var id = $(this).children("option:selected").text();
    var found = false;
    for (var i = 0; i < customers.length; i++) {
        if (customers[i].id == id) {
            // alert(customers[i].name);
            $("#customer-name-order").val(customers[i].name);
            $("#cmbCustomer").attr('disabled', 'disabled');
            found = true;
        }
    }
    if (!found) {
        $("#customer-name-order").val("");
    }

});
$("select#cmbItem").change(function () {
    var id = $(this).children("option:selected").text();
    var found = false;
    for (var i = 0; i < items.length; i++) {
        if (items[i].code == id) {
            // alert(customers[i].name);
            $("#item-desc-order").val(items[i].description);
            $("#qtyOnHand-order").val(items[i].qtyOnHand);
            $("#unit-price-order").val(items[i].unitPrice);
            found = true;
        }
    }
    if (!found) {
        $("#item-desc-order").val("");
        $("#qtyOnHand-order").val("");
        $("#unit-price-order").val("");
    }

});

$("#add-cart").click(function () {
    var itemCode = $("select#cmbItem").change().children("option:selected").text();
    var customerId = $("select#cmbCustomer").change().children("option:selected").text();
    var customerName = $("#customer-name-order").val();
    var orderId = $("#order-id").val();
    var date = $("#order-date").val();
    var qty = $("#qty-order").val();
    var qtyOnHand = $("#qtyOnHand-order").val();
    var unitPrice = $("#unit-price-order").val();

    console.log(customerName);


    var validate = true;
    if (!qty || !unitPrice) {
        alert("You have empty fields!");
        $("#qty-order").addClass("invalid");
        $("#qty-order").select();
        validate = false;
        return;
    }
    if (!qty.match("^[0-9]+$")) {
        alert("invalid qty");
        $("#qty-order").addClass("invalid");
        $("#qty-order").select();
        validate = false;
        return;
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i].code == itemCode) {
            console.log("Item found!");
            if (items[i].qtyOnHand == 0 || items[i].qtyOnHand < qty) {
                alert("Out of stock!!");
                $("#qty-order").addClass("invalid");
                $("#qty-order").select();
                validate = false;
                return;
            }
        }
    }
    if (!validate) {
        return;
    }
    var total = parseInt(qty)*parseInt(unitPrice);

    $("#tbl-order tbody tr").remove();

    var html = "<tr>\n" +
        "<td>"+orderId+"</td>\n" +
        "<td>"+date+"</td>\n" +
        "<td>"+qty+"</td>\n" +
        "<td>"+unitPrice+"</td>\n" +
        "<td>"+total+"</td>\n" +
        "<td><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></td>\n" +
        "</tr>";

    $("#tbl-order tbody").append(html);

    //clear fields
    $("#cmbCustomer").removeAttr('disabled');
    $("#place-order").removeAttr('disabled');
    $("#cmbCustomer").val("default");
    $("#customer-name-order").val("");
    clear();

});
$("#qty-order").keyup(function () {
    $(this).removeClass("invalid");
});

$("#btn-clear-cart").click(function () {
    clear();
});

function clear(){
    $("#qty-order").val("");
    $("#item-desc-order").val("");
    $("#qtyOnHand-order").val("");
    $("#unit-price-order").val("");
    $("#cmbItem").val("default");
}


