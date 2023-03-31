import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService, IRequestHandler, RecordIdModel, Result } from '@softobiz-df/shared-lib';
import { CustomerId, Product } from 'src/domain/customer';
import { Customer } from '../../../../../domain/customer/customer';
import { ICustomerRepository } from '../../../../../infrastructure/data-access/irepositories/icustomer.repository';
import { CustomerCreateCommand, Products } from './customer.cmd';
import { CustomerCreateResponseType } from './customer.response.type';

@Injectable()
export class CustomerCreateCommandHandler implements IRequestHandler<CustomerCreateCommand, CustomerCreateResponseType> {
	private readonly _logger = AppLoggerService.getLogger(CustomerCreateCommandHandler)

	constructor(@Inject(ICustomerRepository) private readonly _customerRepo: ICustomerRepository) { }
	async handle(commandOrQuery: CustomerCreateCommand, token?: string): Promise<CustomerCreateResponseType> {


		const customerID = CustomerId.create(null)
        console.log(customerID);
	

		const Productz= commandOrQuery.products
		const productResultList = []
		for (const product of Productz) {
			const productResult: Result<Product> = Product.create({ pname: product.pname, customerID:customerID})
			productResultList.push(productResult)
			console.log(productResult);
		}

		const customer = Customer.create({
			name: commandOrQuery.name,
			products: productResultList.map((x:Result<Product>)=>x.getValue())
		},customerID.id)


		if (customer.isFailure) return Result.fail(customer.errorValue())

		const customerValue = customer.getValue()
		await this._customerRepo.save(customerValue)

		return Result.ok(new RecordIdModel({ id: customerValue.id.toString() }))

	}







}