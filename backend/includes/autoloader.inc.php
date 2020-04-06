<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: PUT, GET, POST");
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
include dirname(dirname(dirname(__FILE__)))."/backend/helpers/helpers.php";
spl_autoload_register("myloader");

function myloader($class_name) 
{
    $filename = str_replace('_', DIRECTORY_SEPARATOR, strtolower($class_name)).'.class.php';

    $file = dirname(dirname(dirname(__FILE__)))."/backend/".$filename;

    if ( ! file_exists($file))
    {
        return FALSE;
    }
    include $file;
}
?>