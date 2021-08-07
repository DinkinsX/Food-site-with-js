<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST); //shift+f5 для сброса кэша в браузере для адекватной тестировки
