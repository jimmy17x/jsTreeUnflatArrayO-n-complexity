		// hardcoded network response
		var JSON_NETWORK_RESPONSE  = {
									   'status':{
										  'status':'Successfully retrieved related APRs.',
										  'statusCode':'0'
									   },
									   'aprInfo':[
										  {
											 'id':'11719201801231331',
											 'title':'Goats and pigs',
											 'parentId':'11715201801231224',
											 'type':'Child',
											 'status':'InRouting',
											 'productTitle':null,
											 'STTDate':'2018-02-28 01:00:00',
											 'coordinator':'ldapcoordinator1',
											 'longId':'2018-0015728-001-C',
											 'region':'AP'
										  },
										  {
											 'id':'11715201801231224',
											 'title':'Roads to the village',
											 'parentId':null,
											 'type':'Parent',
											 'status':'InProgress',
											 'productTitle':'Aveeno Positively Radiant Daily Moisturizer with SPF 30',
											 'STTDate':'2018-02-28 01:00:00',
											 'coordinator':'ldapcoordinator1',
											 'longId':'2018-0015728-000-P',
											 'region':'AP'
										  },
										  {
											 'id':'11718201801231242',
											 'title':'Flowers during the sunrise',
											 'parentId':'11715201801231224',
											 'type':'Sibling',
											 'status':'InProgress',
											 'productTitle':null,
											 'STTDate':'2018-02-28 01:00:00',
											 'coordinator':'ldapcoordinator1',
											 'longId':'2018-0015728-001-S',
											 'region':'AP'
										  },{
											 'id':'11718201801231242',
											 'title':'Skateboards in evening',
											 'parentId':'11715201801231224',
											 'type':'Sibling',
											 'status':'InProgress',
											 'productTitle':null,
											 'STTDate':'2018-02-28 01:00:00',
											 'coordinator':'ldapcoordinator1',
											 'longId':'2018-0015728-001-S',
											 'region':'AP'
										  },
										  {
											 'id':'11721201801240801',
											 'title':'Smiling is the only blessing',
											 'parentId':'11718201801231242',
											 'type':'Sibling',
											 'status':'New',
											 'productTitle':null,
											 'STTDate':'2018-02-28 01:00:00',
											 'coordinator':'ldapcoordinator2',
											 'longId':'2018-0015728-002-S',
											 'region':'AP'
										  },{
											 'id':'1172120180124080',
											 'title':'Walking free is everybody\'s right !',
											 'parentId':'11718201801231242',
											 'type':'Sibling',
											 'status':'New',
											 'productTitle':null,
											 'STTDate':'2018-02-28 01:00:00',
											 'coordinator':'ldapcoordinator2',
											 'longId':'2018-0015728-002-S',
											 'region':'AP'
										  },{
											 'id':'117212018024080',
											 'title':'Rivers flows in valleys',
											 'parentId':'11718201801231242',
											 'type':'Sibling',
											 'status':'New',
											 'productTitle':null,
											 'STTDate':'2018-02-28 01:00:00',
											 'coordinator':'ldapcoordinator2',
											 'longId':'2018-0015728-002-S',
											 'region':'AP'
										  },{
											 'id':'1172120124080',
											 'title':'A big fat hen',
											 'parentId':'11718201801231242',
											 'type':'Sibling',
											 'status':'New',
											 'productTitle':null,
											 'STTDate':'2018-02-28 01:00:00',
											 'coordinator':'ldapcoordinator2',
											 'longId':'2018-0015728-002-S',
											 'region':'AP'
										  },
									   ]
									};
									
	
	// A $( document ).ready() block.
	$( document ).ready(function() {
 
		var tree = unflatArrayToTree(JSON_NETWORK_RESPONSE.aprInfo);
		var js_tree_dump = {};
		js_tree_dump["core"]={};
		js_tree_dump["core"]["data"]=[];
		js_tree_dump["core"]["data"] = tree;
		
		
		$('#container').jstree(js_tree_dump);
		$('#container').on("select_node.jstree", function (e, data) 
												{
                                            	var jsons = JSON.parse(data.node.data.apr_info);
                                            	alert( "Clicked APR id : "  + jsons.id + 
													"\nTitle : " + jsons.title); 
                                             }).on('after_open.jstree',
												function(e, data) {
													var closed_count = $(".jstree-closed").length;

													if(closed_count == 0)
													{
														alert("All rows opened event captutred");
													}
											}).on('after_close.jstree',
													function(e, data) {
														var open_count = $(".jstree-open").length;
														if(open_count == 0)
														{
															alert("All rows closed event captutred");
														}
											});
 

		

		// this function converts a flatted array to a tree structure in O(n) time using hashing 
		   function unflatArrayToTree(arr) {
			  var tree = [],
				  mappedArr = {},
				  arrElem,
				  mappedElem;
				  
				  var cuurent_apr = "AP-2018-0015728-001-S";

			  // First map the nodes of the array to an object -> create a hash table.
			  for(var i = 0, len = arr.length; i < len; i++) {
				  
				arrElem = arr[i];
				mappedArr[arrElem.id] = arrElem;
				mappedArr[arrElem.id]['text'] = arrElem.longId + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + arrElem.title;
				

				mappedArr[arrElem.id]['a_attr'] = {}
				mappedArr[arrElem.id]['icon'] = "none";
				mappedArr[arrElem.id]['dots'] = true;
        mappedArr[arrElem.id]['data'] = {"apr_info":JSON.stringify(arr[i])};
        
				mappedArr[arrElem.id]['children'] = [];

        
        
				//apply appropriate css to APR
				var bg_class = "child-bg";
				// get type of the APR
				var elem_type = arrElem["type"];
				
				if(arrElem.longId === cuurent_apr)
				{
					bg_class = "current-bg";
				}	
				else if(elem_type === 'Parent')
				{
					bg_class = "parent-bg";
				}
				else if (elem_type === 'Sibling')
				{
					bg_class = "sibling-bg";
				}
        
        	var title =  "Product Title:"+arrElem["productTitle"] + "\nAPR Status:"+arrElem["status"]+"\nShip to Trade Date:"+ arrElem["STTDate"]+"\nAPR Coordinator:"+arrElem["coordinator"]+"\nAPR Title:"+ arrElem["title"];
				
				mappedArr[arrElem.id]['a_attr'] = {
        																		"class" : bg_class ,
        																		"data-ng-click" :"updateResults\(" + arrElem+ "\)",
                                            "title":title
                                           }; 
			  }

				// this is tricky - only include that element in tree which is Parent(root) otherwise populate child array for each relative parent
			  for (var id in mappedArr) {
				if (mappedArr.hasOwnProperty(id)) {
				  mappedElem = mappedArr[id];
				  // If the element is not at the root level, add it to its parent array of children.
				  if (mappedElem.parentId != null) {
					mappedArr[mappedElem['parentId']]['children'].push(mappedElem);
				  }
				  // If the element is at the root level, add it to first level elements array.
				  else {
					tree.push(mappedElem);
				  }
				}
			  }
			  return tree;
			}
		
		
	});
	
