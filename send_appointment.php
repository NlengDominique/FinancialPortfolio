<?php

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $clientName = $_POST['client-name'];
    $clientEmail = $_POST['client-email'];
    $clientPhone = $_POST['client-phone']; // Retrieve client phone
    $appointmentDate = $_POST['appointment-date'];
    $appointmentTime = $_POST['appointment-time'];
    $clientMessage = $_POST['client-message']; // Retrieve client message

    $appointmentDateTime = "$appointmentDate $appointmentTime";

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Set the SMTP server to send through
        $mail->SMTPAuth = true;
        $mail->Username = 'jleablue2@gmail.com'; // SMTP username
        $mail->Password = 'sbjqvcathkcpmxha'; // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('jleablue2@gmail.com', 'noreply email test');
        $mail->addAddress('jleablue2@gmail.com'); // Admin email address

        $mail->isHTML(true);
        $mail->Subject = 'Nouveau rendez-vous';
        $mail->Body = "
        <h3>Hello Jocelyn,</h3>
        <p>You have received a new reservation. Here are the details:</p>
        <ul>
            <li><strong>Nom:</strong> $clientName</li>
            <li><strong>Email:</strong> $clientEmail</li>
            <li><strong>Téléphone:</strong> $clientPhone</li>
            <li><strong>Date et Heure:</strong> $appointmentDateTime</li>
            <li><strong>Message:</strong> " . nl2br(htmlspecialchars($clientMessage)) . "</li>
        </ul>
        <p>Thank you!</p>";

        $mail->send();
        echo 'Rendez-vous confirmé!';
    } catch (Exception $e) {
        echo "Échec de l'envoi du message. Mailer Error: {$mail->ErrorInfo}";
    }
}
