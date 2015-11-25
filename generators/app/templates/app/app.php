<?php

require 'app/vendor/autoload.php';

// Start Slim
$app = new \Slim\Slim(array(
	'templates.path' => 'web/twig'
));
require 'twig.php';

// Include routes
foreach (glob("app/routes/*.php") as $filename) {
	include $filename;
}

// Run app
$app->run();

?>
