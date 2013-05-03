<?php
$generated_time = time();

copy($_SERVER['DOCUMENT_ROOT'].'/assets/template.json', $_SERVER['DOCUMENT_ROOT'].'/saved_files/'.$generated_time.'.json');

$fp = fopen($_SERVER['DOCUMENT_ROOT'].'/saved_files/'.$generated_time.'.json', 'w');
fwrite($fp, $_POST['json']);
fclose($fp);
 
echo json_encode(array('url' => $generated_time));
?>