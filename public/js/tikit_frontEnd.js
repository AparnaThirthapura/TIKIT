


var debugging = true;



window.onload = function() {
	console.log("(◕_◕) Hello World!");

	// closeAll_NavModules();

	// Initialize();
		drawingLogic("load");

};




function Initialize() {

	if(debugging)
	{console.log("frontEnd INITIALIZING...");}



	//load up the UI interactions for....


	//NAV & NAV MODULES


	//...add open modules buttons - with li a links
	var t = document.querySelector(".topnav");
	var tl = t.children;
	for (var tl_i = 0; tl_i < tl.length; tl_i++) {
	  	tl[tl_i].firstChild.addEventListener('click', function(event) {
			
			var name = event.target.innerHTML.toLowerCase();

			if(name == "settings" 
			|| name == "search" 
			|| name == "sort"){ name = name+"-holder"; }

			if(name == "new task"){ name = "newTask-holder"; }

			if(name != ""
			&& event.target.className != "active"){
				closeAll_NavModules();
				event.target.className = "active";
				document.querySelector("."+name).className=name;
			}

		});
	}

	//...add close modules buttons - with X button
	var x = document.querySelectorAll(".nav-close");
	for (x_i = 0; x_i < x.length; x_i++) {
		x[x_i].addEventListener('click', function(event) {
			var x_parentModule = event.target.parentNode;

			var x_parentName = x_parentModule.className.split( )[0];

			if(debugging)
			{console.log(x_parentName +" closed with x button");}

			x_parentModule.className = x_parentName+ " hide";

			//reset top nav button's active status
			var x_parentName = x_parentName.split("-")[0];
			if(x_parentName == "newTask"){ x_parentName = "new task"; }
			x_parentName = x_parentName.toUpperCase();

			var t = document.querySelector(".topnav");
			var tl = t.children;
			for (var tl_i = 1; tl_i < tl.length; tl_i++) {
				if(tl[tl_i].firstChild.innerHTML == x_parentName){
					tl[tl_i].firstChild.className = null;
				}
			}

		});
	}


	if(debugging)
	{console.log("frontEnd INITIALIZED!!!");}
}





function closeAll_NavModules() {
	// close all nav modules
	var a = document.querySelectorAll("aside");
	for (a_i = 0; a_i < a.length; a_i++) {
		var a_name = a[a_i].className.split( )[0];
		a[a_i].className = a_name+ " hide";
	}

	//reset all nav buttons, except #1
	var t = document.querySelector(".topnav");
	var tl = t.children;
	for (var tl_i = 1; tl_i < tl.length; tl_i++) {
		tl[tl_i].firstChild.className = null;
	}

	if(debugging)
	{console.log("All Nav Modules Closed!");}
}





function UI_Btn(toggle, more) {

	if(!more)
	openClose(toggle.parentNode, 1);

	if(more == "outer")
	openClose(  toggle.parentNode.parentNode, 1);
	
	if(more == "inner")
	openClose( toggle.parentNode.parentNode.parentNode, 1);

	if(more == "draw")
	openClose(toggle, 2);

}

// sets an element style to open
function openClose(element, version) {
	var toggleName = element.className;
	var status;

	if(version == 1){
		status = getReverse(toggleName.split("-")[2]);

		toggleName = 
			toggleName.split("-")[0]
			+"-"+toggleName.split("-")[1]
			+ status;
	}
	if(version == 2){
		status = getReverse(toggleName.split("-")[1]);

		toggleName = 
			toggleName.split("-")[0]
			+ status;
	}

	element.className = toggleName;

	if(debugging)
	console.log(toggleName);
}

function getReverse(argument) {
	if(argument == "open"){ 
		argument = "-closed";}
	else{ argument = "-open";}
	return argument;
}




// This is a log testing function
function LogTest(argument) {
	var maybe = "";
	if(argument){maybe = ": "+ argument; }
	console.log("TEST_LOG"+ maybe);
}


