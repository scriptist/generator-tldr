<?php

// Add Twig
$app->view(new \Slim\Views\Twig());
$app->view->parserExtensions = array(new \Slim\Views\TwigExtension());

$app->view->parserOptions = array(
	'charset' => 'utf-8',
	'cache' => realpath('app') . '/cache/twig',
	'auto_reload' => true,
	'strict_variables' => false,
	'autoescape' => true
);

// Twig cachebuster
$bustCacheFilter = new Twig_SimpleFilter('bust_cache', function ($string) {
	global $config;
	if (!$config['cacheBreakAssets']) {
		return $string;
	}

	if (!preg_match('/^(.*)(\.[^.]*)$/', $string, $matches))
		return $string;

	$path = 'web' . $string;

	if (!file_exists($path))
		return $string;

	return $matches[1] . '.' . filemtime($path) . $matches[2];
});
$twig = $app->view->getInstance()->addFilter($bustCacheFilter);

// currentRouteName Twig variable
$app->hook('slim.before.dispatch', function() use ($app) {
	$app->view()->setData(array(
		'currentRouteName' => $app->router()->getCurrentRoute()->getName()
	));
});

?>
