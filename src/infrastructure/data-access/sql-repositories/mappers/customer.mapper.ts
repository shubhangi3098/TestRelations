import { Injectable } from '@nestjs/common';
import { eDataSource, IDTO, IMapper, UniqueEntityID } from '@softobiz-df/shared-lib';
import {  Customer  } from 'src/domain/customer/customer';
import {  CustomerModel } from '../models/customer.model';
import { ProductSqlMapper } from './product.mapper';


@Injectable()
export class  CustomerSqlMapper implements IMapper {
	
	constructor(private productMapper:ProductSqlMapper) {}

	toDomain(raw:  CustomerModel): Customer {
		return  Customer.create(
			{
				name: raw.name,
				products:raw.products.map((x)=>this.productMapper.toDomain(x))
			},
			new UniqueEntityID(raw.uuid),
			eDataSource.STORAGE,
		).getValue()
	}

	toPersistence(input: Customer, curEntity?: CustomerModel): CustomerModel {
		if (!curEntity) {
			curEntity = new CustomerModel()
		}
		curEntity.uuid = input.id.toString()
		curEntity.name = input.props.name;
		curEntity.products=input.props.products.map((x)=> {
			const ProductModel=this.productMapper.toPersistence(x)
			ProductModel.customer= curEntity
			return ProductModel
		})
		//@todo:: improve mapping
		return curEntity;
	}
	toDto(input: CustomerModel): IDTO {
		throw new Error('Method not implemented.')
	}
}
