public with sharing class SearchCompController {
    
    /**
    * getProducts method is called from wire in searchComp gets list of products
    * input param - searchProductName is the search key for products
    * return - ResponseWrapper wrapper class
    */
    @AuraEnabled(cacheable = true)
    public static ResponseWrapper getProducts(String searchProductName){
        
        ResponseWrapper responseWrapper = new ResponseWrapper();
        searchProductName = '%'+searchProductName+'%';
        try {
            List<Product2> productsData = [SELECT Id, Name, ProductCode FROM Product2 WHERE Name LIKE :searchProductName LIMIT 10];

            responseWrapper.productsData = productsData;
            responseWrapper.isSuccess = true;    
        } catch (Exception e) {
            responseWrapper.errorMsg = e.getMessage();
        }
        return responseWrapper;
    }

    public class ResponseWrapper{
        @AuraEnabled
        public Boolean isSuccess = false;
        @AuraEnabled
        public String errorMsg = '';
        @AuraEnabled
        public List<Product2> productsData = new List<Product2>();
    }

}