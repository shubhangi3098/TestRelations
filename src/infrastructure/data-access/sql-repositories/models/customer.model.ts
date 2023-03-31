import { Column,Entity, OneToMany} from 'typeorm';
import { BaseModel } from './base.model';
import { ProductModel } from './product.model';


@Entity({ name: 'Customer30' })

export class CustomerModel extends BaseModel {

	//#region constructors
	public constructor(init?: Partial<CustomerModel>) {
		super()
		Object.assign(this, init)
	}
	//#endregion

	@Column()
	public name: string

	@OneToMany(()=>ProductModel, (product)=>product.customer)
	products:ProductModel[]

}