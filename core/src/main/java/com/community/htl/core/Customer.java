package com.community.htl.core;

import com.day.cq.searchpromote.xml.result.PageList;


public class Customer {

	private String custId;
	private String first;
	private String last;
	private String address;
	private String description;
	public String getCustId() {
		
		return custId;
	}
	public void setCustId(String custId) {
		this.custId = custId;
	}
	public String getFirst() {
		return first;
	}
	public void setFirst(String first) {
		this.first = first;
	}
	public String getLast() {
		return last;
	}
	public void setLast(String last) {
		this.last = last;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
}
