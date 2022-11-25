<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mail</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</head>
<body>
<button type="button" class="btn btn-primary">Primary</button>
<div class="container" style="width: 700px">
    <h2 style="text-align: center"><strong>THÔNG TIN ĐƠN HÀNG</strong></h2>
    <br>
    <br>
    <h3><strong>Chi tiết kiện hàng</strong></h3>
    <br>
    <table class="table">
        <thead>
        <tr>
            <th scope="col" style="width: 20%">#</th>
            <th scope="col" style="width: 20%">Ảnh</th>
            <th scope="col" style="width: 20%">Tên Sách</th>
            <th scope="col" style="width: 20%">Số lượng</th>
            <th scope="col" style="width: 20%">Giá tiền</th>
        </tr>
        </thead>
        <tbody>
        <#list cart as i>
        <tr>
            <th style="width: 20%">${i?counter}</th>
            <td style="width: 20%"><img style="width: 50px; height: 50px" src="${i.getBook().getImage()}" alt=""></td>
            <td style="width: 20%">${i.getBook().getName()}</td>
            <td style="width: 20%">${i.quantity}</td>
            <td style="width: 20%">${i.getBook().getPrice()} VNĐ</td>
        </tr>
        </#list>
        </tbody>
        <tr style="border-bottom: solid white;">
            <th style="width: 20%"></th>
            <td style="width: 20%"></td>
            <td style="width: 20%"></td>
            <td style="width: 20%"><strong>Tổng tiền:</strong></td>
            <td style="width: 20%;color: red">${totalMoney} VNĐ</td>
        </tr>
    </table>

    <h4 style="text-align: center; margin-top: 30px"><strong>Cám ơn khách đã ủng hộ Shop</strong></h4>
</div>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
</body>
</html>