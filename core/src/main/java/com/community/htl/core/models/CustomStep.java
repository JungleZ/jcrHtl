package com.community.htl.core.models;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.jcr.Session;
import javax.jcr.Node;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.StringWriter;
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;

import javax.jcr.Repository;
import javax.jcr.SimpleCredentials;
import javax.jcr.Node;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.IOException;

import com.day.cq.dam.api.Asset;

import java.util.Collections;

import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.commons.JcrUtils;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.jcr.Session;
import javax.jcr.Node;

import org.osgi.framework.Constants;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;

//AssetManager
import com.day.cq.dam.api.AssetManager;

import java.io.ByteArrayOutputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//Sling Imports
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.Resource;

import com.day.cq.wcm.api.Page;

import org.osgi.service.component.annotations.Component;

import com.adobe.granite.workflow.model.WorkflowNode;
import com.adobe.granite.workflow.exec.WorkflowData;


@Component
@Service
@Properties({
		@Property(name = Constants.SERVICE_DESCRIPTION, value = "Create Tag Workflow Step Implementation."),
		@Property(name = Constants.SERVICE_VENDOR, value = "WorkflowTag"),
		@Property(name = "process.label", value = "Set Tag Workflow Step") })
public class CustomStep implements WorkflowProcess {

	/** Default log. */
	protected final Logger log = LoggerFactory.getLogger(this.getClass());

	// Inject a MessageGatewayService
	// Inject a Sling ResourceResolverFactory
	@Reference
	private ResourceResolverFactory resolverFactory;

	private Session session;
	
	boolean isApprove=false;

	public void execute(WorkItem item, WorkflowSession wfsession,
			MetaDataMap args) throws WorkflowException {

		try {
			log.info("**** Here process 1 in execute method"); // ensure that the execute
														// method is invoked
			
		}catch (Exception e) {
			e.printStackTrace();
		}
	}

	
}