// ////////////////
// DRAWING FUNCTIONS
// ////////////////
function drawingLogic(whatToDo) {
	if(whatToDo == "load"){		
		var canvasDiv = $('#drawingCanvas');
    	canvasDiv.css({}).append('<div id="markerTools"></div><div id="markerTools_2"></div><canvas id="drawing" height=300 width=653></canvas><div id="imgTools"></div>');
    	
    	//image tool - clear drawing
    	$('#imgTools').append("<a href='#drawing' id='resetDrawing'>Clear</a>");
		//and its actual function
		$("#resetDrawing").click(function(){
			drawingLogic("clear canvas");
		});

    	//image tool - save drawing
    	$('#imgTools').append("<a href='#drawing' data-download='png' id='downloadDrawing' style='float: right;''>Download</a>");

    	// draw tool - color pickers
    	$.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
	      $('#markerTools').append("<a href='#drawing' data-color='" + this + "' style='width: 100%; height: 100%; background: " + this + ";'></a> ");
	    });

    	//draw tool - size pickers
	    $.each([3, 5, 10, 15], function() {
      		$('#markerTools_2').append("<a href='#drawing' data-size='" + this + "' style='flex: 1; background: #ccc'>" + this + "</a> ");
    	});

    	$('#drawing').sketch();
	}
	if(whatToDo == "clear canvas"){
		var canvas = document.getElementById('drawing');  
		canvas.getContext('2d').clearRect(0,0,1920,2000);
		$('#drawing').sketch('actions',[]);
	}
}

function img_Btn(toggleName, el) {

	var status;
	if(toggleName == "image_import" || toggleName == "draw_import"){
		if(toggleName == "image_import"){
			status = document.getElementById('imgImport').className.split(" ")[1]; 

			//reverse the status
			if(status == "hide"){ status = "show";}
			else{ status = "hide";}

			if(status == "show"){
				//hide the other module
				document.getElementById('drawImport').className = "imgDraw-holder hide";

				//hide the uploaded holder
				document.getElementById('imgUploaded-holder').className = "hide";

				var btn_parent = el.parentNode;
				var btn = btn_parent.children;
				for (var btn_i = 0; btn_i < btn.length; btn_i++) {
					btn[btn_i].className = "";
				}

				el.className = "active";
			}else{
				el.className = "";
			}

			document.getElementById('imgImport').className = "imgImport-holder" + " "+ status;
		}

		if(toggleName == "draw_import"){
			status = document.getElementById('drawImport').className.split(" ")[1]; 

			//reverse the status
			if(status == "hide"){ status = "show";}
			else{ status = "hide";}

			if(status == "show"){
				//hide the other module
				document.getElementById('imgImport').className = "imgImport-holder hide";

				//hide the uploaded holder
				document.getElementById('imgUploaded-holder').className = "hide";

				var btn_parent = el.parentNode;
				var btn = btn_parent.children;
				for (var btn_i = 0; btn_i < btn.length; btn_i++) {
					btn[btn_i].className = "";
				}

				el.className = "active";
			}else{
				el.className = "";
			}
			
			document.getElementById('drawImport').className = "imgDraw-holder" + " "+ status;
		}

		//upload button display check
		if(status == "show"){
			document.getElementById('uploadImg-btn-holder').className = "uploadImg-btn-holder";
		}else{
			document.getElementById('uploadImg-btn-holder').className = "uploadImg-btn-holder hide";
		}

		//if there is already an uploaded image
		//it was probably hidden before
		//...lets show it

		if(debugging)
		console.log(toggleName +" "+ status);
	}

	if(toggleName == "upload_image"){

		//check if drawing or import is being show currently
		var import_h = document.getElementById('imgImport').className;
		var import_d = document.getElementById('drawImport').className;


		if(import_h == "imgImport-holder show"){



			var img = $('<img>');

			var url = $( "#from-url" ).val().trim();

			var src;
			if(url !=""){ src = url; }

		
			if(src != ""){

				$('#imgUploaded-holder').html("");
				img.attr('src', src);
				img.attr('id', "uploaded-image");
				img.appendTo('#imgUploaded-holder');

				//hide IMG imports
				document.getElementById('imgImport').className = "imgImport-holder hide";

				// show uploaded image
				document.getElementById('imgUploaded-holder').className = "show";

				//hide upload button
				document.getElementById('uploadImg-btn-holder').className = "uploadImg-btn-holder hide";
			}

			//if local 
			//DID NOT WORK


			// var local = $( "#from-local" ).val().trim();
			// if(local !=""){
			// 	//feed image through a canvas to get a copy in out js
			// 	var temp_canvas = $('<canvas>');
			// 	var ctx = temp_canvas.get(0).getContext("2d");
   //  			ctx.drawImage(img, 0, 0);

   //  			var canvas = document.getElementById("drawing");
			// 	var img    = canvas.toDataURL("image/png");

			// 	$('#imgUploaded-holder').html("");
			// 	$('#imgUploaded-holder').append('<img src="'+img+'"/>');

			// 	// show uploaded image
			// 	document.getElementById('imgUploaded-holder').className = "show";

			// 	//hide upload button
			// 	document.getElementById('uploadImg-btn-holder').className = "uploadImg-btn-holder hide";
			// }

		}

		if(import_d == "imgDraw-holder show"){
			//if draw modules being shown

			console.log("ok");
			//if its data-used is true (meaining someone clicked the canvas)
			

			var canvas = document.getElementById("drawing");
			var img    = canvas.toDataURL("image/png");

			$('#imgUploaded-holder').html("");
			$('#imgUploaded-holder').append('<img id="uploaded-image" src="'+img+'"/>');

			
			//hide canvas
			document.getElementById('drawImport').className = "imgDraw-holder hide";

			//clear canvas
			drawingLogic("clear canvas");

			// show uploaded image
			document.getElementById('imgUploaded-holder').className = "show";

			//hide upload button
			document.getElementById('uploadImg-btn-holder').className = "uploadImg-btn-holder hide";
		
		}
	}
}


