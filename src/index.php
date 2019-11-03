<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
<h1 class="title">Электронный сомелье</h1>
<section class="main">

    <div class="box">
        <div class="header">
            <p class="header__title">Бокал</p>
            <p class="header__subtitle">18 видов</p>
        </div>
        <div class="slider">
            <div class="slide">
                <img class="slide__img" src="resources/images/glass.png" alt="Бокал">
                <p class="slide__name">Бокал для белого вина</p>
            </div>
            <div class="slide">
                <img src="resources/images/glass.png" alt="Бокал">
                <p class="slide__name">Бокал для белого вина</p>
            </div>
            <div class="slide">
                <img src="resources/images/glass.png" alt="Бокал">
                <p class="slide__name">Бокал для белого вина</p>
            </div>
        </div>
    </div>

    <div class="box scroll-box">
        <div class="header">
            <p class="header__title">Тип</p>
            <p class="header__subtitle">24 типа</p>
        </div>

        <div class="scroll-body">
            <ul class="scroll-list" name="drink_type">
                <li class="scroll-list__item" name="apperitives" id="apperitives"><p>Аперитивы</p></li>
                <li class="scroll-list__item" name="didgestives" id="didgestives"><p>Диджестивы</p></li>
                <li class="scroll-list__item" name="hots" id="hots"><p>Горячие</p></li>
                <li class="scroll-list__item" name="milks" id="milks"><p>Молочные</p></li>
                <li class="scroll-list__item" name="deserts" id="deserts"><p>Десертные</p></li>
                <li class="scroll-list__item" name="layers" id="layers"><p>Слоистые</p></li>
                <li class="scroll-list__item" name="daizyes" id="daizyes"><p>Дейзи</p></li>
                <li class="scroll-list__item" name="juleps" id="juleps"><p>Джулепы</p></li>
            </ul>
        </div>
    </div>

    <div class="box">
        <div class="header">
            <p class="header__title">Крепость</p>
            <p class="header__subtitle">24 типа</p>
        </div>
    </div>
    <div class="box">
        <div class="header">
            <p class="header__title">Основа</p>
            <p class="header__subtitle">24 типа</p>
        </div>
    </div>

</section>

    <link href="css/main.min.css" rel="stylesheet">
    <script src="js/libs.min.js" type="module"></script>
    <script src="js/main.min.js" type="module"></script>
</body>

</html>


