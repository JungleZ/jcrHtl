package com.community.htl.core;

import java.util.List;

import javax.jcr.Node;

import com.adobe.cq.sightly.WCMUsePojo;


public class JCRHeroComponent extends WCMUsePojo{

	private CustomerService custService;
	
	private List<Customer> custList = null;
	
	private List<Customer> lBean = null;
	
	@Override
	public void activate() throws Exception {
		
		String filter = "";
		Node currentNode = getResource().adaptTo(Node.class);
		
		if(currentNode.hasProperty("jcr:Heading")){
			filter = currentNode.getProperty("./jcr:Heading").getString();
		}
		
		custService = getSlingScriptHelper().getService(CustomerService.class);
		
		custList = custService.getCustomerData("All customers");
		setLBean(custList);
		
	}
	
	public List<Customer> getLBean(){
		return this.lBean;
	}
	
	public void setLBean(List<Customer> items){
		this.lBean = items;
	}

}
