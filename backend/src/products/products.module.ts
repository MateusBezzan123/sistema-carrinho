import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ProductsController], // <- Certifique-se de que está aqui
  providers: [ProductsService, PrismaService], // <- PrismaService também é necessário
})
export class ProductsModule {}
