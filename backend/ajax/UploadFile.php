<?php
include "../includes/autoloader.inc.php";
if (isset($_FILES['imageUser'])) UploadPicUser($_FILES['imageUser']);
if (isset($_FILES['fileChate'])) UploadFileChate($_FILES['fileChate']);
if (isset($_FILES['filePublication'])) UploadFilePublication($_FILES['filePublication']);
