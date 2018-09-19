package com.community.htl.core;



import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;


@Model(adaptables = Resource.class)
public class NewsListComponent {


	  private List<PressListItemPOJO> items;
	  private List<String> yearsList;
	  private String nearestYear;
	  
	  
	  
	  private Page currentPage;
	  
	  @Inject
	  private ResourceResolver resourceResolver;
	  
	  @Self
	  private Resource resource;
	  
	  
	  @PostConstruct
	  protected void init() {
		  currentPage = resourceResolver.adaptTo(PageManager.class).getContainingPage(resource);

	      Iterator<Page> pages = currentPage.listChildren();
	     
	      while(pages.hasNext()){
	    	  String yearName=pages.next().getName();
	    	  if(yearName!=null){
	    		  yearsList.add(yearName);
	    	  }
	      }
	  	}

		
		public List<String> getYears() {
			
			return yearsList;
		}
		
		
		public String getNearestYear() {
			
			nearestYear = yearsList.get(0);
			return nearestYear;
		}


		public List<PressListItemPOJO> getItems() {
			return items;
		}


	   
	
	
}




