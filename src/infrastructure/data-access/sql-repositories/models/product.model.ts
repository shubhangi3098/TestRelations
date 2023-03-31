import { UniqueEntityID } from '@softobiz-df/shared-lib';
import { UUIDVersion } from 'class-validator';
import { CustomerId } from 'src/domain/customer';
import { Column,Entity, ManyToOne, OneToMany} from 'typeorm';
import { BaseModel } from './base.model';
import { CustomerModel } from './customer.model';


@Entity({ name: 'Product30' })

export class ProductModel extends BaseModel {

	//#region constructors
	public constructor(init?: Partial<ProductModel>) {
		super()
		Object.assign(this, init)
	}
	//#endregion


	@Column()
	public pname: string

	@ManyToOne(()=>CustomerModel, (customer)=>customer.uuid)
	public customer:CustomerModel
}