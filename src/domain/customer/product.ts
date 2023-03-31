import { eDataSource, GenericAppError, Result, UniqueEntityID, Entity } from '@softobiz-df/shared-lib'
import { Products } from 'src/application/use-cases/customer/commands/customer/customer.cmd'
import { Customer } from './customer'
import { CustomerId } from './customer-id'

interface ProductProps {
	pname: string,
	customerID: CustomerId,
	
}
export class Product extends Entity<ProductProps> {
	id: any
	//#region member variables
	//#endregion
	
	//#region constants
	//#endregion

	//#region properties
	//#endregion

	//#region private methods
	private constructor(props: ProductProps, id?: UniqueEntityID) {
		super(props, id)
	}
	public get getProductID() : UniqueEntityID {
		return this._id
	 }

	 public get getProductName() : String {
		return this._props.pname
	 }
	//#endregion

	//#region private setters
	private setName(pname: string){
		this._props.pname = pname
		return Result.ok(this)
	}
	
	private setCustomerID(customerID: CustomerId){
	
		this._props.customerID = customerID
		return Result.ok(this)
	}
	//#endregion
	public get getCustomerID() : CustomerId{
		return this.props.customerID
	}


	//#region public methods
	public static create(props: ProductProps, id?: UniqueEntityID, dataSource?: eDataSource) {
		if (dataSource === eDataSource.STORAGE) return Result.ok(new Product(props, id))
		const product = new Product(Object.create(null), id)
		const validationQueue = [
			product.setName(props.pname),product.setCustomerID(props.customerID)	
		]
		const combinedResult = Result.combine(validationQueue)
		if (combinedResult.isFailure) return Result.fail<Product>(new GenericAppError.DomainError(combinedResult.errorValue()))
		return Result.ok(product)
	}
	//#endregion

}
export type ProductList = Product[]
