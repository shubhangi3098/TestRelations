import { AggregateRoot,eDataSource, GenericAppError, Result,  UniqueEntityID } from '@softobiz-df/shared-lib';
import { Product, ProductList } from './product';

interface CustomerProps {
	name: string,
	products: ProductList
	

}
export class Customer extends AggregateRoot<CustomerProps> {

  //#region member variables
	//#endregion

	//#region constants
	//#endregion

	//#region properties
	//#endregion

	//#region private methods
	private constructor(props: CustomerProps, id?: UniqueEntityID) {
		super(props, id)
	}
	//#endregion

	//#region private setters
	private setName(name: string) {
		this._props.name = name
		return Result.ok(this)
	}

	private setProduct(product: ProductList) {
		for (const identifier of product) {
			if (!(identifier instanceof Product)) {

				return Result.fail('Each product must be instance of Identifier!')
			}
		}
		this._props.products= product
		return Result.ok(this)
	}
  //#endregion



	//#region public methods
	public static create(props: CustomerProps, id?: UniqueEntityID, dataSource?: eDataSource) {
		if (dataSource === eDataSource.STORAGE) return Result.ok(new  Customer(props, id))
		const  customer = new  Customer(Object.create(null), id)
		const validationQueue = [
			customer.setName(props.name),
			customer.setProduct(props.products)
			

		]
		const combinedResult = Result.combine(validationQueue)
		if (combinedResult.isFailure) return Result.fail<Customer>(new GenericAppError.DomainError(combinedResult.errorValue()))
		return Result.ok(customer)
	}
	//#endregion

}
