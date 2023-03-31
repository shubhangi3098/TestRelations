import { AppError, Result } from '@softobiz-df/shared-lib';
import { CustomerErrors } from '../../customer.error'
import { CustomerDto } from '../../dto/customer.dto';



export type GetCustomerReponseType = Result<CustomerDto | CustomerErrors.CustomerNotFound | AppError>