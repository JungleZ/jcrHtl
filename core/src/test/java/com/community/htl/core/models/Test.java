//package com.community.htl.core.models;
//import java.util.ArrayList;
//import java.util.Iterator;
//import java.util.List;
//
//import org.apache.sling.api.resource.Resource;
//import org.apache.sling.api.resource.ResourceResolver;
//import org.apache.sling.api.resource.ValueMap;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.adobe.cq.sightly.WCMUsePojo;
//public class Test extends WCMUsePojo {
//
//	
//	
//    private static final String PROPERTY_REFERENCE_PAGE = "rootpagepath";
//
//    private final Logger log = LoggerFactory.getLogger(this.getClass());
//
//	private List<Resource> productResourceList=new ArrayList<Resource>();
//
//    private String hello="hello";
//
//    @Override
//	public void activate() throws Exception {
//        ResourceResolver resolver=getResourceResolver();
//
//        Integer proMap=getProperties().get("numberCount", int.class);
//       // proMap.get("");
//
//        String referencePage=getResource().getValueMap().get(PROPERTY_REFERENCE_PAGE, "default");
//
//			if("".equals(referencePage)){
//				return;
//			}
//		    log.debug("category page:{}",referencePage);
//            Resource pageResource=resolver.getResource(referencePage);
//            getCategoryProducts(resolver,referencePage);
//			
//			log.debug("productList Nums:{}",productResourceList.size());
//		try{
//
//        } catch (Exception e) {
//			log.error("Please contact administrator as something went wrong in activate()",e);
//		}
//    }
//
//    public void getCategoryProducts(ResourceResolver resolver,String path){
//
//		Resource resource=resolver.getResource(path);
//
//		if(resource==null){
//			return;
//		}
//		
//
//		if(!resource.getValueMap().get("jcr:primaryType","").equals("cq:Page")){
//			return;
//		}
//		//Iterable<Resource> it=resource.getChildren();
//		Iterator<Resource> iterator=resource.getChildren().iterator();
//		while(iterator.hasNext()){
//			Resource res=iterator.next();
//			log.info("searching path:{}",res.getPath());
//			Resource prodRes=resolver.getResource(res.getPath());
//			if(prodRes!=null){
//				productResourceList.add(prodRes);
//				//hello=String.valueOf(productResourceList.size());
//			} else {
//				//getCategoryProducts(resolver, res.getPath());
//			}
//		}
//
//	}
//
//    public List<Resource> getProductResourceList(){
//		return productResourceList;
//	}
//
//	public String getHello() {
//		return hello;
//	}
//
//}