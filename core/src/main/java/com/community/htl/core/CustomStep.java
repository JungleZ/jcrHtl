package com.community.htl.core;

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

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;

import com.adobe.granite.workflow.model.WorkflowNode;
import com.adobe.granite.workflow.exec.WorkflowData;

@Component
@Service
@Properties({
		@Property(name = Constants.SERVICE_DESCRIPTION, value = "My First Workflow Step Implementation."),
		@Property(name = Constants.SERVICE_VENDOR, value = "WorkflowTag"),
		@Property(name = "process.label", value = "Outsite My First Workflow Step ") })
public class CustomStep implements WorkflowProcess {

	/** Default log. */
	protected final Logger log = LoggerFactory.getLogger(this.getClass());

	// Inject a MessageGatewayService
	// Inject a Sling ResourceResolverFactory
	@Reference
	private ResourceResolverFactory resolverFactory;

	private Session session;

	public void execute(WorkItem item, WorkflowSession wfsession,
			MetaDataMap args) throws WorkflowException {

		try {
			log.info("**** Here in execute method"); // ensure that the execute
														// method is invoked

			// Get the Assets from the file system for a test
			WorkflowNode myNode = item.getNode();

			String myTitle = myNode.getTitle(); // returns the title of the
												// workflow step

			log.info("**** The title is " + myTitle);

			WorkflowData workflowData = item.getWorkflowData(); // gain access
																// to the
																// payload data
			String path = workflowData.getPayload().toString();// Get the path
																// of the asset

			// Get only the name of the asset - including the ext
			int index = path.lastIndexOf("/");
			String fileName = path.substring(index + 1);

			// Write the Asset to the Trash folder in the DAM
			String myFile = writeToDam(path, fileName, wfsession);// write to
																	// the Trash
																	// location

			log.info("**** This was was written to the Trash folder " + myFile);
		}

		catch (Exception e) {
			e.printStackTrace();
		}
	}

	// Place the Asset into the AEM DAM using AssetManager API
	private String writeToDam(String path, String fileName,
			WorkflowSession wfsession) {
		try {
			// Inject a ResourceResolver - make sure to whitelist the bundle
			Session session = wfsession.adaptTo(Session.class);
			ResourceResolver resourceResolver = resolverFactory
					.getResourceResolver(Collections.singletonMap(
							"user.jcr.session", (Object) session));

			// Remove the first / char - JCR API does not like that
			String newPath = path.replaceFirst("/", "");

			// USE JCR API TO get the Asset Data so we can move it to another
			// JCR location
			Node root = session.getRootNode();
			Node fileNode = root.getNode(newPath);

			// Append the path where the Asset data is stored
			String dataPath = newPath
					+ "/jcr:content/renditions/original/jcr:content";

			// Get the InputStream of the Asset
			Node dataPathNode = root.getNode(dataPath);
			InputStream content = dataPathNode.getProperty("jcr:data")
					.getStream();

			// Use AssetManager to place the file into the AEM DAM
			com.day.cq.dam.api.AssetManager assetMgr = resourceResolver
					.adaptTo(com.day.cq.dam.api.AssetManager.class);
			String newFile = "/content/dam/trash/" + fileName;
			assetMgr.createAsset(newFile, content, "image/jpeg", true);

			return fileName;
		} catch (Exception e) {
			e.printStackTrace();
			log.info("**** Error: " + e.getMessage());
		}
		return null;
	}
}