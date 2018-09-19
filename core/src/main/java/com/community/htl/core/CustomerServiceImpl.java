package com.community.htl.core;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.commons.JcrUtils;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@Service
public class CustomerServiceImpl implements CustomerService {

	protected final Logger log = LoggerFactory.getLogger(this.getClass());
	
	private Session session;
	
	@Reference
	private ResourceResolverFactory resolverFactory;
	
	@Override
	public List getCustomerData(String filter) {
		Customer customer = null;
		
		List<Customer> customerList = new ArrayList<Customer>();
		Map<String, Object> param = new HashMap<String, Object>();
		param.put(ResourceResolverFactory.SUBSERVICE, "datawrite");
		ResourceResolver resolver = null;
		
		try {
			resolver = resolverFactory.getServiceResourceResolver(param);
			session = resolver.adaptTo(Session.class);
			
			QueryManager queryManager = session.getWorkspace().getQueryManager();
			
			String sqlStatement = "";
			if(filter.equals("All Customers")){
				sqlStatement = "SELECT * FROM [nt:unstructured] WHERE CONTAINS(desc, 'Customer')";
			}else if(filter.equals("Active Customer")){
				sqlStatement = "SELECT * FROM [nt:unstructured] WHERE CONTAINS(desc, 'Active')";
			}else if(filter.equals("Past Customer")){
				sqlStatement = "SELECT * FROM [nt:unstructured] WHERE CONTAINS(desc, 'Past')";
			}
			
			Query query = queryManager.createQuery(sqlStatement, "JCR-SQL2");
			
			QueryResult result = query.execute();
			
			NodeIterator nodeIter = result.getNodes();
			
			while(nodeIter.hasNext()){
				customer = new Customer();
				
				Node node = nodeIter.nextNode();
				
				customer.setFirst(node.getProperty("firstName").getString());
				customer.setLast(node.getProperty("lastName").getString());
				customer.setAddress(node.getProperty("address").getString());
				customer.setDescription(node.getProperty("desc").getString());
				
				customerList.add(customer);
			}
			
		} catch (LoginException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			log.error("getSesolver failde" + e.getMessage());
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			log.error("get QueryManager failde" + e.getMessage());
		} finally{
			if(session != null){
				session.logout();
			}
		}
				
		return customerList;
	}
	
	private int doesCustExist(Node content){
		
		int index = 0;
		int childRecs = 0;
		
		try {
			java.lang.Iterable<Node> custNode = JcrUtils.getChildNodes(content, "customer");
			Iterator it = custNode.iterator();
			
			if(it.hasNext()){
				Node customerRoot = content.getNode("customer");
				Iterable itCust = JcrUtils.getChildNodes(customerRoot);
				Iterator childNodeIt = itCust.iterator();
				
				while(childNodeIt.hasNext()){
					childRecs++;
					childNodeIt.next();
				}
				
				return childRecs;
				
			}else{
				return -1;
			}
			
		} catch (RepositoryException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			log.equals("doesCustExist faild " + e.getMessage());
		}
		
		
		
		return 0;
	}
/*	public String getCustomerData(String filter){
		return null;
	}*/

}
