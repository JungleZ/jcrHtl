package com.community.htl.core.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.jcr.Session;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;

public class SearchResultComponent extends WCMUsePojo {

	private final Logger log = LoggerFactory.getLogger(this.getClass());
	
	private static final String PROPERTY_REFERENCE_PAGE = "rootpagepath";
	
	//global path
	private static final String PROPERTY_ROOT_PATH="/content/tcl-site/en";
		
	
	 
	private List<Page> relatedArticles=new ArrayList<Page>();
	
	private List<Resource> relatedArticleResourses =new ArrayList<Resource>();

	private Integer totalNum=0;
	

	@Override
	public void activate() throws Exception {


		try{
		
		ResourceResolver resolver=getResourceResolver();
			
		Page page=getCurrentPage();
		
		
		String templatePath = page.getProperties().get(NameConstants.NN_TEMPLATE, "");   
		// whether global search
		String searchScopeStr=getResource().getValueMap().get("searchScope", "ALL");
		//String searchPath=page.getParent().getParent().getPath();
		String searchPath=getResource().getValueMap().get(PROPERTY_REFERENCE_PAGE, "default");
		String limit=getResource().getValueMap().get("limit", "6");
		
		Tag[] tags=page.getTags();
				
		//search result include the current page,so the should be +1
		int pageLimit=Integer.valueOf(limit)+1;
				
		Map<String, String> map = new HashMap<String, String>(); 
		if (searchScopeStr.equals("ALL")) {
			 //2_property=cq:tags&2_property.value=marketing:interest/business&3_property=cq:tags&3_property.value=marketing:interest/investor
	         map.put("path", PROPERTY_ROOT_PATH);  
	         map.put("type", "cq:Page");
	         //map.put("1_property", "jcr:content/cq:template"); 
	         // map.put("1_property.value", page.getProperties().get(NameConstants.NN_TEMPLATE, ""));   
	         map.put("2_property", "jcr:content/jcr:title");
	         map.put("2_property.value", page.getTitle());
			 map.put("property", "jcr:content/cq:tags");
			 map.put("property.or", "true");
			 int start=1;
			 for(Tag tag:tags){
				 map.put("property." + String.valueOf(start) + "_value", tag.getTagID());
				 start+=1;
			 }
	        // map.put("2_property", "jcr:content/cq:tags"); 
	         //map.put("2_property.value", page.getTags());    
	         map.put("orderby", "@jcr:created");

	         map.put("orderby.sort", "desc");
	         map.put("p.limit", String.valueOf(pageLimit));
		}else {
			
			 //2_property=cq:tags&2_property.value=marketing:interest/business&3_property=cq:tags&3_property.value=marketing:interest/investor
	         map.put("path", PROPERTY_ROOT_PATH);  
	         map.put("type", "cq:Page");
	         //map.put("1_property", "jcr:content/cq:template"); 
	         // map.put("1_property.value", page.getProperties().get(NameConstants.NN_TEMPLATE, ""));   
	         map.put("2_property", "jcr:content/jcr:title");
	         map.put("2_property.value", page.getTitle());
			 map.put("property", "jcr:content/cq:tags");
			 map.put("property.or", "true");
			 int start=1;
			 for(Tag tag:tags){
				 map.put("property." + String.valueOf(start) + "_value", tag.getTagID());
				 start+=1;
			 }
	        // map.put("2_property", "jcr:content/cq:tags"); 
	         //map.put("2_property.value", page.getTags());    
	         map.put("orderby", "@jcr:created");

	         map.put("orderby.sort", "desc");
	         map.put("p.limit", String.valueOf(pageLimit));
		}

		
		
         
         QueryBuilder builder=resolver.adaptTo(QueryBuilder.class);
         Session session =resolver.adaptTo(Session.class);
       
                            
         Query query = builder.createQuery(PredicateGroup.create(map), session);
                     
         SearchResult result = query.getResult();
         
         log.info("query string:{}",result.getQueryStatement());
          
         log.info("nums of related articles:{}",result.getTotalMatches());
         
         totalNum=(int) result.getTotalMatches();
         
         Iterator<Resource> it= result.getResources(); 
         while(it.hasNext()){
        	 Page articlePage=it.next().adaptTo(Page.class);
            	 relatedArticles.add(articlePage);
            	 relatedArticleResourses.add(articlePage.getContentResource());

         }
						
		} catch (Exception e) {
			log.error("Please contact administrator as something went wrong in activate()",e);
		}
	}

	
	
	public List<Page> getRelatedArticles() {
		return relatedArticles;
	}



	public List<Resource> getRelatedArticleResourses() {
		return relatedArticleResourses;
	}

	
	public Integer getTotalNum() {
		return totalNum;
	}



}
