		// hardcoded network response
		var JSON_NETWORK_RESPONSE  = {
									   'status':{
										  'status':'Successfully retrieved related APRs.',
										  'statusCode':'0'
									   },
									   'aprInfo':[
										  {
											 'id':'11719201801231331',
											 'title':'Sprint9_Demo_Madhu2',
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
											 'title':'Sprint9_Demo_Madhu',
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
											 'title':'Sprint9_Demo_Madhu1',
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
											 'title':'Sprint9_Demo_Madhu1',
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
											 'title':'Sprint9_Demo_Madhu1',
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
											 'title':'Sprint9_Demo_Madhu1',
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
											 'title':'Sprint9_Demo_Madhu1',
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
											 'title':'Sprint9_Demo_Madhu1',
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
		console.log(JSON.stringify(js_tree_dump));
		

		// this function converts a flatted array to a tree structure in O(n) time using hashing 
		   function unflatArrayToTree(arr) {
			  var tree = [],
				  mappedArr = {},
				  arrElem,
				  mappedElem;
				  
				  var cuurent_apr = "2018-0015728-001-S";

			  // First map the nodes of the array to an object -> create a hash table.
			  for(var i = 0, len = arr.length; i < len; i++) {
				  
				arrElem = arr[i];
				mappedArr[arrElem.id] = arrElem;
				mappedArr[arrElem.id]['text'] = arrElem.longId + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + arrElem.title;
				mappedArr[arrElem.id]['a_attr'] = {};
				mappedArr[arrElem.id]['icon'] = "none";
				mappedArr[arrElem.id]['dots'] = true;
				mappedArr[arrElem.id]['children'] = [];

				
				//apply appropriate css to APR
				var bg_class = {"class":"child-bg"};
				// get type of the APR
				var elem_type = arrElem["type"];
				
				if(arrElem.longId === cuurent_apr)
				{
					bg_class = {"class":"current-bg"}
				}	
				else if(elem_type === 'Parent')
				{
					bg_class = {"class":"parent-bg"}
				}
				else if (elem_type === 'Sibling')
				{
					bg_class = {"class":"sibling-bg"}
				}
				
				mappedArr[arrElem.id]['a_attr'] = bg_class;
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
	
 


	
	