import { GenericAppError } from '@softobiz-df/shared-lib';

export namespace CustomerErrors {
	export class CustomerNotFound extends GenericAppError.NotFoundError {
		constructor() {
			super()
			this.message = 'Customer not found!'
		}
	}
}
