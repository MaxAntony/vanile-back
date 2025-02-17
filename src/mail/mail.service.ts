import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'server149.web-hosting.com', // Servidor SMTP de tu hosting
      port: 465, // O 587 si usas STARTTLS
      secure: true, // True para 465, False para otros
      auth: {
        user: 'mirtest@fixa.digital', // Tu correo
        pass: 'lavidaesbella@1asdf', // Contraseña del correo
      },
    });
  }

  async sendMail(costo: string, fecha: string) {
    const mailOptions = {
      from: '"Soporte" <mirtest@fixa.digital>', // Remitente
      to: 'maxpacami@gmail.com',
      subject: 'Nueva orden',
      text: `se registro una nueva orden por  ${costo} a las ${fecha}`,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.messageId);
      return info;
    } catch (error) {
      console.error('Error enviando correo:', error);
      throw error;
    }
  }
}
