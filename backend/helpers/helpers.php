<?php


function UploadPicUser($img)
// $public : true ->Image public   , false ->Image private
// $SearchName : exemple  ->" vent.villa.13243565687676.jpg"
{
	$myfile = $img;
	$imagetype = array(
		image_type_to_mime_type(IMAGETYPE_GIF), image_type_to_mime_type(IMAGETYPE_JPEG),
		image_type_to_mime_type(IMAGETYPE_PNG), image_type_to_mime_type(IMAGETYPE_BMP)
	);
	if ($myfile["name"] <> "" && $myfile["error"] == 0) {
		if (in_array($myfile["type"], $imagetype)) {
			$FOLDER = "../file/user/";
			$file_extention = @strtolower(@end(@explode(".", $myfile["name"])));
			$file_name = date("YmdHis") . rand(10000, 9999999) . "." . $file_extention;
			if ($myfile["size"] < 400000) {

				if (move_uploaded_file($myfile["tmp_name"], $FOLDER . $file_name)) {
					echo $file_name;
				} else {
					echo false;
				}
			} else {
				try {
					compressImage($myfile["tmp_name"], $FOLDER . $file_name, 90);
					echo $file_name;
				} catch (Throwable $th) {
					echo false;
				}
			}
		}
	}
	echo false;
}
function UploadFileChate($file)
{
	$myfile = $file;
	if ($myfile["name"] <> "" && $myfile["error"] == 0) {
		$FOLDER = "../file/file message/";
		$file_extention = @strtolower(@end(@explode(".", $myfile["name"])));
		$file_name = @explode(".", $myfile["name"])[0] ."-". date("YmdHis") . "." . $file_extention;
		if (move_uploaded_file($myfile["tmp_name"], $FOLDER . $file_name)) {
			echo $file_name;
		} else {
			echo false;
		}
	} else {
		echo false;
	}
}
function UploadFilePublication($file)
{
	$myfile = $file;
	if ($myfile["name"] <> "" && $myfile["error"] == 0) {
		$FOLDER = "../file/file publication/";
		$file_extention = @strtolower(@end(@explode(".", $myfile["name"])));
		$file_name = @explode(".", $myfile["name"])[0] ."-". date("YmdHis") . "." . $file_extention;
		if (move_uploaded_file($myfile["tmp_name"], $FOLDER . $file_name)) {
			echo $file_name;
		} else {
			echo false;
		}
	} else {
		echo false;
	}
}


function DeletePic($link)
{
	if (file_exists($link)) if (unlink($link)) return true;
	return false;
}

function compressImage($source, $destination, $quality)
{
	$info = getimagesize($source);
	switch ($info['mime']) {
		case 'image/jpeg':
			$image = imagecreatefromjpeg($source);
			break;
		case 'image/png':
			$image = imagecreatefrompng($source);
			break;
		case 'image/gif':
			$image = imagecreatefromgif($source);
			break;
	}
	imagejpeg($image, $destination, $quality);
}

function ChangeFormArryImgFiles($Pictures)
{
	$NevPictures = array();

	for ($i = 0; $i < count($Pictures['name']); $i++) {
		$array = [
			'name' => $Pictures['name'][$i],
			'type' => $Pictures['type'][$i],
			'tmp_name' => $Pictures['tmp_name'][$i],
			'error' => $Pictures['error'][$i],
			'size' => $Pictures['size'][$i]
		];
		array_push($NevPictures, $array);
	}
	return $NevPictures;
}

function arrayDeleteElement($array, $element)
{
	$array1 = array_splice($array, 0, array_search($element, $array));
	$array2 = array_splice($array, array_search($element, $array) + 1, count($array));
	return array_merge($array1, $array2);
}
