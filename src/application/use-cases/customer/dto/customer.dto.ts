import { IDTO } from '@softobiz-df/shared-lib';

export class CustomerDto implements IDTO {
	
	public name: string

	public constructor(init?: Partial<CustomerDto>) {
		Object.assign(this, init)
	}
}
