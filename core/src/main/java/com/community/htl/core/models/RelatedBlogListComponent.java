package com.community.htl.core.models;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;

public class RelatedBlogListComponent extends WCMUsePojo {

	private final Logger log = LoggerFactory.getLogger(this.getClass());
	
	private static final String PROPERTY_REFERENCE_PAGE = "blogs";
	 
	private List<Page> relatedArticles=new ArrayList<Page>();
	private List<Resource> relatedArticleResourses =new ArrayList<Resource>();

	private String strValue;
	


	@Override
	public void activate() throws Exception {
		log.info("start activate method");

		try{
			
		ResourceResolver resolver=getResourceResolver();
			
		//Page page=getCurrentPage();


		//String searchPath=page.getParent().getParent().getPath();
		strValue=getResource().getValueMap().get(PROPERTY_REFERENCE_PAGE, "default");
		log.info("strValue string:{}",strValue);
		JSONObject jsonObject=new JSONObject(strValue);
		
		if (jsonObject!=null) {
			JSONArray hobbies=jsonObject.getJSONArray("image");
			for (int i = 0; i < hobbies.length(); i++) {
				String  hobbyStr=(String) hobbies.get(i);
				Resource resource=resolver.getResource(hobbyStr);
				Page page =resolver.adaptTo(Page.class);
				relatedArticles.add(page);
				relatedArticleResourses.add(page.getContentResource());
			}
		}
				
			
			
		} catch (Exception e) {
			log.error("Please contact administrator as something went wrong in activate()",e);
		}
	}

	
	public String getStrValue() {
		return strValue;
	}

	public List<Page> getRelatedArticles() {
		return relatedArticles;
	}



	public List<Resource> getRelatedArticleResourses() {
		return relatedArticleResourses;
	}



}
