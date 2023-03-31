import { Injectable } from '@nestjs/common';
import { eDataSource, IDTO, IMapper, UniqueEntityID } from '@softobiz-df/shared-lib';
import { CustomerId } from 'src/domain/customer';
import {  Product  } from 'src/domain/customer/product';
import { CustomerModel } from '../models';
import {  ProductModel } from '../models/product.model';



@Injectable()
export class  ProductSqlMapper implements IMapper {
	constructor() {}

	toDomain(raw:  ProductModel): Product {
		// return  Product.create(
		// 	{
		// 		pname: raw.pname.toString(),
			
		    
				
		// 	},
		// 	new UniqueEntityID(raw.uuid),
		// 	eDataSource.STORAGE,
		// ).getValue()
	throw new Error()
	}

	toPersistence(input: Product, curEntity?: ProductModel): ProductModel {
		if (!curEntity) {
			curEntity = new ProductModel()
		}
		curEntity.uuid = input.getProductID.toString()
		curEntity.pname = input.props.pname;
		curEntity.customer=new CustomerModel({uuid :input.getCustomerID.id.toString()})
		
		//@todo:: improve mapping
		return curEntity;
	}
	toDto(input: ProductModel): IDTO {
		throw new Error('Method not implemented.')
	}
}
