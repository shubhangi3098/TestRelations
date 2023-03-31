import { Module } from '@nestjs/common';
import { CustomerController } from 'src/application/rest-api/customer.controller';
import { CustomerSqlRepositoryModule } from 'src/infrastructure/data-access/sql-repositories/customer-sql-repository.module';
import { CustomerCreateCommand } from './commands/customer/customer.cmd';
import { CustomerCreateCommandHandler } from './commands/customer/customer.cmd.handler';
import { GetCustomerQuery } from './queries/customer/customer.query';
import { GetCustomerQueryHandler } from './queries/customer/customer.query.handler';

@Module({
	imports: [CustomerSqlRepositoryModule], // use MongoRepositoryModule if using Mongodb
	controllers: [CustomerController],
	providers: [
		{ provide: CustomerCreateCommand, useClass: CustomerCreateCommandHandler },
		{ provide: GetCustomerQuery, useClass: GetCustomerQueryHandler },
		
	],
})
export class CustomerModule {}
