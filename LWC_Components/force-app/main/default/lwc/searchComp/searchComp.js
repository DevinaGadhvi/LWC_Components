import { LightningElement, track, wire } from 'lwc';
import getProducts from '@salesforce/apex/SearchCompController.getProducts';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'ProductCode', fieldName: 'ProductCode' }
];
export default class SearchComp extends LightningElement {

    columns = columns;
    @track productsData = [];
    productName;

    @wire(getProducts, {searchProductName : '$productName'})
    getProductsData({error, data}){
        
        if(data){
            
            if(data.isSuccess){
                this.productsData = data.productsData;
            }else{
                console.log('Error while fetching products data::'+data.errorMsg);
            }
        }
        else if(error){
            console.log('Error ::'+error.getMessage);
        }
    }


    handleInputChange(event){
        this.productName = event.target.value;
    }
}