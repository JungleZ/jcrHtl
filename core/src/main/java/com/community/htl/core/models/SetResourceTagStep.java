package com.community.htl.core.models;

import java.security.AccessControlException;
import java.util.Arrays;
import java.util.List;

import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.tagging.JcrTagManagerFactory;
import com.day.cq.tagging.Tag;
import com.day.cq.tagging.TagManager;

@Component
@Service
@Properties({
		@Property(name = Constants.SERVICE_DESCRIPTION, value = "Create Tag Workflow Step Implementation."),
		@Property(name = Constants.SERVICE_VENDOR, value = "WorkflowTag"),
		@Property(name = "process.label", value = "Set Tag Workflow Step V3") })
public class SetResourceTagStep implements WorkflowProcess {

	public SetResourceTagStep() {
		 super();
	}
	/** Default log. */
	protected final Logger logger = LoggerFactory.getLogger(this.getClass());


	protected  Tag[] chooseTagList = null;
	
	@Reference
    JcrTagManagerFactory jcrTagManagerFactory;
	
	@Reference
	private ResourceResolverFactory resolverFactory;

	
	private Session session;
	
	private Tag[] tagsArray = new Tag[]{};
	
	private static final String NAMESPACE = "/etc/tags";
	
	
	@SuppressWarnings("deprecation")
	public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap){
		
		logger.info("---------auto set resources tag---------");
		ResourceResolver resourceResolver;
		TagManager tagManager = null ;
		try {
			resourceResolver = resolverFactory.getAdministrativeResourceResolver(null);
			session = resourceResolver.adaptTo(Session.class);
			tagManager = jcrTagManagerFactory.getTagManager(session);
			WorkflowData workflowData = workItem.getWorkflowData();
            String payload = workflowData.getPayload().toString();
            logger.info("---------pay load is:" + payload + "---------");
			if(payload!=null){
				Resource res = resourceResolver.resolve(payload);
				 
				//获取资产标签存储的jcr:content路径，并生成Resource
				logger.info("---------resource path is:" + res.getPath() + "---------");
				String tagPath = subResPath(payload);
		        Resource resource = resourceResolver.getResource(tagPath);
		        
		        //拆分资产除文件名之外的目录
		        String tagsPath = subTagPath(payload);
		        
		        logger.info("the tags Path = " + tagsPath + " resource = " +resource);
		       
		        //获取资产路径为标签的所有层级标签
		        logger.info("--------tagsPath---------- " + tagsPath);
		        Tag[] allTags = getTagsList(tagsPath,tagManager);
		        
		        for (int i = 0; i < allTags.length; i++) {
					logger.info("the tags array  count = " + i +", value = "+  allTags[i] );
				}
				//获取用户的地域标签、默认添加到tags列表  这里以用户名包含的字符为准
		        String startUserName = resourceResolver.getResource(workItem.getWorkflowData().getPayload().toString()).getValueMap().get("jcr:createdBy").toString();
		        logger.info("The current start workflow author is :" + startUserName);
		        
		        allTags = getUserAdaptTags(startUserName,tagManager,allTags);
		        
		        if(allTags.length > 0 ){
		        	
		        	logger.info("allTags  tags.length " + allTags.length);
		        	//设置资源的标签
		        	tagManager.setTags(resource, allTags,true);
		        }
		        

				logger.info("set the resource tags successfully ." );
			}
			
		} catch (LoginException e) {
			logger.error("getAdministrativeResourceResolver  Exception :" ,e.getMessage());
		} catch (AccessControlException e) {
			logger.error("set resource exception" ,e.getMessage());
		} 

	}

	/**
	 * 获取当前用户的区域标签
	 * @param startUserName
	 * @return
	 */
	private Tag[] getUserAdaptTags(String startUserName, TagManager tagManager,
			Tag[] allTags) {
		
		//TODO
//		String areaTagsPath = "/etc/tags/huangjin/baiyin";
		
		Tag[] tempTags = Arrays.copyOf(allTags, allTags.length + 1);
		Tag tempTag = null;
		
		return tempTags;
	}

	/**
	 * 获取需要设置的标签列表
	 * @param tagManager 
	 * @param tagPath
	 * @return
	 */
	private Tag[] getTagsList(String tagsPath, TagManager tagManager) {
		tagsPath = tagsPath.replace("/content/dam/", "");
        String[] strArray = tagsPath.split("/");
		String[] newStrArray = (String[]) Arrays.copyOf(strArray, strArray.length); 
		String temp = "";
		for (int i = 0; i < strArray.length; i++) {
//			if(i==0){
//				newStrArray[i] =  strArray[i] ;
//			}else{
				newStrArray[i] = temp + "/" + strArray[i] ;
				temp = temp + "/" + strArray[i] ;
//			}
		}
		//获取路径中存在的标签
		Tag tempTag = null;
		int tempTagCount = 0;
		for (int i = 0; i < newStrArray.length; i++) {
			if(newStrArray[i]!=null && !"".equals(newStrArray[i])){
				tempTag = tagManager.resolve(NAMESPACE + newStrArray[i]);
				logger.info("to get current tag path = " + NAMESPACE + newStrArray[i]);
				if(tempTag!=null){
					tempTagCount ++;
				}
			}
		}
		//获取存在标签列表
		Tag[] tags = null;
		if(tempTagCount > 0){
			tags = Arrays.copyOf(tagsArray, tempTagCount);
			int j = 0;
			for (int i = 0; i < newStrArray.length; i++) {
				if(newStrArray[i]!=null && !"".equals(newStrArray[i])){
					tempTag = tagManager.resolve(NAMESPACE + newStrArray[i]);
					if(tempTag!=null){
						if(j >=tags.length ){
							break;
						}
						logger.info("the current tag path = " + tempTag);
						tags[j] = tempTag;
						j++;
					}else{
						//如果存在不存在的标签路径则放弃所有操作
						tags = Arrays.copyOf(tagsArray, 1);;
						break;
					}
				}
			}
		}else{
			logger.info("There is no tag for this type.");
		}
		return tags;
	}

	/**
	 * 拆分目录字符串
	 * @param path
	 * @return
	 */
	private String subResPath(String path) {
		if(path.contains("/jcr:content/")){
			
			path = path.substring(0, path.lastIndexOf("/jcr:content/"));
		}
		return path + "/jcr:content/metadata";
	}

	/**
	 * 拆分目录
	 * @param path
	 * @return
	 */
	private String subTagPath(String path) {
		if(path.contains("/jcr:content/")){
			path = path.substring(0, path.lastIndexOf("/jcr:content/"));
		}
		return path.substring(0,path.lastIndexOf("/"));
	}
	
	

}
