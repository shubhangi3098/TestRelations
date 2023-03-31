import { Module } from '@nestjs/common';
import { CustomerSqlMapper } from './mappers/customer.mapper';
import { ICustomerRepository } from '../irepositories/icustomer.repository';
import { CustomerSqlRepository } from './customer.repository';
import { ProductSqlMapper } from './mappers';


@Module({
	providers: [CustomerSqlMapper,  CustomerSqlRepositoryModule, ProductSqlMapper,{ provide: ICustomerRepository, useClass: CustomerSqlRepository }],
	exports: [{ provide: ICustomerRepository, useClass: CustomerSqlRepository }],
})
export class CustomerSqlRepositoryModule {}