import { IRequest, UniqueEntityID } from '@softobiz-df/shared-lib';
import { IsOptional } from 'class-validator';
import { CustomerCreateResponseType } from './customer.response.type';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/domain/customer';

export class Products{

 
	@IsOptional()
	@ApiProperty()
	public pname:string

	public constructor(init?: Partial<Product>) {
		Object.assign(this, init)
	}
} 

export class CustomerCreateCommand implements IRequest<CustomerCreateResponseType> {
	@IsOptional()
	@ApiProperty()
	public name: string

	@IsOptional()
	@ApiProperty({isArray:true,type:Products})
	public products: Products[]

  
	public constructor(init?: Partial<CustomerCreateCommand>) {
		Object.assign(this, init)
	} 
}