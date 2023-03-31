import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService, IRequestHandler, Result,UniqueEntityID} from '@softobiz-df/shared-lib';
import { Customer } from 'src/domain/customer';
import { ICustomerRepository } from 'src/infrastructure/data-access/irepositories/icustomer.repository';
import { CustomerDto } from '../../dto/customer.dto';
import { CustomerErrors } from '../../customer.error';
import { GetCustomerQuery } from './customer.query';
import { GetCustomerReponseType } from './customer.response.type';

@Injectable()
export class GetCustomerQueryHandler implements IRequestHandler<GetCustomerQuery, GetCustomerReponseType> {
	private readonly _logger = AppLoggerService.getLogger(GetCustomerQueryHandler)

	constructor(@Inject(ICustomerRepository) private readonly _customerRepo: ICustomerRepository) {}

	async handle(query: GetCustomerQuery, _token?: string): Promise<GetCustomerReponseType> {
		
		const customer: Result<Customer> = await this._customerRepo.findById(new UniqueEntityID(query.id))
		if (customer.isFailure) return Result.fail(new CustomerErrors.CustomerNotFound())
		const customerValue = customer.getValue()
		const customerDto = new CustomerDto({
			name: customerValue.props.name,
		
		
		})
		return Result.ok(customerDto)
	}
}
