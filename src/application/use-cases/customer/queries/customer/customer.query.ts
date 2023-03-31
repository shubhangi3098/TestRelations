import { IRequest } from '@softobiz-df/shared-lib';
import { GetCustomerReponseType } from './customer.response.type';

export class GetCustomerQuery implements IRequest<GetCustomerReponseType> {
		public id: string
	public constructor(init?: Partial<GetCustomerQuery>) {
		Object.assign(this, init)
	}
}
