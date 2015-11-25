<?php

$app->get('/', function () use ($app) {
	$app->render('home.html.twig');
})->setName('home');

?>