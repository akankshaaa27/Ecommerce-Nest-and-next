import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation and CORS
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Connect microservice (RabbitMQ)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://guest:guest@rabbitmq:5672'],
    urls: [process.env.RABBITMQ_URL!],

      // urls: ['amqp://localhost'],
      queue: 'customer_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices(); // Start RabbitMQ microservice
  await app.listen(3002);            // Start REST API
}
bootstrap();