function submitTask(el) {
	//create object for new task data
	var form_Obj = {};

	//GATHER ITEMS FOR NEW TASK

	// main task text
	var task = $('textarea[name="newTask-Text"]').val().trim();
	form_Obj.task =task;

	//description
	var description = $('textarea[name="newTask-Description"]').val().trim();
	if(description !=""){	
		form_Obj.description =description; 
	}

	////////NEED TO///////////////
	//get my user info for...
	///////////////////////
	//...created by
	var created_by = "brian test user";
	if(created_by !=""){	
		form_Obj.created_by =created_by; 
	}

	//assign to a user
	var assigned_to = $('select[name="newTask-assignedTo"]').val().trim();
	if(assigned_to !=""){	
		form_Obj.assigned_to= assigned_to; 
	}

	////////NEED TO///////////////
	//get and format current time for...
	///////////////////////
	//date created
	var date_created = "11-21-1987 3pm";
	if(date_created !=""){
		form_Obj.date_created =date_created;
	}

	var date_due = $('input[name="newTask-Date"]').val().trim();
	if(date_due !=""){
		form_Obj.date_due =date_due;
	}
	// returns this format:
	// 1987-11-21T15:02
	// db needs this:
	// YYYY-MM-DD HH:MM:SS

	//category
	var category = $('select[name="newTask-category"]').val();
	if(category !=""){	
		form_Obj.category =category;
	}

	//uploaded image
	var drawing = $('#uploaded-image').attr('src');
	if(drawing !=""){
		//creates a data:image/png;base64
		////////NEED TO///////////////
		//change to a blob
		///////////////////////
		form_Obj.drawing =drawing; 
	}

	//reference link
	var link = $('input[name="newTask-Link"]').val().trim();
	if(link !=""){	
		form_Obj.link =link; 
	}

	//IF actually submitted...
	//...clear form
	if(task !=""){
		el.parentNode.reset();

		if(debugging)
		console.log("New Task Take From Form and Placed into: " + form_Obj);
	}else{
		console.log("Error Submitting Form!");
	}


	//send to route for new task right here
}

