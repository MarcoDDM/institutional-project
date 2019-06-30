<?php


require("mailer/class.phpmailer.php");
require("mailer/class.smtp.php");


// Valores enviados desde el formulario
if ( !isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["message"]) ) {
    die ("Please fill in Required field below. ");
}


$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];


$to = "hola@soymarco.com";


// Datos de la cuenta de correo utilizada para enviar vía SMTP
$smtpHost = "puma.theukhost.net";  // Dominio alternativo brindado en el email de alta 
$smtpUsuario = "hola@soymarco.com";  // La cuenta de correo
$smtpClave = "@s=*%PICElQK";  // Mi contraseña




$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Port = 465; 
$mail->IsHTML(true); 
$mail->CharSet = "utf-8";

// VALORES A MODIFICAR //
$mail->Host = $smtpHost; 
$mail->Username = $smtpUsuario; 
$mail->Password = $smtpClave;

$mail->From = $email; // Email desde donde envío el correo.
$mail->FromName = $name;
$mail->AddAddress($to); // Esta es la dirección a donde enviamos los datos del formulario

$mail->Subject = $subject; // Este es el titulo del email.
$mensajeHtml = nl2br($content);
$mail->Body = "
<html> 

<body> 

<h1>Recibiste un nuevo mensaje desde el formulario de contacto</h1>

<p>Informacion enviada por el usuario de la web:</p>

<p>name: {$name}</p>

<p>surname: {$surname}</p>

<p>email: {$email}</p>

<p>dob: {$dob}</p>

<p>birthplace: {$birthplace}</p>

<p>livingplace: {$livingplace}</p>

<p>familiar: {$familiar}</p>

<p>spellsbefore: {$spellsbefore}</p>

<p>subject: {$subject}</p>

<p>message: {$message}</p>

</body> 

</html>

<br />"; // Texto del email en formato HTML
$mail->AltBody = "{$content} \n\n "; // Texto sin formato HTML
// FIN - VALORES A MODIFICAR //

$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$estadoEnvio = $mail->Send(); 
if($estadoEnvio){
    echo "El correo fue enviado correctamente.";

} else {
    echo "Ocurrió un error inesperado.";

}


?>

