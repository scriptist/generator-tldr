<?php

if (file_exists('.maintenance')) {
	http_response_code(503);
	exit('<h3>Temporarily down for maintenance</h3><p>We are performing scheduled maintenance - we\'ll be back shortly.</p>');
}

require 'config.php';
require 'app/app.php';

?>
